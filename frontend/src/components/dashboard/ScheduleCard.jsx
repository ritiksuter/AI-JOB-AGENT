import { CalendarClock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Card from "../common/Card";
import Button from "../common/Button";

const ScheduleCard = () => {
  const navigate = useNavigate();

  const { profile } = useSelector(
    (state) => state.user
  );

  const schedule =
    profile?.cronExpression || "Not Configured";

  return (
    <Card
      title="Job Search Schedule"
      subtitle="Automatic job search configuration"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-blue-100
              text-blue-600
            "
          >
            <CalendarClock size={28} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {schedule === "Not Configured"
                ? "No Schedule Found"
                : "Automatic Search Enabled"}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {schedule}
            </p>
          </div>
        </div>

        <Button
          variant="secondary"
          onClick={() => navigate("/profile")}
        >
          Configure
        </Button>
      </div>
    </Card>
  );
};

export default ScheduleCard;