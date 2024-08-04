import React from "react";
import { useNavigate } from "react-router-dom";
import { FiCreditCard, FiDollarSign } from "react-icons/fi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { CiBank } from "react-icons/ci";
const TransactionComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-around items-center bg-white shadow-md p-4 rounded-md mt-4">
      <button
        onClick={() => navigate("/deposit")}
        className="flex flex-col items-center text-gray-700 hover:text-blue-500"
      >
        <FiCreditCard className="w-6 h-6" />
        <span className="mt-2 text-sm font-bold">Deposit</span>
      </button>
      <button
        onClick={() => navigate("/addbank")}
        className="flex flex-col items-center text-gray-700 hover:text-blue-500"
      >
        <CiBank className="w-6 h-6" />
        <span className="mt-2 text-sm font-bold">Add Bank</span>
      </button>
      <button
        onClick={() => navigate("/withdrawal")}
        className="flex flex-col items-center text-gray-700 hover:text-blue-500"
      >
        <FiDollarSign className="w-6 h-6" />
        <span className="mt-2 text-sm font-bold">Withdrawal</span>
      </button>
      <button
        onClick={() => navigate("/sellusdt")}
        className="flex flex-col items-center text-gray-700 hover:text-blue-500"
      >
        <FaMoneyBillTransfer className="w-6 h-6" />
        <span className="mt-2 text-sm font-bold">Sell USDT</span>
      </button>
    </div>
  );
};

export default TransactionComponent;
