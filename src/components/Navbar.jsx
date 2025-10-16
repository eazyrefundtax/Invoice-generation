import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Advertising", end: true },
    { to: "/auto&travels", label: "Auto & Travels" },
    { to: "/cleaningandmaintainces", label: "Cleaning and Maintenance" },
    { to: "/managementfees", label: "Management Fees" },
    { to: "/repairs", label: "Repairs" },
    { to: "/supplies", label: "Supplies" },
    { to: "/utilities", label: "Utilities", end: true },
    { to: "/landscaping", label: "Land Scaping", end: true },
    { to: "/activitylog", label: "Activity Log", end: true },
    {
      to: "/guestregistrationform",
      label: "Guest Registration Form",
      end: true,
    },
  ];

  return (
    <nav className="bg-white py-4 px-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden text-2xl text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <RxCross1 /> : <RxHamburgerMenu />}
        </button>

        {/* Nav Links (Desktop) */}
        <div className="hidden md:flex gap-3 lg:gap-4">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-black text-white"
                    : "text-black hover:bg-gray-100"
                } rounded-md px-4 py-1.5 transition-all duration-200`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 bg-white rounded-lg shadow-lg p-3 flex flex-col gap-2">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-black text-white"
                    : "text-black hover:bg-gray-100"
                } rounded-md px-4 py-2 transition-all duration-200`
              }
              onClick={() => setMenuOpen(false)} // closes menu on click
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
