import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  CalendarDays,
  Briefcase,
  MapPin,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import { getApplications } from "../services/job.service";

import {
  getApplicationsStart,
  getApplicationsSuccess,
  getApplicationsFailure,
} from "../redux/applicationSlice";

const Applications = () => {
  const dispatch = useDispatch();

  const {
    applications,
    loading,
  } = useSelector(
    (state) => state.applications
  );

  const fetchApplications = useCallback(async () => {
    try {
      dispatch(getApplicationsStart());

      const data = await getApplications();

      dispatch(
        getApplicationsSuccess(
          data.applications || []
        )
      );
    } catch (error) {
      dispatch(
        getApplicationsFailure(
          error.response?.data?.message ||
            "Unable to load applications."
        )
      );
    }
  }, [dispatch]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return (
    <DashboardLayout title="Applications">
      {loading ? (
        <Loader text="Loading applications..." />
      ) : applications.length === 0 ? (
        <EmptyState
          title="No Applications"
          description="Applications marked from the Jobs page will appear here."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {applications.map((application) => (
            <Card key={application._id}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {application.role}
                  </h2>

                  <div className="mt-2 flex items-center gap-2 text-gray-600">
                    <Building2 size={18} />
                    {application.company}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    {application.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase size={18} />
                    {application.status}
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={18} />
                    {new Date(
                      application.createdAt
                    ).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="success">
                    {application.status}
                  </Badge>

                  <a
                    href={application.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Job
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Applications;