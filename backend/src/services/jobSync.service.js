import mongoose from "mongoose";
import Job from "../models/Job.js";
import {
  getJobsFromSheet,
  deleteRowsFromSheet,
} from "./googleSheets.service.js";

export const syncJobsFromSheet = async () => {
  // Read jobs from Google Sheet
  const sheetJobs = await getJobsFromSheet();

  if (!sheetJobs.length) {
    return {
      inserted: 0,
      deletedRows: 0,
      message: "No jobs found in Google Sheet.",
    };
  }

  // Keep only valid userIds
  const validJobs = sheetJobs.filter((job) =>
    mongoose.Types.ObjectId.isValid(job.userId),
  );

  // Delete invalid rows so they don't block future syncs
  const invalidRows = sheetJobs
    .filter((job) => !mongoose.Types.ObjectId.isValid(job.userId))
    .map((job) => job.rowNumber);

  const userIds = [...new Set(validJobs.map((job) => job.userId))];

  // Fetch existing jobs
  const existingJobs = await Job.find(
    {
      userId: { $in: userIds },
    },
    "userId link",
  ).lean();

  const existingLinks = new Set(
    existingJobs.map((job) => `${job.userId.toString()}_${job.link}`),
  );

  const expireAt = new Date(Date.now() + 36 * 60 * 60 * 1000);

  const jobsToInsert = [];
  const processedRows = [...invalidRows];

  for (const job of validJobs) {
    const key = `${job.userId}_${job.link}`;

    // Duplicate
    if (existingLinks.has(key)) {
      processedRows.push(job.rowNumber);
      continue;
    }

    jobsToInsert.push({
      userId: job.userId,

      title: job.title,
      company: job.company,
      location: job.location,

      description: job.description,

      score: Number(job.score),

      link: job.link,

      coverLetter: job.coverLetter,

      fetchedAt: job.fetchedAt ? new Date(job.fetchedAt) : new Date(),

      expireAt,
    });

    processedRows.push(job.rowNumber);

    existingLinks.add(key);
  }

  if (jobsToInsert.length > 0) {
    try {
      await Job.insertMany(jobsToInsert, {
        ordered: false,
      });
    } catch (err) {
      if (err.code !== 11000) {
        throw err;
      }
    }
  }

  if (processedRows.length > 0) {
    await deleteRowsFromSheet(processedRows);
  }

  return {
    inserted: jobsToInsert.length,
    deletedRows: processedRows.length,
    message: "Jobs synced successfully.",
  };
};
