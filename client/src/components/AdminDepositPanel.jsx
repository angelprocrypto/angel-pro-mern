import React, { useState, useEffect } from "react";
import { axiosClient } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"; // Import the loader

const AdminDepositPanel = () => {
  const [depositTransactions, setDepositTransactions] = useState([]);
  const [expandedTransactionId, setExpandedTransactionId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const fetchDepositTransactions = async () => {
      try {
        const response = await axiosClient.get("/transaction/getalldeposits");
        setDepositTransactions(response.result); // Ensure correct data access
      } catch (error) {
        console.error(`Error occurred: ${error}`);
        setError("Failed to fetch transactions. Please try again.");
      }
    };
    fetchDepositTransactions();
  }, []);

  const handleStatusChange = async (transactionId, newStatus) => {
    setLoading(true);
    try {
      const response = await axiosClient.put(
        `/transaction/deposit/${transactionId}`,
        { status: newStatus }
      );
      setDepositTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction._id === transactionId
            ? { ...transaction, status: newStatus }
            : transaction
        )
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating transaction status: " + error);
      window.location.reload();
    }
  };

  const toggleExpand = (transactionId) => {
    setExpandedTransactionId(
      expandedTransactionId === transactionId ? null : transactionId
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100  ">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-auto mb-4">
        <h2 className="text-2xl font-bold p-4 border-b bg-orange-600 text-white">
          Deposit Transactions
        </h2>
        {error && <p className="text-red-500 p-4">{error}</p>}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Network
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deposit Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {depositTransactions
              .slice()
              .reverse()
              .map((transaction) => (
                <React.Fragment key={transaction._id}>
                  <tr
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleExpand(transaction._id)}
                  >
                    <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900">
                      {transaction.network}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                      {transaction.depositAmount} USDT
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                      {transaction.transactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                      {transaction.status}
                    </td>
                  </tr>
                  {expandedTransactionId === transaction._id && (
                    <tr>
                      <td colSpan="4" className="p-4">
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">
                              Transaction Details
                            </h3>
                            <p>
                              <strong>Network:</strong> {transaction.network}
                            </p>
                            <p>
                              <strong>Deposit Amount:</strong>{" "}
                              {transaction.depositAmount} USDT
                            </p>
                            <p>
                              <strong>Transaction ID:</strong>{" "}
                              {transaction.transactionId}
                            </p>
                            <p>
                              <strong>Status:</strong> {transaction.status}
                            </p>
                            {transaction.status === "Processing" && (
                              <div className="mt-4 w-full flex justify-around">
                                <button
                                  className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                  disabled={loading}
                                  onClick={() => {
                                    handleStatusChange(
                                      transaction._id,
                                      "Failed"
                                    );
                                    // navigate("/adminpage");
                                  }}
                                >
                                  {loading ? (
                                    <ClipLoader color="#fff" size={20} /> // Show spinner if loading
                                  ) : (
                                    "Mark as Failed"
                                  )}
                                </button>
                                <button
                                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                  disabled={loading}
                                  onClick={() => {
                                    handleStatusChange(
                                      transaction._id,
                                      "Successful"
                                    );
                                    // navigate("/adminpage");
                                  }}
                                >
                                  {loading ? (
                                    <ClipLoader color="#fff" size={20} /> // Show spinner if loading
                                  ) : (
                                    "Mark as Successful"
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDepositPanel;
