
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white p-4 shadow-sm">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">DataGrid</span>
        </Link>
        <div className="flex gap-6">
          <Link to="/search" className="text-gray-700 hover:text-blue-600">
            Search
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
