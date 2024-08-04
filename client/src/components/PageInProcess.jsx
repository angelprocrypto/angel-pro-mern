import React from "react";

const PageInProcess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-md rounded-md">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M12 20.39l-1.45-.93a12.034 12.034 0 01-6.6-10.69V7a3.001 3.001 0 013-3h12a3.001 3.001 0 013 3v1.77a12.034 12.034 0 01-6.6 10.69L12 20.39z"
          />
        </svg>
        <h1 className="text-xl font-bold text-gray-700">Page in Process</h1>
        <p className="text-gray-500 mt-2">
          We're working on this page. Please check back later.
        </p>
      </div>
    </div>
  );
};

export default PageInProcess;
