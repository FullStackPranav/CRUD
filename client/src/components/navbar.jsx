import React from 'react';

export default function Navbar() {
  const userName = localStorage.getItem('userName');
  const userPhone = localStorage.getItem('userPhone');

  return (
    <nav className="bg-indigo-800 text-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        
        {/* Left Side - Phone */}
        <div className="text-sm sm:text-base font-semibold mb-2 sm:mb-0">
          📞 {userPhone || 'Phone not available'}
        </div>

        {/* Right Side - Username */}
        <div className="text-sm sm:text-base font-semibold">
          👋 Hi {userName || 'Guest'}
        </div>
      </div>
    </nav>
  );
}
