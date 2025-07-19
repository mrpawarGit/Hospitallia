export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-center py-4 mt-16 border-t dark:border-gray-800">
      <div className="container mx-auto">
        &copy; {new Date().getFullYear()} Hospitallia Clinic Management System.
        All rights reserved.
      </div>
    </footer>
  );
}
