import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import AppRoutes from "./router/Routes";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 dark:text-gray-100">
      <Navbar  />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
