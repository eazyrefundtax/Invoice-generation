import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayouts = () => {
  return (
    <div className="flex flex-col gap-4">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayouts;
