import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import { errorEmitter, successEmitter } from "../utils/toastemitter";

function Smtp() {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    host: "",
    port: 587,
    secure: false,
    user: "",
    pass: "",
    fromEmail: "",
    fromName: "",
    isDefault: false,
  });

  useEffect(() => {
    fetchConfigs();
  }, []);

  // GET SMTP CONFIGS

  const fetchConfigs = async () => {
    try {
      const response = await api.get("/config/smtp");

      setConfigs(response.data.userConfigs || []);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : value,
    });
  };

  // CREATE SMTP

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post(
        "/config/smtp",
        formData
      );

      console.log("Line no 63",response);
      // if (response.success) {
      //   successEmitter("SMTP Added Successfully");
      // }
      // else{

      // }

      fetchConfigs();

      setFormData({
        name: "",
        host: "",
        port: 587,
        secure: false,
        user: "",
        pass: "",
        fromEmail: "",
        fromName: "",
        isDefault: false,
      });
    } catch (error) {
      console.log(error);

      errorEmitter(
        error?.response?.data?.message ||
        "Failed to add SMTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // DELETE SMTP

  const handleDelete = async (id) => {
    try {
      await api.delete(`/config/smtp/${id}`);

      alert("SMTP Deleted");

      fetchConfigs();
    } catch (error) {
      console.log(error);
    }
  };


  // SET DEFAULT SMTP

  const handleSetDefault = async (id) => {
    try {
      await api.post(
        `/config/smtp/${id}/default`
      );

      alert("Default SMTP Updated");

      fetchConfigs();
    } catch (error) {
      console.log(error);
    }
  };

  // TEST SMTP

  const handleTest = async () => {
    try {
      const response = await api.post(
        "/config/smtp/test",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        successEmitter(response.data.message)
      }
      else {
        errorEmitter(response.data.message);
      }
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Error:", error);

      errorEmitter("SMTP Test Failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            SMTP Configuration
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your SMTP servers.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* FORM */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow border">

            {/* Header */}
            <div className="bg-blue-600 text-white px-5 py-4 rounded-t-2xl">
              <h2 className="text-xl font-semibold">
                New SMTP Configuration
              </h2>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* Name */}
              <div>
                <label className="block font-medium mb-2">
                  Configuration Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="My Gmail SMTP"
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              {/* Host + Port */}
              <div className="grid md:grid-cols-3 gap-5">

                <div className="md:col-span-2">
                  <label className="block font-medium mb-2">
                    SMTP Host
                  </label>

                  <input
                    type="text"
                    name="host"
                    value={formData.host}
                    onChange={handleChange}
                    placeholder="smtp.gmail.com"
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">
                    Port
                  </label>

                  <input
                    type="number"
                    name="port"
                    value={formData.port}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>
              </div>

              {/* TLS */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="secure"
                  checked={formData.secure}
                  onChange={handleChange}
                />

                <label>
                  Use TLS/SSL
                </label>
              </div>

              {/* Username */}
              <div>
                <label className="block font-medium mb-2">
                  Username
                </label>

                <input
                  type="text"
                  name="user"
                  value={formData.user}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block font-medium mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="pass"
                  value={formData.pass}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              {/* From Email */}
              <div>
                <label className="block font-medium mb-2">
                  From Email
                </label>

                <input
                  type="email"
                  name="fromEmail"
                  value={formData.fromEmail}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              {/* From Name */}
              <div>
                <label className="block font-medium mb-2">
                  From Name
                </label>

                <input
                  type="text"
                  name="fromName"
                  value={formData.fromName}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              {/* Default */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                />

                <label>
                  Set as default configuration
                </label>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
                >
                  {loading
                    ? "Saving..."
                    : "Save Configuration"}
                </button>

                <button
                  type="button"
                  onClick={handleTest}
                  className="border px-5 py-3 rounded-xl"
                >
                  Test Connection
                </button>
              </div>
            </form>
          </div>

          {/* CONFIG LIST */}
          <div className="bg-white rounded-2xl shadow border p-5">

            <h2 className="text-2xl font-bold mb-5">
              Saved Configurations
            </h2>

            <div className="space-y-4">
              {configs.length === 0 && (
                <p className="text-gray-500">
                  No SMTP Config Found
                </p>
              )}

              {configs.map((config) => (
                <div
                  key={config.id}
                  className="border rounded-xl p-4"
                >
                  <div className="flex items-center justify-between">

                    <div>
                      <h3 className="font-bold">
                        {config.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {config.host}
                      </p>
                    </div>

                    {config.isDefault && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">

                    {!config.isDefault && (
                      <button
                        onClick={() =>
                          handleSetDefault(config.id)
                        }
                        className="border px-3 py-2 rounded-lg text-sm"
                      >
                        Set Default
                      </button>
                    )}

                    <button
                      onClick={() =>
                        handleDelete(config.id)
                      }
                      className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Smtp;      