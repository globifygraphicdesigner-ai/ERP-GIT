import React, { useState } from 'react';
import { Save, Store, Bell, Shield, Key } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { selectedBranch, showToast } = useApp();
  const [currency, setCurrency] = useState('QAR (Qatari Riyal)');
  const [tolerance, setTolerance] = useState('0.00');
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Settings saved successfully!');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Store & System Settings
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Configure parameters for {selectedBranch}, currency rules and mismatch tolerances.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Store Profile */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Store className="w-4 h-4 text-[#0D6D4E]" />
            <h2 className="text-sm font-bold text-gray-900">Store Profile</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-gray-900 mb-1">
                Store Name
              </label>
              <input
                type="text"
                defaultValue="Doha Fresh Markets"
                className="w-full border border-gray-200 rounded-lg p-2 bg-gray-50 font-medium"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-1">
                Branch Location
              </label>
              <input
                type="text"
                defaultValue="Al Waab Branch, Qatar"
                className="w-full border border-gray-200 rounded-lg p-2 bg-gray-50 font-medium"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-1">
                Base Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 bg-white"
              >
                <option>QAR (Qatari Riyal)</option>
                <option>SAR (Saudi Riyal)</option>
                <option>AED (UAE Dirham)</option>
                <option>KWD (Kuwaiti Dinar)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-1">
                Price Discrepancy Tolerance (QAR)
              </label>
              <input
                type="text"
                value={tolerance}
                onChange={(e) => setTolerance(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 bg-white font-mono"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">
                Differences smaller than this tolerance are considered in sync.
              </span>
            </div>
          </div>
        </div>

        {/* Notifications & Automation */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Bell className="w-4 h-4 text-[#0D6D4E]" />
            <h2 className="text-sm font-bold text-gray-900">Notifications & Automation</h2>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded accent-[#0D6D4E]"
              />
              <div>
                <div className="font-semibold text-gray-900">
                  Email discrepancy digests daily at 09:00
                </div>
                <div className="text-[11px] text-gray-500">
                  Notify catalogue managers when stock or price discrepancies exceed 20 items.
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded accent-[#0D6D4E]"
              />
              <div>
                <div className="font-semibold text-gray-900">
                  Auto-alert when marketplace data is older than 12 hours
                </div>
                <div className="text-[11px] text-gray-500">
                  Show dashboard warnings if latest marketplace updates are stale.
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#0D6D4E] hover:bg-[#0b5c42] rounded-lg shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
