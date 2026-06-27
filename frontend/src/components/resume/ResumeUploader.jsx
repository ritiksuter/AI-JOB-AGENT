import { useRef } from "react";
import {
  Upload,
  FileText,
  Trash2,
} from "lucide-react";

import Card from "../common/Card";
import Button from "../common/Button";

const ResumeUploader = ({
  resumeUrl,
  uploading = false,
  onUpload,
  onDelete,
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    onUpload(file);

    event.target.value = "";
  };

  return (
    <Card
      title="Resume"
      subtitle="Upload your latest resume in PDF, DOC or DOCX format."
    >
      <div className="space-y-6">
        {/* Upload Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="
            flex
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-2xl
            border-2
            border-dashed
            border-blue-300
            bg-blue-50
            p-10
            transition-all
            duration-300
            hover:border-blue-500
            hover:bg-blue-100
          "
        >
          <Upload
            size={48}
            className="text-blue-600"
          />

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Click to Upload Resume
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Supported formats: PDF, DOC, DOCX
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Resume Status */}
        {resumeUrl && (
          <div
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              p-4
            "
          >
            <div className="flex items-center gap-3">
              <FileText className="text-green-600" />

              <div>
                <h4 className="font-medium text-gray-900">
                  Resume Uploaded
                </h4>

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    text-sm
                    text-blue-600
                    hover:underline
                  "
                >
                  View Resume
                </a>
              </div>
            </div>

            <Button
              variant="danger"
              onClick={onDelete}
            >
              <div className="flex items-center gap-2">
                <Trash2 size={18} />

                Delete
              </div>
            </Button>
          </div>
        )}

        {!resumeUrl && (
          <p className="text-center text-gray-500">
            No resume uploaded yet.
          </p>
        )}

        <Button
          fullWidth
          loading={uploading}
          onClick={() =>
            fileInputRef.current?.click()
          }
        >
          {resumeUrl
            ? "Replace Resume"
            : "Upload Resume"}
        </Button>
      </div>
    </Card>
  );
};

export default ResumeUploader;