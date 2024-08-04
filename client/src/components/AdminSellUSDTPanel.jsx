import React, { useState, useEffect } from "react";
import { axiosClient } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"; // Import the loader

const AdminSellUSDTPanel = () => {
  const [sellUSDTTransactions, setSellUSDTTransactions] = useState([]);
  const [expandedTransactionId, setExpandedTransactionId] = useState(null);
  const [utrId, setUtrId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const fetchSellUSDTTransactions = async () => {
      try {
        const response = await axiosClient.get("transaction/getallsellusdts");
        setSellUSDTTransactions(response.result);
      } catch (error) {
        console.error("Error fetching sellUSDT transactions:", error);
        setError("Failed to fetch transactions. Please try again.");
      }
    };
    fetchSellUSDTTransactions();
  }, []);

  const handleStatusChange = async (transactionId, newStatus) => {
    try {
      const response = await axiosClient.put(
        `/transaction/sellusdt/${transactionId}`,
        {
          status: newStatus,
          utrId: newStatus === "Successful" ? utrId : undefined,
        }
      );
      setSellUSDTTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction._id === transactionId
            ? { ...transaction, status: newStatus }
            : transaction
        )
      );
      window.location.reload();
    } catch (e) {
      console.error("Error updating transaction status:", e);
      window.location.reload();
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const toggleExpand = (transactionId) => {
    setExpandedTransactionId(
      expandedTransactionId === transactionId ? null : transactionId
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4 text-orange-600">Admin Panel</h1>
      <p className="text-lg mb-8 text-center max-w-2xl">
        Manage all the sell USDT transactions from this panel. Click on a
        transaction to view more details and take actions.
      </p>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-auto mb-4">
        <h2 className="text-2xl font-bold p-4 border-b bg-orange-600 text-white">
          Sell USDT Transactions
        </h2>
        {error && <p className="text-red-500 p-4">{error}</p>}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payee Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sell Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sellUSDTTransactions
              .slice()
              .reverse()
              .map((transaction) => (
                <React.Fragment key={transaction._id}>
                  <tr
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleExpand(transaction._id)}
                  >
                    <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900">
                      {transaction.bankHolderName}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                      {transaction.bankAccountNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                      {transaction.sellUsdtAmount} USDT
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
                              <strong>Payee Name:</strong>{" "}
                              {transaction.bankHolderName}
                            </p>
                            <p>
                              <strong>Account No:</strong>{" "}
                              {transaction.bankAccountNumber}
                            </p>
                            <p>
                              <strong>IFSC Code:</strong> {transaction.ifscCode}
                            </p>
                            <p>
                              <strong>Sell Amount:</strong>{" "}
                              {transaction.sellUsdtAmount} USDT
                            </p>
                            <p>
                              <strong>Amount in INR:</strong> ₹
                              {transaction.usdtToRupees}
                            </p>
                            <p>
                              <strong>Status:</strong> {transaction.status}
                            </p>
                            {transaction.status === "Processing" && (
                              <div className="mt-4">
                                <div>
                                  <label className="block text-sm font-bold mb-2">
                                    UTR ID
                                  </label>
                                  <input
                                    type="text"
                                    value={utrId}
                                    onChange={(e) => setUtrId(e.target.value)}
                                    className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>
                                <div className=" w-full flex justify-around">
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

export default AdminSellUSDTPanel;
