import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">

      {/* Icon */}
      <div className="text-6xl mb-4">⚠️</div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800">
        404 - Page Not Found
      </h1>

      {/* Message */}
      <p className="text-gray-500 mt-3 text-center max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Go Home
        </button>

        <button
          onClick={() => navigate(-1)}
          className="border border-gray-300 px-5 py-2 rounded-lg"
        >
          Go Back
        </button>

      </div>
    </div>
  );
}

export default ErrorPage;