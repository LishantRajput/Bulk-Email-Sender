import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import { useAuthState } from "../hooks/AuthState";

function Dashboard() {
  const navigate = useNavigate();
const {islogin}= useAuthState()
useEffect(()=>{
  if(!islogin) navigate("/login")
})
  const [dashboardData, setDashboardData] =
    useState(null);

  const [smtpCount, setSmtpCount] =
    useState(0);

  const [pollInterval, setPollInterval] =
    useState(30000);

  const [loading, setLoading] =
    useState(true);

  // FETCH SMTP CONFIG COUNT
  const fetchSMTPConfigs = async () => {
    try {
      const response = await api.get(
        "/config/smtp"
      );

      setSmtpCount(
        response.data.userConfigs?.length || 0
      );
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH POLL STATUS
  const fetchPollStatus = async () => {
    try {
      const response = await api.get(
        "/dashboard/poll-status"
      );

      console.log("Poll Status:", response.data);

      setPollInterval(
        response.data.data.pollInterval
      );
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH DASHBOARD DATA
  const fetchDashboardData = async () => {
    try {
      const response = await api.get(
        "/dashboard/data"
      );

      console.log(
        "Dashboard Data:",
        response.data
      );

      setDashboardData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // INITIAL LOAD
  useEffect(() => {
    fetchSMTPConfigs();
    fetchPollStatus();
    fetchDashboardData();
  }, []);

  // AUTO POLLING
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPollStatus();
      fetchDashboardData();
    }, pollInterval);

    return () => clearInterval(interval);
  }, [pollInterval]);

  // STATS
  const stats = [
    {
      title: "SMTP Configs",
      value: smtpCount,
    },
    {
      title: "Scheduled Jobs",
      value:
        dashboardData?.scheduledJobs?.length || 0,
    },
    {
      title: "Batch Status",
      value:
        dashboardData?.batch?.isRunning
          ? "Running"
          : "Idle",
    },
    {
      title: "Polling Speed",
      value: `${pollInterval / 1000}s`,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="text-sm sm:text-base text-gray-500">
            Live email campaign dashboard.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">
              Loading dashboard...
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <p className="text-gray-500 text-sm sm:text-base">
                {item.title}
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold mt-3">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* Live Activity */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl sm:text-2xl font-bold">
                Live Activity
              </h2>

              <span className="text-sm text-gray-500">
                Auto Refresh
              </span>
            </div>

            <div className="space-y-4">
              
              {/* Batch Status */}
              <div className="border rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    Batch Email Service
                  </h3>

                  <p className="text-sm text-gray-500">
                    Current batch processing state
                  </p>
                </div>

                {dashboardData?.batch?.isRunning ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Running
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    Idle
                  </span>
                )}
              </div>

              {/* Scheduled Jobs */}
              <div className="border rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">
                      Scheduled Jobs
                    </h3>

                    <p className="text-sm text-gray-500">
                      Pending & running jobs
                    </p>
                  </div>

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {
                      dashboardData?.scheduledJobs
                        ?.length
                    }
                  </span>
                </div>

                {/* Job List */}
                <div className="mt-4 space-y-3">
                  {dashboardData?.scheduledJobs
                    ?.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No scheduled jobs
                    </p>
                  )}

                  {dashboardData?.scheduledJobs?.map(
                    (job, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-3"
                      >
                        <h4 className="font-medium">
                          {job.name ||
                            "Campaign Job"}
                        </h4>

                        <p className="text-sm text-gray-500">
                          Status: {job.status}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Last Updated */}
              <div className="border rounded-xl p-4">
                <h3 className="font-semibold mb-2">
                  Last Updated
                </h3>

                <p className="text-sm text-gray-500">
                  {dashboardData?.timestamp
                    ? new Date(
                        dashboardData.timestamp
                      ).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow">
            <h2 className="text-xl sm:text-2xl font-bold mb-5">
              Quick Actions
            </h2>

            <div className="space-y-4">
              
              <button
                className="w-full bg-black text-white py-3 sm:py-4 rounded-xl hover:opacity-90 transition"
              >
                Create Campaign
              </button>

              <button
                className="w-full border py-3 sm:py-4 rounded-xl hover:bg-gray-100 transition"
                onClick={() =>
                  navigate("/smtp")
                }
              >
                Add SMTP Config
              </button>

              <button
                className="w-full border py-3 sm:py-4 rounded-xl hover:bg-gray-100 transition"
              >
                Upload Contacts
              </button>

              <button
                className="w-full border py-3 sm:py-4 rounded-xl hover:bg-gray-100 transition"
              >
                View Analytics
              </button>
            </div>

            {/* System Status */}
            <div className="mt-8 border rounded-2xl p-5 bg-gray-50">
              <h3 className="font-bold mb-3">
                System Status
              </h3>

              <div className="space-y-2 text-sm">
                <p>
                  SMTP Configurations:
                  <span className="font-semibold ml-2">
                    {smtpCount}
                  </span>
                </p>

                <p>
                  Polling Interval:
                  <span className="font-semibold ml-2">
                    {pollInterval / 1000}s
                  </span>
                </p>

                <p>
                  Active Jobs:
                  <span className="font-semibold ml-2">
                    {
                      dashboardData?.scheduledJobs
                        ?.length
                    }
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;