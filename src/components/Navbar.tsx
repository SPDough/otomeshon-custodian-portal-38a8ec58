
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { User, LogIn } from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    // Simulate login for demonstration
    setIsLoggedIn(true);
    setUsername("John Doe");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <nav className="border-b border-purple-200 bg-purple-50 p-4 shadow-sm">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-purple-600">Otomeshon</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/search" className="text-purple-700 hover:text-purple-900">
            Search
          </Link>
          <Link to="/about" className="text-purple-700 hover:text-purple-900">
            About
          </Link>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1">
                <User size={18} className="text-purple-600" />
                <span className="text-sm text-purple-800">{username}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="border-purple-300 text-purple-700 hover:bg-purple-100"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              size="sm" 
              onClick={handleLogin}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <LogIn size={16} className="mr-1" />
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
