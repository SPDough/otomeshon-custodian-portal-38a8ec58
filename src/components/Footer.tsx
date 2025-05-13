
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white p-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} DataGrid. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <Link to="/" className="text-sm text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link to="/search" className="text-sm text-gray-600 hover:text-blue-600">
              Search
            </Link>
            <Link to="/about" className="text-sm text-gray-600 hover:text-blue-600">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
