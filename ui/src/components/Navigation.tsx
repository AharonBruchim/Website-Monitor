import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, List } from 'lucide-react';

const Navigation: React.FC = ()  => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Activity size={24} className="text-blue-500" />
              <span className="text-xl font-semibold text-gray-900">Website Monitor</span>
            </div>
            
            <div className="flex gap-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <Activity size={18} />
                Dashboard
              </NavLink>
              
              <NavLink
                to="/websites"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <List size={18} />
                All Websites
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;