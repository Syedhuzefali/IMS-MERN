import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isUserLoggedIn, logoutUser } from '../services/authService';

export default function Navbar({ title, theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());  // ← Change this
  const navigate = useNavigate();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    // Check if user is logged in when component loads
    setIsLoggedIn(isUserLoggedIn());
    // Rest of useEffect...
    window.addEventListener('storage', () => {
      setIsLoggedIn(isUserLoggedIn());
    });
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/insertproduct', label: 'Add Product' },
    { to: '/about', label: 'About' },
  ];

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-950 text-white sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-bold hover:text-blue-200"
          >
            {title}
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">

            {navLinks.map((link) => (

              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? 'px-3 py-2 bg-blue-700 rounded'
                    : 'px-3 py-2 hover:bg-blue-700 rounded'
                }
              >
                {link.label}
              </NavLink>

            ))}

            {/* Login/Signup or Logout Buttons */}
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? 'px-3 py-2 bg-green-600 rounded'
                      : 'px-3 py-2 hover:bg-green-600 rounded'
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? 'px-3 py-2 bg-green-600 rounded'
                      : 'px-3 py-2 hover:bg-green-600 rounded'
                  }
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-2 rounded bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            )}

            <button
              type="button"
              onClick={onToggleTheme}
              className="px-3 py-2 rounded bg-blue-700 hover:bg-blue-800 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex flex-col gap-1"
          >
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>

        </div>

        {/* Mobile Navigation */}
        {isOpen && (

          <div className="md:hidden pb-3">

            {navLinks.map((link) => (

              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? 'block px-3 py-2 bg-blue-700 rounded'
                    : 'block px-3 py-2 hover:bg-blue-700 rounded'
                }
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>

            ))}

            {/* Mobile Login/Signup or Logout */}
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? 'block px-3 py-2 bg-green-600 rounded mt-2'
                      : 'block px-3 py-2 hover:bg-green-600 rounded mt-2'
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? 'block px-3 py-2 bg-green-600 rounded mt-2'
                      : 'block px-3 py-2 hover:bg-green-600 rounded mt-2'
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full mt-2 px-3 py-2 rounded bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onToggleTheme();
                setIsOpen(false);
              }}
              className="w-full mt-2 px-3 py-2 rounded bg-blue-700 hover:bg-blue-800 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

          </div>

        )}

      </div>
    </nav>
  );
}