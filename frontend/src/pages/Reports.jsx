import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function Reports() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH REPORTS
  // =========================
  const fetchReports = async () => {
    try {
      const response = await api.get(
        "/report"
      );

      console.log(response.data);

      setLogs(response.data.data.logs || []);

      setStats(response.data.data.stats);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CLEAR LOGS
  // =========================
  const handleClearLogs = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to clear all logs?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete("/report/clear");

      alert("Logs Cleared Successfully");

      fetchReports();
    } catch (error) {
      console.log(error);

      alert("Failed to clear logs");
    }
  };

  // =========================
  // EXPORT CSV
  // =========================
  const handleExportCSV = () => {
    window.open(
      "http://localhost:3000/report/export/csv"
    );
  };

  // =========================
  // EXPORT JSON
  // =========================
  const handleExportJSON = () => {
    window.open(
      "http://localhost:3000/report/export/json"
    );
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          <div>
            <h1 className="text-3xl font-bold">
              Email Reports
            </h1>

            <p className="text-gray-500 mt-2">
              View analytics and email logs.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            
            <button
              onClick={handleExportCSV}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
            >
              Export CSV
            </button>

            <button
              onClick={handleExportJSON}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
            >
              Export JSON
            </button>

            <button
              onClick={handleClearLogs}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
            >
              Clear Logs
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <p>Loading reports...</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">
              Total Emails
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {stats?.total || 0}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">
              Successful
            </p>

            <h2 className="text-4xl font-bold mt-3 text-green-600">
              {stats?.success || 0}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">
              Failed
            </p>

            <h2 className="text-4xl font-bold mt-3 text-red-500">
              {stats?.failed || 0}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">
              Success Rate
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {stats?.successRate || 0}%
            </h2>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">
              Email Logs
            </h2>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-4">
                    Email
                  </th>

                  <th className="text-left p-4">
                    Subject
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                  <th className="text-left p-4">
                    Time
                  </th>
                </tr>
              </thead>

              <tbody>
                {logs.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center p-8 text-gray-500"
                    >
                      No Logs Found
                    </td>
                  </tr>
                )}

                {logs.map((log, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4">
                      {log.email}
                    </td>

                    <td className="p-4">
                      {log.subject}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          log.status === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>

                    <td className="p-4 text-sm text-gray-500">
                      {new Date(
                        log.timestamp
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Reports;