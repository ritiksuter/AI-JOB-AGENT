import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Building2,
  MapPin,
  CalendarDays,
  Briefcase,
  ExternalLink,
  ArrowLeft,
  Check,
  Copy,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import { getApplicationById } from "../services/job.service";
import ApplicationStatusCard from "../components/application/ApplicationStatusCard";
import SkillsAnalysisCard from "../components/application/SkillsAnalysisCard";
import ResumeSuggestionsCard from "../components/application/ResumeSuggestionCard";
import InterviewPreparationCard from "../components/application/InterviewPreparationCard";
import JobInsightsCard from "../components/application/JobInsightsCard";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!application?.coverLetter) return;

    try {
      await navigator.clipboard.writeText(application.coverLetter);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const fetchApplication = async () => {
    if (!id) return;

    try {
      setLoading(true);

      const data = await getApplicationById(id);

      setApplication(data.application);
    } catch (error) {
      console.error(error);
      setApplication(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout title="Application Details">
        <Loader text="Loading application..." />
      </DashboardLayout>
    );
  }

  if (!application) {
    return (
      <DashboardLayout title="Application Details">
        <EmptyState
          title="Application Not Found"
          description="The requested application does not exist."
        />
      </DashboardLayout>
    );
  }
  console.log(application);

  return (
    <DashboardLayout title="Application Details">
      <div className="space-y-6">
        <Button variant="secondary" onClick={() => navigate("/applications")}>
          <ArrowLeft size={18} />
          Back
        </Button>

        {/* Job Information */}
        <Card>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {application.role}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-gray-600">
                <Building2 size={18} />
                <span>{application.company}</span>
              </div>
            </div>

            <Badge variant="success">{application.status}</Badge>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <MapPin size={20} />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p>{application.location || "Not Available"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Briefcase size={20} />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p>{application.status}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays size={20} />
                <div>
                  <p className="text-sm text-gray-500">Applied On</p>
                  <p>
                    {application.createdAt
                      ? dateFormatter.format(new Date(application.createdAt))
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Briefcase size={20} />
                <div>
                  <p className="text-sm text-gray-500">AI Match Score</p>
                  <p>{application.score || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Original Job */}
        <Card>
          <h2 className="mb-4 text-xl font-semibold">Original Job</h2>

          {application.jobUrl ? (
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
              Open Job Posting
              <ExternalLink size={18} />
            </a>
          ) : (
            <p className="text-gray-500">Job URL not available.</p>
          )}
        </Card>

        {/* Job Description */}
        <Card>
          <h2 className="mb-4 text-xl font-semibold">Job Description</h2>

          <div className="max-h-80 overflow-y-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-gray-700 leading-7">
            {application.description || "No job description available."}
          </div>
        </Card>

        {/* AI Generated Cold Email */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">AI Generated Cold Email</h2>

            <Button variant="secondary" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check size={16} />
                  <span className="px-3">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={16} size={18} spacing={10} />
                  <span className="px-3">Copy</span>
                </>
              )}
            </Button>
          </div>

          <div className="max-h-80 overflow-y-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-gray-700 leading-7">
            {application.coverLetter || "No cold email available."}
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-xl font-semibold">Resume Used</h2>

          {application.resume?.url ? (
            <div className="space-y-4">
              <div className="rounded-lg border bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Resume Name</p>

                <p className="mt-1 font-medium text-gray-900">
                  {application.resume.originalName || "Resume"}
                </p>
              </div>

              <div className="rounded-lg border bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Uploaded On</p>

                <p className="mt-1 font-medium text-gray-900">
                  {application.resume.uploadedAt
                    ? dateFormatter.format(
                        new Date(application.resume.uploadedAt),
                      )
                    : "N/A"}
                </p>
              </div>

              <Button
                onClick={() => window.open(application.resume.url, "_blank")}
              >
                View Resume
              </Button>
            </div>
          ) : (
            <p className="text-gray-500">
              Resume information is not available.
            </p>
          )}
        </Card>

        <ApplicationStatusCard application={application} onStatusUpdated={fetchApplication} />
        <SkillsAnalysisCard analysis={application.ai?.skillsAnalysis} />
        <ResumeSuggestionsCard suggestions={application.ai?.resumeSuggestions} />
        <InterviewPreparationCard interview={application.ai?.interviewPreparation} />
        <JobInsightsCard insights={application.ai?.jobInsights} />

      </div>
    </DashboardLayout>
  );
};

export default ApplicationDetails;
