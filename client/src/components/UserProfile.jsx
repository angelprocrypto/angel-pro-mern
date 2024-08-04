import React from "react";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = ({ name, phone }) => {
  return (
    <div className="flex items-center bg-[#222222] p-4 rounded-lg shadow-lg text-white w-full max-w-3xl mx-auto">
      <div className="mr-4">
        <FaUserCircle className="w-16 h-16 text-gray-400" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-lg text-gray-400">{phone}</p>
      </div>
    </div>
  );
};

export default UserProfile;
