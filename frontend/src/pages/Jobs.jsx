import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../components/layout/DashboardLayout";
import SearchBar from "../components/jobs/SearchBar";
import JobList from "../components/jobs/JobList";

import { getJobs, searchJobs, saveApplication } from "../services/job.service";

import {
  getJobsStart,
  getJobsSuccess,
  getJobsFailure,
  searchJobsStart,
  searchJobsSuccess,
  searchJobsFailure,
  markJobApplied,
} from "../redux/jobSlice";

import { saveApplicationSuccess } from "../redux/applicationSlice";

const Jobs = () => {
  const dispatch = useDispatch();

  const { jobs, loading, searching } = useSelector((state) => state.jobs);

  const [search, setSearch] = useState("");
  const [applyingJobId, setApplyingJobId] = useState(null);

  const fetchJobs = useCallback(async () => {
    try {
      dispatch(getJobsStart());

      const data = await getJobs();

      console.log(data.jobs);
      dispatch(getJobsSuccess(data.jobs || []));
    } catch (error) {
      dispatch(
        getJobsFailure(
          error.response?.data?.message || "Unable to fetch jobs.",
        ),
      );
    }
  }, [dispatch]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearchJobs = async () => {
    try {
      dispatch(searchJobsStart());

      await searchJobs();

      dispatch(searchJobsSuccess());

      await fetchJobs();
    } catch (error) {
      dispatch(
        searchJobsFailure(
          error.response?.data?.message || "Unable to search jobs.",
        ),
      );
    }
  };

  const filteredJobs = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return jobs;

    return jobs.filter((job) =>
      Object.values(job).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(keyword),
      ),
    );
  }, [jobs, search]);

  const handleApply = (job) => {
    window.open(job.link, "_blank", "noopener,noreferrer");
  };

  const handleMarkAsApplied = async (job) => {
    try {
      setApplyingJobId(job.id);

      const data = await saveApplication({
        company: job.company,
        role: job.title,
        location: job.location,
        jobUrl: job.link,
        status: "Applied",

        score: job.score,
        description: job.description,
        coverLetter: job.coverLetter,
      });

      dispatch(saveApplicationSuccess(data.application));
      dispatch(markJobApplied(job.link));
    } catch (error) {
      console.error(error);
    } finally {
      setApplyingJobId(null);
    }
  };

  return (
    <DashboardLayout title="Jobs">
      <div className="space-y-8">
        <SearchBar
          search={search}
          searching={searching}
          onSearch={handleSearchJobs}
          onSearchChange={(event) => setSearch(event.target.value)}
        />

        <JobList
          jobs={filteredJobs}
          loading={loading}
          applyingJobId={applyingJobId}
          onSearch={handleSearchJobs}
          onApply={handleApply}
          onMarkAsApplied={handleMarkAsApplied}
        />
      </div>
    </DashboardLayout>
  );
};

export default Jobs;
