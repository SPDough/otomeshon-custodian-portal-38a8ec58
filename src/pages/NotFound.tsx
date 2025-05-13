
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col items-center justify-center bg-white px-4 py-20">
          <div className="text-center">
            <h1 className="mb-4 text-6xl font-extrabold text-purple-600">404</h1>
            <h2 className="mb-6 text-3xl font-bold text-gray-800">Page Not Found</h2>
            <p className="mb-10 text-xl text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/"
              className="rounded-md bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
            >
              Return Home
            </Link>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
