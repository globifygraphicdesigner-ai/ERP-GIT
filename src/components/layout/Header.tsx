import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, RotateCcw, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useDemo } from '../../demo';

export const Header: React.FC = () => {
  const { showToast, navigate } = useApp();
  const { state, resetDemo, startNewCustomer } = useDemo();
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setDemoMenuOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const initials = state.currentUser.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-3 flex items-center justify-between sticky top-0 z-10">
      {/* Tenant name */}
      <div className="text-sm font-semibold text-gray-900">
        {state.tenant.name}
      </div>

      {/* Right side: Demo menu + User */}
      <div className="flex items-center gap-4">
        {/* Demo menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setDemoMenuOpen(!demoMenuOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Demo
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
          {demoMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-1.5 z-30">
              <button
                onClick={() => {
                  startNewCustomer();
                  setDemoMenuOpen(false);
                  navigate('onboarding');
                  showToast('Started new customer onboarding', 'info');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-gray-700 hover:bg-gray-50 border-b border-gray-100"
              >
                <Compass className="w-3.5 h-3.5 text-gray-500" />
                Start as new customer
              </button>
              <button
                onClick={() => {
                  resetDemo();
                  setDemoMenuOpen(false);
                  navigate('dashboard');
                  showToast('Reset to day-30 demo data', 'info');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-gray-700 hover:bg-gray-50"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                Reset to day-30 demo
              </button>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-semibold select-none border border-gray-300">
            {initials}
          </div>
          <div className="text-right flex flex-col justify-center">
            <div className="text-sm font-medium text-gray-900 leading-tight">
              {state.currentUser.name}
            </div>
            <div className="text-xs text-gray-500 leading-tight">
              {state.currentUser.role}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
