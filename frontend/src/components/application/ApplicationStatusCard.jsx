import { useState } from "react";

import Card from "../common/Card";
import Button from "../common/Button";

import { updateApplicationStatus } from "../../services/job.service";

const STATUS_OPTIONS = [
  "Applied",
  "Viewed",
  "Shortlisted",
  "Interview",
  "Offer",
  "Accepted",
  "Rejected",
  "Withdrawn",
];

const ApplicationStatusCard = ({
  application,
  onStatusUpdated,
}) => {
  const [status, setStatus] = useState(
    application.status
  );

  const [loading, setLoading] =
    useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateApplicationStatus(
        application._id,
        status
      );

      if (onStatusUpdated) {
        await onStatusUpdated();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Application Status">
      <div className="space-y-4">
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="
            w-full
            rounded-lg
            border
            border-gray-300
            px-4
            py-3
            outline-none
            focus:border-blue-500
          "
        >
          {STATUS_OPTIONS.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        <Button
          fullWidth
          loading={loading}
          onClick={handleUpdate}
        >
          Update Status
        </Button>
      </div>
    </Card>
  );
};

export default ApplicationStatusCard;