
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-6 text-center shadow-md">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-wider">SRI VENKATESWARA UNIVERSITY :: TIRUPATI</h1>
      <p className="text-sm sm:text-base text-blue-200 mt-1">(NAAC 'A+' Grade) - visit us: www.svudoa.in</p>
      <div className="mt-4 border-t border-blue-500 pt-4">
        <h2 className="text-xl sm:text-2xl font-semibold">APPLICATION FOR HIRING THE SERVICES OF ACADEMIC CONSULTANTS</h2>
        <p className="text-blue-200 mt-1">Notification No.E.II(6)/ACS/2025-26, dated .09.2025</p>
      </div>
    </header>
  );
};

export default Header;
