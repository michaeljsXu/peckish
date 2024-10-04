'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative">
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 p-2 bg-gray-800 text-white rounded"
      >
        ☰
      </button>
      {isMenuOpen && (
        <div className="fixed top-14 left-4 bg-white shadow-md rounded p-4">
          <ul className="flex flex-col gap-2">
            <li>
              <a href="#Home" className="text-gray-800">
                Home
              </a>
            </li>
            <li>
              <a href="#Chat" className="text-gray-800">
                Chat
              </a>
            </li>
            <li>
              <a href="#Inventory" className="text-gray-800">
                Inventory
              </a>
            </li>
            <li>
              <a href="#Recipes" className="text-gray-800">
                Recipes
              </a>
            </li>
            <li>
              <a href="#Profile" className="text-gray-800">
                Profile
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
