function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      
      {/* Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>

      {/* Text */}
      <h2 className="mt-6 text-xl font-semibold text-gray-700">
        Loading...
      </h2>

      <p className="text-gray-500 text-sm mt-2">
        Please wait while we prepare everything for you
      </p>
    </div>
  );
}

export default LoadingPage;