import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link,
  Image,
  Eye,
  Rocket,
} from "lucide-react";
import { errorEmitter, successEmitter } from "../utils/toastemitter";

function Emails() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [smtpConfigs, setSmtpConfigs] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState("");

  const [loading, setLoading] = useState(false);

  const [previewContacts, setPreviewContacts] = useState([]);
  const [totalContacts, setTotalContacts] = useState(0);

  const [useBatch, setUseBatch] = useState(false);

  const [scheduleEmail, setScheduleEmail] = useState(false);

  const [scheduledTime, setScheduledTime] = useState("");

  // Fetch SMTP Configs
  useEffect(() => {
    fetchSMTPConfigs();
  }, []);

  const fetchSMTPConfigs = async () => {
    try {
      const response = await api.get("/config/smtp");

      setSmtpConfigs(response.data.userConfigs || []);

      const defaultConfig = response.data.userConfigs.find(
        (item) => item.isDefault
      );

      if (defaultConfig) {
        setSelectedConfig(defaultConfig.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // File Upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    setSelectedFile(file);

    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("excelFile", file);

      const response = await api.post(
        "/parse-excel",
        formData
      );

      setPreviewContacts(response.data.contacts);

      setTotalContacts(response.data.totalCount);
    } catch (error) {
      console.log(error);

      errorEmitter("Failed to parse excel file");
    }
  };

  // Send Emails
  const handleSend = async () => {
    try {
      console.log(previewContacts)
      if (!selectedFile) {
        return warningEmitter("Please upload excel file");
      }

      if (!selectedConfig) {
        return warningEmitter("Please select SMTP config");
      }

      if (!subject) {
        return warningEmitter("Please enter subject");
      }

      if (!message) {
        return warningEmitter("Please enter email content");
      }

      setLoading(true);

      const formData = new FormData();

      formData.append("configId", selectedConfig);

      formData.append("subject", subject);

      formData.append("htmlContent", message);

      formData.append("excelFile", selectedFile);

      // Batch Sending
      if (useBatch) {
        formData.append("useBatch", "on");

        formData.append("batchSize", "20");

        formData.append("batchDelay", "1");

        formData.append("emailDelay", "5");
      }

      // Scheduled Email
      if (scheduleEmail) {
        formData.append("scheduleEmail", "on");

        formData.append("scheduledTime", scheduledTime);
      }

      const response = await api.post(
        "/send",
        formData
      );
      if (response.data.success)
        successEmitter(response.data.message);
      else
        errorEmitter(response.data.message)
    } catch (error) {
      console.log(error);

      errorEmitter(
        error?.response?.data?.message ||
        "Failed to send emails"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#f3f3f3] p-2 sm:p-4 lg:p-6">
        {/* Main Container */}
        <div className="bg-white border border-gray-300 rounded-md shadow-sm overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-300 bg-gray-50 px-3 sm:px-4 py-3">
            <h2 className="flex items-center gap-2 text-base sm:text-lg font-semibold">
              ✉️ Email Content
            </h2>
          </div>

          {/* Body */}
          <div className="p-3 sm:p-4 lg:p-5">
            {/* SMTP Config */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                SMTP Configuration
              </label>

              <select
                value={selectedConfig}
                onChange={(e) =>
                  setSelectedConfig(e.target.value)
                }
                className="w-full border border-gray-300 rounded px-3 py-3"
              >
                <option value="">
                  Select SMTP Config
                </option>

                {smtpConfigs.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
                placeholder="Hello {{FirstName}}, welcome!"
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                You can use placeholders like
                {" {{FirstName}} "} and
                {" {{Company}} "}
              </p>
            </div>

            {/* Editor */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Content
              </label>

              <div className="border border-gray-300 rounded overflow-hidden bg-white">
                {/* Toolbar */}
                <div className="flex items-center gap-2 sm:gap-3 border-b border-gray-300 px-2 sm:px-3 py-2 bg-gray-50 overflow-x-auto">
                  <select className="min-w-[100px] border rounded px-2 py-1 text-sm bg-white">
                    <option>Normal</option>
                    <option>Heading 1</option>
                    <option>Heading 2</option>
                  </select>

                  <button className="p-1 hover:text-blue-600">
                    <Bold size={16} />
                  </button>

                  <button className="p-1 hover:text-blue-600">
                    <Italic size={16} />
                  </button>

                  <button className="p-1 hover:text-blue-600">
                    <Underline size={16} />
                  </button>

                  <button className="p-1 hover:text-blue-600">
                    <Strikethrough size={16} />
                  </button>

                  <button className="p-1 hover:text-blue-600">
                    <List size={16} />
                  </button>

                  <button className="p-1 hover:text-blue-600">
                    <ListOrdered size={16} />
                  </button>

                  <button className="p-1 hover:text-blue-600">
                    <Link size={16} />
                  </button>

                  <button className="p-1 hover:text-blue-600">
                    <Image size={16} />
                  </button>
                </div>

                {/* Textarea */}
                <textarea
                  rows={14}
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Write your email content here..."
                  className="
                    w-full
                    min-h-[300px]
                    sm:min-h-[400px]
                    p-3 sm:p-4
                    text-sm
                    resize-none
                    focus:outline-none
                  "
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Contacts (CSV/XLSX)
              </label>

              <input
                type="file"
                onChange={handleFileChange}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded
                  px-3
                  py-2
                  text-sm
                  bg-white
                "
              />

              {selectedFile && (
                <p className="text-sm text-gray-500 mt-2 break-all">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            {/* Contacts Preview */}
            {previewContacts.length > 0 && (
              <div className="bg-gray-100 p-4 rounded mb-5">
                <h3 className="font-semibold mb-3">
                  Total Contacts: {totalContacts}
                </h3>

                <div className="space-y-2">
                  {previewContacts.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="text-sm border-b py-1"
                      >
                        {item.email}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Batch Sending */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={useBatch}
                onChange={(e) =>
                  setUseBatch(e.target.checked)
                }
              />

              <label className="text-sm">
                Enable Batch Sending
              </label>
            </div>

            {/* Schedule Email */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={scheduleEmail}
                onChange={(e) =>
                  setScheduleEmail(
                    e.target.checked
                  )
                }
              />

              <label className="text-sm">
                Schedule Email
              </label>
            </div>

            {/* Scheduled Time */}
            {scheduleEmail && (
              <div className="mb-5">
                <input
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) =>
                    setScheduledTime(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded px-3 py-3"
                />
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSend}
                disabled={loading}
                className="
                  w-full sm:w-auto
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-5 py-2.5
                  rounded
                  flex items-center justify-center gap-2
                  text-sm font-medium
                  transition
                "
              >
                <Rocket size={16} />

                {loading
                  ? "Sending..."
                  : "Send Emails"}
              </button>

              <button
                className="
                  w-full sm:w-auto
                  bg-gray-600
                  hover:bg-gray-700
                  text-white
                  px-5 py-2.5
                  rounded
                  flex items-center justify-center gap-2
                  text-sm font-medium
                  transition
                "
              >
                <Eye size={16} />
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Emails;