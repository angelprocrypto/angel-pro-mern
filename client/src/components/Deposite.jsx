import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../utils/axiosClient";
import QRCode from "../assets/TRC20 QR.png";
import trc20 from "../assets/trc20.svg";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader"; // Import the loader

const DepositForm = () => {
  const navigate = useNavigate();
  const [network, setNetwork] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const user = useSelector((state) => state.appConfigReducer.userData);

  const depositAddress = "TPoeK8TsEUGAHSWFzEsUrvZTBXtMFuXwNo";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirmDeposit = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await axiosClient.post("/transaction/deposite", {
        network,
        depositAmount,
        transactionId,
      });
      alert("Deposit created successfully");
      setIsModalOpen(false);
      setDepositAmount("");
      setTransactionId("");
      setNetwork("");
    } catch (error) {
      console.error("Failed to create deposit", error);
      alert("Failed to create deposit");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(depositAddress);
    alert("Deposit address copied to clipboard!");
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
        <h1 className="text-lg font-bold">Deposit</h1>
        <button
          onClick={() => navigate("/depositHistory")}
          className="text-blue-500 font-bold"
        >
          Deposit History
        </button>
      </nav>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-6"
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Network</label>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setNetwork("TRC20")}
              className={`flex-1 py-2 mx-1 border rounded-md font-bold text-center ${
                network === "TRC20"
                  ? "bg-yellow-200 border-yellow-500"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <img
                src={trc20}
                alt="trc 20"
                className="inline-block w-4 h-4 mr-1 mb-1"
              />
              TRC20
              {network === "TRC20" && (
                <span className="text-green-500 ml-2">✓</span>
              )}
            </button>
            {/* <button
              type="button"
              onClick={() => setNetwork("ERC20")}
              className={`flex-1 py-2 mx-1 border rounded-md font-bold text-center ${
                network === "ERC20"
                  ? "bg-yellow-200 border-yellow-500"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              ERC20
              {network === "ERC20" && (
                <span className="text-green-500 ml-2">✓</span>
              )}
            </button> */}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Amount</label>
          <div className="relative">
            <input
              type="number"
              placeholder="Please enter the amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              required
              className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 font-bold text-gray-500">
              USDT
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Available: {user?.balance} USDT
          </p>
        </div>
        <button
          type="submit"
          disabled={!network || !depositAmount}
          className={`w-full py-3 rounded-md text-white font-bold ${
            !network || !depositAmount
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          Deposit
        </button>
        <p className="text-xs text-yellow-600 bg-yellow-100 p-2 rounded-md border border-yellow-300 mt-4">
          ⚠️ For the safety of your funds, please note that the recharge address
          for each order is different. Please double-check carefully to avoid
          the risk of irretrievable funds.
        </p>
      </form>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h2 className="font-bold text-2xl text-center mb-4">
              Deposit Information
            </h2>
            <div className="flex justify-center mb-4">
              <img src={QRCode} width={150} />
            </div>
            <p className="text-xs text-yellow-600 mb-2">Deposit Address</p>
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={depositAddress}
                readOnly
                className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={copyToClipboard}
                className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Copy
              </button>
            </div>
            <p className="mb-2">
              <strong>Selected Network:</strong> {network}
            </p>
            <p className="mb-2">
              <strong>Deposit Amount:</strong> {depositAmount} USDT
            </p>
            <p className="text-xs text-yellow-600 bg-yellow-100 p-2 rounded-md border border-yellow-300 mb-4">
              ⚠️ Please double-check the deposit address carefully to avoid the
              risk of irretrievable funds.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Transaction ID
              </label>
              <input
                type="text"
                placeholder="Enter your transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-4 bg-red-400 text-white rounded-md font-bold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeposit}
                disabled={!transactionId || loading} // Disable if loading
                className={`py-2 px-4 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  loading ? "cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <ClipLoader color="#fff" size={20} /> // Show spinner if loading
                ) : (
                  "Confirm Deposit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositForm;
