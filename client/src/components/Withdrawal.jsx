import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosClient } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import trc20 from "../assets/trc20.svg";
import payx from "../assets/payx.svg";
import usdtlog from "../assets/currency.svg";
import erc20 from "../assets/erc20.svg";
import ClipLoader from "react-spinners/ClipLoader"; // Import the loader

const WithdrawalForm = () => {
  const navigate = useNavigate();
  const [network, setNetwork] = useState("");
  const [currency, setCurrency] = useState("USDT");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [showWalletInput, setShowWalletInput] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const user = useSelector((state) => state.appConfigReducer.userData);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    if (withdrawalAmount > user?.balance) {
      setValidationMessage("Entered amount is greater than available balance");
    } else {
      setValidationMessage("");
    }
  }, [withdrawalAmount, user?.balance]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosClient.post("/transaction/withdrawal", {
        currency,
        withdrawalAmount,
        network,
        walletAddress,
      });
      setCurrency("");
      setWalletAddress("");
      setWithdrawalAmount("");
      alert("Withdrawal created successfully");
    } catch (error) {
      console.error("Failed to create withdrawal", error);
      alert("Failed to create withdrawal");
    } finally {
      setLoading(false); // Set loading to false
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
            className="w-4 h-4"
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
        <h1 className="text-lg font-bold">Withdraw</h1>
        <button
          onClick={() => navigate("/withdrawalHistory")}
          className="text-blue-500 font-bold"
        >
          Withdraw History
        </button>
      </nav>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-6"
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Select Address</label>
          {!showWalletInput ? (
            <button
              type="button"
              onClick={() => setShowWalletInput(true)}
              className="w-full py-2 px-3 border rounded-md bg-gray-100 border-dashed border-green-500 text-green-500"
            >
              + Add wallet address
            </button>
          ) : (
            <input
              type="text"
              placeholder="Enter wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Currency</label>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setCurrency("PAYX")}
              className={`flex-1 py-2 mx-1 border rounded-md font-bold text-center ${
                currency === "PAYX"
                  ? "bg-yellow-200 border-yellow-500"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <img
                src={payx}
                alt="PAYX"
                className="inline-block w-4 h-4  mb-1 mr-2"
              />
              PAYX
              {currency === "PAYX" && (
                <span className="text-green-500 ml-2">✓</span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USDT")}
              className={`flex-1 py-2 mx-1 border rounded-md font-bold text-center ${
                currency === "USDT"
                  ? "bg-yellow-200 border-yellow-500"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <img
                src={usdtlog}
                alt="USDT"
                className="inline-block w-4 h-4 mb-1 mr-2"
              />
              USDT
              {currency === "USDT" && (
                <span className="text-green-500 ml-2">✓</span>
              )}
            </button>
          </div>
        </div>
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
                alt="TRC20"
                className="inline-block w-4 h-4 mb-1 mr-2"
              />
              TRC20
              {network === "TRC20" && (
                <span className="text-green-500 ml-2">✓</span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setNetwork("ERC20")}
              className={`flex-1 py-2 mx-1 border rounded-md font-bold text-center ${
                network === "ERC20"
                  ? "bg-yellow-200 border-yellow-500"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <img
                src={erc20}
                alt="ERC20"
                className="inline-block w-4 h-4 mb-1 mr-2"
              />
              ERC20
              {network === "ERC20" && (
                <span className="text-green-500 ml-2">✓</span>
              )}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Withdrawal Amount
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="Please enter the amount"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              required
              className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 font-bold text-gray-500">
              {currency}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Available: {user?.balance} {currency}
          </p>
          {validationMessage && (
            <p className="text-red-500 mt-1">{validationMessage}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">Refund Fee: 1 {currency}</p>
        </div>
        <button
          type="submit"
          disabled={
            !network ||
            !withdrawalAmount ||
            !walletAddress ||
            loading ||
            validationMessage
          }
          className={`w-full py-3 rounded-md text-white font-bold ${
            !network || !withdrawalAmount || !walletAddress
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          {loading ? (
            <ClipLoader color="#fff" size={20} /> // Show spinner if loading
          ) : (
            "Confirm Withdrawal"
          )}
        </button>
        <p className="text-xs text-yellow-600 bg-yellow-100 p-2 rounded-md border border-yellow-300 mt-4">
          ⚠️ For the safety of your funds, please note that the recharge address
          for each order is different. Please double-check carefully to avoid
          the risk of irretrievable funds.
        </p>
      </form>
    </div>
  );
};

export default WithdrawalForm;
