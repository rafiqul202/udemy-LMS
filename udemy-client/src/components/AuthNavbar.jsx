import { GraduationCapIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AuthNavbar = () => {
  return (
    <header className="flex items-center pt-6">
      <Link to={"/"} className="flex items-center justify-start">
        <GraduationCapIcon className="h-10 w-10 font-semibold" />
        <span className="px-1">|</span>
        <span className="text-gray-600 font-bold text-xl">Learn</span>
      </Link>
    </header>
  );
};

export default AuthNavbar;
