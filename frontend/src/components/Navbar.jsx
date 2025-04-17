import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import homeLogo from '../assets/crmhomelogo.png';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeProvider';

const Navbar = ({ isNavbarVisible }) => {
  const API_URI = import.meta.env.VITE_API_BASE_URI;
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { userData, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    if (userData) {
      setLocalUser(userData);
    }
  }, [userData]);

  const NAV_ITEMS_STYLE = `hover:text-white px-4 py-2 rounded-full transition duration-300 hover:bg-red-600 capitalize ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URI}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (res.status === 200) {
        const result = await res.json();

        if (result.status === 'success') {
          alert('Logout successful');
          setLocalUser(null);
          setIsLoggedIn(false);
          navigate('/login');
        } else {
          console.error('Logout failed:', result.message);
        }
      } else {
        console.error('Unexpected status code:', res.status);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-1/2 -translate-x-1/2 transition-transform duration-300 ease-in-out rounded-b-full h-22
            ${isNavbarVisible ? "translate-y-0" : "-translate-y-full"} ${theme === 'dark' ? 'bg-black-400 text-white' : 'bg-white text-black'} w-[90vw] shadow-2xl flex items-center px-8 justify-between`}
    >
      <div className="flex items-center uppercase font-bold text-2xl">
        <img src={homeLogo} alt="Home Logo" className="h-22 w-auto object-contain -mr-5" /> &nbsp;
        <span className={`${theme === 'dark' ? 'text-red-600' : 'text-red-600'} uppercase text-2xl`}> CRM </span> &nbsp;Portal
      </div>
      
      <button
        className="lg:hidden text-gray-600 dark:text-white focus:outline-none hover:scale-110 hover:bg-gray-300 dark:hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div className={`absolute lg:static top-20 left-0 w-full bg-white dark:bg-black-400 lg:bg-transparent lg:flex lg:items-center lg:justify-center lg:space-x-6 p-4 lg:p-0 transition-all ${
          isOpen ? "block" : "hidden"
        }`}>
        <button className={`${NAV_ITEMS_STYLE}`} onClick={() => navigate("/home")}>Dashboard</button>
        <button className={`${NAV_ITEMS_STYLE}`} onClick={() => navigate("/Customers")}>Customers</button>
        <button className={`${NAV_ITEMS_STYLE}`} onClick={() => navigate("/Leads")}>Leads</button>
        <button className={`${NAV_ITEMS_STYLE}`} onClick={() => navigate("/Orders")}>Orders</button>
        <button className={`${NAV_ITEMS_STYLE}`}>My Profile</button>

        {isLoggedIn && userData?.role === "admin" && (
  <button className={`${NAV_ITEMS_STYLE}`} onClick={() => navigate("/add-user")}> Add User</button>
)}

        <button
          className="lg:hidden w-full bg-red-500 text-white px-4 py-2 mt-4 rounded-full hover:bg-red-700 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="hidden lg:flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="relative flex items-center w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition duration-300"
        >
          <div
            className={`w-5 h-5 bg-white dark:bg-yellow-400 rounded-full shadow-md transform transition-transform duration-300
              ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}
          />
          <span className="absolute left-1 text-gray-700 dark:text-gray-200">
            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
          </span>
        </button>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
