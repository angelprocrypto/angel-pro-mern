import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TransactionProgress = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedAccount, calculatedINR } = location.state;

  // Mocked transaction status, in real scenario, this should come from API
  const transactionStatus = "Successful"; // or "In Progress" or "Approval"
  const transactionUTR = "420615982052";

  const renderProgress = (status) => {
    switch (status) {
      case "Approval":
        return <div className="w-1/3 h-2 bg-blue-500"></div>;
      case "In Progress":
        return (
          <div className="w-2/3 h-2 bg-blue-500">
            <div className="w-1/3 h-full bg-yellow-500"></div>
          </div>
        );
      case "Successful":
        return <div className="w-full h-2 bg-green-500"></div>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 font-bold"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-lg font-bold">Exchange Detail</h1>
      </nav>

      <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-6">
        <h2 className="text-2xl font-bold mb-4">
          You will receive ₹{calculatedINR.toFixed(2)}
        </h2>
        <p className="mb-4">
          <strong>UTR:</strong>{" "}
          <span
            className="cursor-pointer text-blue-500"
            onClick={() => navigator.clipboard.writeText(transactionUTR)}
          >
            {transactionUTR} (Click to copy)
          </span>
        </p>

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Transaction Progress</h3>
          <div className="w-full bg-gray-300 rounded-full">
            {renderProgress(transactionStatus)}
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>Submitted</span>
            <span>In Progress</span>
            <span>Successful</span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Payee Information</h3>
          <div className="flex w-full justify-between border-b-2 border-t-2 py-1 px-4 border-r-2 border-l-2">
            <strong>Account No:</strong>
            <p>{selectedAccount.accountNo}</p>
          </div>
          <div className="flex w-full justify-between border-b-2 py-1 px-4 border-r-2 border-l-2">
            <strong>IFSC:</strong>
            <p>{selectedAccount.ifsc}</p>
          </div>
          <div className="flex w-full justify-between border-b-2 py-1 px-4 border-r-2 border-l-2">
            <strong>Payee Name:</strong>
            <p>{selectedAccount.name}</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/sellForm")}
          className="w-full py-3 rounded-md text-white font-bold bg-blue-500 hover:bg-blue-700 cursor-pointer"
        >
          Back to Sell Form
        </button>
      </div>
    </div>
  );
};

export default TransactionProgress;
