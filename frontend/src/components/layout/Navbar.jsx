import { useSelector } from "react-redux";

const Navbar = ({ title }) => {
  const { profile } = useSelector((state) => state.user);

  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">
      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {title}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {profile?.name || "User"}
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Resume Status */}
        <div
          className={`
            rounded-full
            px-4
            py-2
            text-sm
            font-medium
            ${
              profile?.resumeUrl
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }
          `}
        >
          {profile?.resumeUrl
            ? "Resume Uploaded"
            : "Resume Missing"}
        </div>

        {/* Avatar */}
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-blue-600
            text-lg
            font-semibold
            text-white
          "
        >
          {profile?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
};

export default Navbar;