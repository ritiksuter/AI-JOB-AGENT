import { useSelector } from "react-redux";
import {
  Briefcase,
  ClipboardList,
  CalendarClock,
  FileText,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";

import StatsCard from "../components/dashboard/StatsCard";
import ResumeStatus from "../components/dashboard/ResumeStatus";
import SearchCard from "../components/dashboard/SearchCard";
import ScheduleCard from "../components/dashboard/ScheduleCard";

const Dashboard = () => {
  const { profile } = useSelector(
    (state) => state.user
  );

  const { jobs } = useSelector(
    (state) => state.jobs
  );

  const { applications } = useSelector(
    (state) => state.applications
  );

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-8">
        {/* Statistics */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Resume"
            value={
              profile?.resumeUrl
                ? "Uploaded"
                : "Missing"
            }
            icon={FileText}
            color={
              profile?.resumeUrl
                ? "green"
                : "yellow"
            }
          />

          <StatsCard
            title="Jobs Found"
            value={jobs.length}
            icon={Briefcase}
            color="blue"
          />

          <StatsCard
            title="Applications"
            value={applications.length}
            icon={ClipboardList}
            color="green"
          />

          <StatsCard
            title="Auto Search"
            value={
              profile?.cronExpression
                ? "Enabled"
                : "Disabled"
            }
            icon={CalendarClock}
            color={
              profile?.cronExpression
                ? "blue"
                : "red"
            }
          />
        </section>

        {/* Resume + Schedule */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ResumeStatus />

          <ScheduleCard />
        </section>

        {/* Search */}
        <section>
          <SearchCard />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;