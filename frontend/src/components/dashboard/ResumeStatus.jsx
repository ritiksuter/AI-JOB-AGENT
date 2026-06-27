import { FileText, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Card from "../common/Card";
import Button from "../common/Button";

const ResumeStatus = () => {
  const navigate = useNavigate();

  const { profile } = useSelector(
    (state) => state.user
  );

  const uploaded = Boolean(profile?.resumeUrl);

  return (
    <Card
      title="Resume"
      subtitle="Current resume status"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              ${
                uploaded
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }
            `}
          >
            <FileText size={28} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {uploaded
                ? "Resume Uploaded"
                : "Resume Missing"}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {uploaded
                ? "Your resume is ready for job applications."
                : "Upload your resume to start applying."}
            </p>
          </div>
        </div>

        <Button
          variant={uploaded ? "secondary" : "primary"}
          onClick={() => navigate("/resume")}
        >
          <Upload size={18} />

          <span className="ml-2">
            {uploaded ? "Manage" : "Upload"}
          </span>
        </Button>
      </div>
    </Card>
  );
};

export default ResumeStatus;