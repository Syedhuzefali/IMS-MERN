import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ title, theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const isDarkMode = theme === 'dark';

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/insertproduct', label: 'Add Product' },
    { to: '/about', label: 'About' },
  ];

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
