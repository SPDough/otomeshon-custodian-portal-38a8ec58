
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="border-b border-purple-200 bg-purple-50 p-4 shadow-sm">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-purple-600">CustodialData</span>
        </Link>
        <div className="flex gap-6">
          <Link to="/search" className="text-purple-700 hover:text-purple-900">
            Search
          </Link>
          <Link to="/about" className="text-purple-700 hover:text-purple-900">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
