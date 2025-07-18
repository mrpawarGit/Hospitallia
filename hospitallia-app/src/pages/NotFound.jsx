const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh]">
    <h1 className="text-4xl font-bold text-red-600 mb-2">404</h1>
    <p className="text-lg text-gray-600 mb-6">Page Not Found</p>
    <a href="/" className="text-blue-600 hover:underline">
      Go to Home
    </a>
  </div>
);

export default NotFound;
