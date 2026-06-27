import {
  Building2,
  Briefcase,
  MapPin,
  Clock3,
  ExternalLink,
  CheckCircle,
} from "lucide-react";

import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";

const JobCard = ({
  job,
  applyingJobId = null,
  onApply,
  onMarkAsApplied,
}) => {
  const isApplying = applyingJobId === job.id;

  return (
    <Card className="h-full">
      <div className="flex h-full flex-col justify-between">
        {/* Header */}
        <div>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {job.title}
              </h2>

              <div className="mt-2 flex items-center gap-2 text-gray-600">
                <Building2 size={18} />
                <span>{job.company}</span>
              </div>
            </div>

            <Badge variant="primary">
              LinkedIn
            </Badge>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={18} />
              <span>{job.location}</span>
            </div>

            {job.jobType && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Briefcase size={18} />
                <span>{job.jobType}</span>
              </div>
            )}

            {job.postedAt && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock3 size={18} />
                <span>{job.postedAt}</span>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="mt-5 flex flex-wrap gap-2">
            {job.experience && (
              <Badge variant="success">
                {job.experience}
              </Badge>
            )}

            {job.score && (
              <Badge variant="success">
                Match: {job.score}%
              </Badge>
            )}

            <Badge variant="gray">
              {job.title}
            </Badge>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            onClick={() => onApply(job)}
          >
            <div className="flex items-center justify-center gap-2">
              <ExternalLink size={18} />
              <span>Apply</span>
            </div>
          </Button>

          <Button
            loading={isApplying}
            disabled={job.isApplied}
            onClick={() => onMarkAsApplied(job)}
            variant={job.isApplied ? "success" : "primary"}
          >
            <div className="flex items-center justify-center gap-2">
              <CheckCircle size={18} />
              <span>
                {job.isApplied ? "Applied" : "Mark Applied"}
              </span>
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;