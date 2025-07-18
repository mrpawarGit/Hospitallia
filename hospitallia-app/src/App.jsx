// src/App.jsx
import Navbar from "./components/shared/Navbar";
import AppRoutes from "./router/Routes";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
