import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from 'dotenv';

dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Resume
export const uploadResume = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "job-agent/resumes",
        resource_type: "raw",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

// Delete Resume
export const deleteResume = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId, {
    resource_type: "raw",
  });
};