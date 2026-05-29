import DashboardLayout from "../layouts/DashboardLayout";

function Users() {
  const users = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      role: "User",
    },
  ];

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            Users
          </h1>

          <button className="bg-black text-white px-5 py-3 rounded-xl">
            Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4">Name</th>
                <th className="text-left py-4">Email</th>
                <th className="text-left py-4">Role</th>
                <th className="text-left py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-4">{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.role}</td>

                  <td>
                    <button className="text-blue-500">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Users;