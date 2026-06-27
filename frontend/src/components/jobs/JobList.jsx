import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import JobCard from "./JobCard";

const JobList = ({
  jobs = [],
  loading = false,
  applyingJobId = null,
  onApply,
  onMarkAsApplied,
  onSearch,
}) => {
  if (loading) {
    return <Loader text="Loading jobs..." />;
  }

  if (!jobs.length) {
    return (
      <EmptyState
        title="No Jobs Found"
        description="Click 'Find Jobs Now' to fetch the latest jobs."
        actionText="Find Jobs"
        onAction={onSearch}
      />
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {jobs.map((job, index) => (
        <JobCard
          key={job.id ?? `${job.company}-${job.role}-${index}`}
          job={job}
          applyingJobId={applyingJobId}
          onApply={onApply}
          onMarkAsApplied={onMarkAsApplied}
        />
      ))}
    </div>
  );
};

export default JobList;