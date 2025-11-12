import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import UnAuthorizedPage from "../shared/UnAuthorizedPage";

const MainLayouts = () => {
  const { logout, currentUser } = useAuth();
  const { pathname } = useLocation();

  const isAdmin = currentUser?.email === "murthy@skygoalnext.com";

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex items-center justify-between bg-white shadow px-6 py-4">
        <h1 className="text-xl font-bold">
          {isAdmin ? "Admin Dashboard" : "User Dashboard"}
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
          >
            Logout
          </button>
        </div>
      </header>

      <Navbar />

      <main className="flex-1 p-6">
        {!isAdmin && pathname === "/" ? <UnAuthorizedPage /> : <Outlet />}
      </main>
    </div>
  );
};

export default MainLayouts;
