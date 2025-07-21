export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 py-4 mt-16 border-t dark:border-gray-800 shadow-inner">
      <div className="container mx-auto px-4 text-center text-sm sm:text-base">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-700 dark:text-gray-200">
          Hospitallia
        </span>{" "}
        | Clinic Management System | Built by{" "}
        <a
          href="https://github.com/mrpawarGit"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-pink-400 transition-colors duration-300"
        >
          Mayur
        </a>
      </div>
    </footer>
  );
}
