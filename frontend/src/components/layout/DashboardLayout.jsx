import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({
  title,
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <Navbar title={title} />

        {/* Page Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;