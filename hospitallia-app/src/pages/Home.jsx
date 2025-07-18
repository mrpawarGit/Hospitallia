const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh]">
    <h1 className="text-3xl font-bold mb-3 text-blue-700">
      Welcome to Hospitallia
    </h1>
    <p className="text-lg text-gray-600 mb-6">
      Your all-in-one hospital & clinic management system.
    </p>
    <div>
      <a
        href="/login"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-3"
      >
        Login
      </a>
      <a
        href="/signup"
        className="bg-gray-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200"
      >
        Sign Up
      </a>
    </div>
  </div>
);

export default Home;
