import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom for navigation

const Header = () => {
  return (
    <header className='bg-slate-200 shadow-md'> {/* Header container with background color and shadow */}
      <div className='flex justify-between items-center max-w-7xl mx-auto p-3'> {/* Inner container for header content, centered with max width and padding */}
        {/* Link to home */}
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'> {/* Heading with responsive text size and flex wrap */}
            <span className='text-cyan-600'>Supply</span> {/* First part of the heading with cyan color */}
            <span className='text-black'>Chain</span> {/* Second part of the heading with black color */}
          </h1>
        </Link>
        <ul className='flex gap-4'> {/* Navigation links container with flex layout and gap between items */}
          {/* Navigation Link to home */}
          <Link to='/'>
            <li className='hidden sm:inline text-lg text-slate-700 border-b-4 border-transparent hover:border-cyan-600 transition duration-400 ease-in-out transform hover:translate-x-full font-semibold'>
              Home {/* Home link with responsive visibility, text styling, and hover effects */}
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header; // Export the Header component
