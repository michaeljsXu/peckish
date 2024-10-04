'use client';

import { useState } from 'react';
import Link from 'next/link';

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
              <Link href="/" className="text-gray-800">
                Home
              </Link>
            </li>
            <li>
              <Link href="/chat" className="text-gray-800">
                Chat
              </Link>
            </li>
            <li>
              <Link href="/inventory" className="text-gray-800">
                Inventory
              </Link>
            </li>
            <li>
              <Link href="/recipe" className="text-gray-800">
                Recipes
              </Link>
            </li>
            <li>
              <Link href="/profile" className="text-gray-800">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
