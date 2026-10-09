import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { selectedBranch, setSelectedBranch } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const branches = [
    'Doha Fresh Markets',
    'Doha Fresh Markets (Al Waab)',
    'Doha Fresh Markets (The Pearl)',
    'Doha Fresh Markets (Lusail)',
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-3 flex items-center justify-between sticky top-0 z-10">
      {/* Branch Selector Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700 focus:outline-none transition-colors"
        >
          <span>{selectedBranch}</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {dropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-20"
              onClick={() => setDropdownOpen(false)}
            />
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1.5 z-30">
              <div className="px-3 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Select Store Branch
              </div>
              {branches.map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    setSelectedBranch(b);
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                >
                  <span className={selectedBranch === b ? 'font-semibold text-[#0D6D4E]' : ''}>
                    {b}
                  </span>
                  {selectedBranch === b && <Check className="w-4 h-4 text-[#0D6D4E]" />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-semibold select-none border border-gray-300">
          OH
        </div>
        <div className="text-right flex flex-col justify-center">
          <div className="text-sm font-medium text-gray-900 leading-tight">
            Omar Haddad
          </div>
          <div className="text-xs text-gray-500 leading-tight">
            Catalogue Manager
          </div>
        </div>
      </div>
    </header>
  );
};
