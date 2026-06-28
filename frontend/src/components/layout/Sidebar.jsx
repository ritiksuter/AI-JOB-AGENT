import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  LayoutDashboard,
  FileText,
  Briefcase,
  ClipboardList,
  User,
  LogOut,
} from "lucide-react";

import { logout } from "../../redux/authSlice";
import { clearProfile } from "../../redux/userSlice";
import { clearJobs } from "../../redux/jobSlice";
import { clearApplications } from "../../redux/applicationSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearSession = () => {
    localStorage.removeItem("token");

    dispatch(logout());
    dispatch(clearProfile());
    dispatch(clearJobs());
    dispatch(clearApplications());
  };

  const handleLogout = () => {
    clearSession();

    navigate("/login", {
      replace: true,
    });
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Resume",
      path: "/resume",
      icon: FileText,
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: Briefcase,
    },
    {
      name: "Applications",
      path: "/applications",
      icon: ClipboardList,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];


  return (
    <aside className="sticky flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Job Agent
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          AI Powered Job Search
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                transition-all
                duration-200

                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }
                `
              }
            >
              <Icon size={20} />

              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-sm
            font-medium
            text-red-600
            transition-all
            duration-200
            hover:bg-red-50
            hover:text-red-700
            focus:outline-none
            focus:ring-2
            focus:ring-red-300
          "
        >
          <LogOut size={20} />

          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;