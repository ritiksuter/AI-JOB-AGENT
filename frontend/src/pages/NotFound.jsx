import { Link } from "react-router-dom";

import Button from "../components/common/Button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 text-center">
      <h1 className="text-8xl font-extrabold text-blue-600">
        404
      </h1>

      <h2 className="mt-6 text-3xl font-bold text-gray-900">
        Page Not Found
      </h2>

      <p className="mt-4 max-w-md text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="mt-8">
        <Link to="/dashboard">
          <Button>
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;