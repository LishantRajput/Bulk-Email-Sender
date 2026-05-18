import DashboardLayout from "../layouts/DashboardLayout";

function Settings() {
  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-2xl shadow max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">
          Settings
        </h1>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Company Name"
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="email"
            placeholder="Support Email"
            className="w-full border p-4 rounded-xl"
          />

          <button className="bg-black text-white px-6 py-3 rounded-xl">
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;