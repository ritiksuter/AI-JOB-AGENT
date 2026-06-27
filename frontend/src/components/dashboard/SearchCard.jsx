import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "../common/Card";
import Button from "../common/Button";

import {
  searchJobsStart,
  searchJobsSuccess,
  searchJobsFailure,
} from "../../redux/jobSlice";

import { searchJobs } from "../../services/job.service";

const SearchCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searching } = useSelector(
    (state) => state.jobs
  );

  const { profile } = useSelector(
    (state) => state.user
  );

  const handleSearch = async () => {
    if (!profile?.resumeUrl) {
      navigate("/resume");
      return;
    }

    try {
      dispatch(searchJobsStart());

      await searchJobs();

      dispatch(searchJobsSuccess());

      navigate("/jobs");
    } catch (error) {
      dispatch(
        searchJobsFailure(
          error.response?.data?.message ||
            "Unable to search jobs."
        )
      );
    }
  };

  return (
    <Card
      title="Find Jobs"
      subtitle="Search the latest opportunities matching your profile."
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Ready to search?
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Click the button below to trigger your AI-powered
            job search instantly.
          </p>
        </div>

        <Button
          size="lg"
          loading={searching}
          onClick={handleSearch}
        >
          <div className="flex items-center gap-2">
            <Search size={20} />

            <span>Find Jobs Now</span>
          </div>
        </Button>
      </div>
    </Card>
  );
};

export default SearchCard;