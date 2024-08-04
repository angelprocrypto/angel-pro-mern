import React, { useState } from "react";
import { axiosClient } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const BankAccountForm = () => {
  const [bankHolderName, setBankHolderName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axiosClient.post("/transaction/addbank", {
        bankHolderName,
        ifscCode,
        bankName,
        bankAccountNumber,
      });
      setBankHolderName("");
      setIfscCode("");
      setBankName("");
      setBankAccountNumber("");
      alert("Bank Account Added ");
      navigate("/");
    } catch (error) {
      console.error("Error creating bank account:", error);
      alert("Failed To Add Bank Account... ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
        <h1 className="text-lg font-bold">Add Bank Account</h1>
      </nav>
      <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-6">Bank Account Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Bank Holder Name:</label>
            <input
              type="text"
              value={bankHolderName}
              onChange={(e) => setBankHolderName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">IFSC Code:</label>
            <input
              type="text"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Bank Name:</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Bank Account Number:</label>
            <input
              type="text"
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              {loading ? (
                <ClipLoader color="#fff" size={20} /> // Show spinner if loading
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BankAccountForm;
