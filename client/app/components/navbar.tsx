'use client';

import { useState } from 'react';
import Link from 'next/link';
import { pages } from '../constants/constants';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-orange-500 p-4 flex flex-row justify-around">
        <div className="mx-auto flex flex-row justify-center items-center">
          {pages.map((page, index) => (
            <Link key={index} href={page.href} className="text-white mx-4">
              {page.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* FUTURE! MOBILE */}
      {/* <nav className="relative">
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
      </nav> */}
    </>
  );
}
