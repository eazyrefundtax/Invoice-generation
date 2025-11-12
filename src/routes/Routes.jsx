import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import NotAuthorized from "../pages/NotAuthorized";
import Login from "../pages/Login";
import EazyRefund from "../pages/EazyRefund";
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
import { ProtectedRoute, PublicRoute } from "../components/ProtectedRoute";

export const routes = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/not-authorized",
        element: <NotAuthorized />,
      },
    ]
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayouts />,
        children: [
          { path: "/", element: <EazyRefund /> },
          { path: "/advertising", element: <Advertising /> },
          { path: "/auto&travels", element: <AutoTravels /> },
          { path: "/cleaningandmaintainces", element: <CleaningMaintainance /> },
          { path: "/managementfees", element: <ManagementFees /> },
          { path: "/repairs", element: <Repairs /> },
          { path: "/supplies", element: <Supplies /> },
          { path: "/utilities", element: <Utilities /> },
          { path: "/landscaping", element: <LandScapings /> },
          { path: "/activitylog", element: <ActivityLog /> },
          { path: "/guestregistrationform", element: <GuestRegistrationForm /> },
        ],
      }
    ]
  },
]);
