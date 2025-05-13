
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-purple-200 bg-purple-50 p-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="text-sm text-purple-600">
              &copy; {new Date().getFullYear()} DataGrid. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <Link to="/" className="text-sm text-purple-600 hover:text-purple-900">
              Home
            </Link>
            <Link to="/search" className="text-sm text-purple-600 hover:text-purple-900">
              Search
            </Link>
            <Link to="/about" className="text-sm text-purple-600 hover:text-purple-900">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
