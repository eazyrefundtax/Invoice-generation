import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Advertising from "../pages/Advertising";
import AutoTravels from "../pages/Auto&Travels";
import CleaningMaintainance from "../pages/Cleaning&Maintenance";
import ManagementFees from "../pages/ManagementFees";
import Repairs from "../pages/Repairs";
import Supplies from "../pages/Supplies";
import Utilities from "../pages/Utilities";
import LandScapings from "../pages/LandScapings";
import ActivityLog from "../pages/ActivityLog";
import GuestRegistrationForm from "../pages/GuestRegistrationForm";
import CleaningMaintenanceBill from "../components/WashTog";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        path: "",
        element: <Advertising />,
      },
      {
        path: "/auto&travels",
        element: <AutoTravels />,
      },
      {
        path: "/cleaningandmaintainces",
        element: <CleaningMaintainance />,
        children: [],
      },
      {
        path: "/managementfees",
        element: <ManagementFees />,
      },
      {
        path: "/repairs",
        element: <Repairs />,
      },
      {
        path: "/supplies",
        element: <Supplies />,
      },

      {
        path: "/utilities",
        element: <Utilities />,
      },
      {
        path: "/landscaping",
        element: <LandScapings />,
      },
      {
        path: "/activitylog",
        element: <ActivityLog />,
      },
      {
        path: "/guestregistrationform",
        element: <GuestRegistrationForm />,
      },
      // {
      //   path: "/CleaningMaintenance/bill",
      //   element: <CleaningMaintenanceBill />,
      // },
    ],
  },
]);
