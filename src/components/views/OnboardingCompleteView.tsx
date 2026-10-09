import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  AlertTriangle,
  MoreHorizontal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TeamMember } from '../../types';

export const OnboardingCompleteView: React.FC = () => {
  const { teamMembers, inviteTeamMember, navigate, showToast } = useApp();
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<TeamMember['role']>('Catalogue Manager');

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    inviteTeamMember(inviteEmail, inviteRole);
    setInviteEmail('');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-16">
      {/* Top Navbar */}
      <div className="bg-white border-b border-gray-200 px-8 py-3.5 flex items-center justify-between">
        <div
          onClick={() => navigate('dashboard')}
          className="text-2xl font-bold tracking-tight text-[#0D6D4E] cursor-pointer"
        >
          Shelf
        </div>
        <button
          onClick={() => navigate('dashboard')}
          className="text-xs font-medium text-gray-600 hover:text-gray-900 hover:underline"
        >
          Save and exit
        </button>
      </div>

      <div className="max-w-3xl mx-auto pt-8 px-4 space-y-6">
        {/* Horizontal Onboarding Stepper */}
        <div className="flex items-center justify-between text-xs px-4">
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[#0D6D4E] text-white flex items-center justify-center">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="text-[11px] text-gray-600">Business</span>
          </div>
          <div className="h-0.5 flex-1 bg-gray-200 mx-2" />

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[#0D6D4E] text-white flex items-center justify-center">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="text-[11px] text-gray-600">Marketplaces</span>
          </div>
          <div className="h-0.5 flex-1 bg-gray-200 mx-2" />

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[#0D6D4E] text-white flex items-center justify-center">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="text-[11px] text-gray-600">ERP catalogue</span>
          </div>
          <div className="h-0.5 flex-1 bg-gray-200 mx-2" />

          {/* Step 4 */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[#0D6D4E] text-white flex items-center justify-center">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="text-[11px] text-gray-600">Catalogue loaded</span>
          </div>
          <div className="h-0.5 flex-1 bg-gray-200 mx-2" />

          {/* Step 5 */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[#0D6D4E] text-white flex items-center justify-center">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="text-[11px] text-gray-600">Marketplace files</span>
          </div>
          <div className="h-0.5 flex-1 bg-gray-200 mx-2" />

          {/* Step 6 */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[#0D6D4E] text-white flex items-center justify-center">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="text-[11px] text-gray-600">Output templates</span>
          </div>
          <div className="h-0.5 flex-1 bg-gray-200 mx-2" />

          {/* Step 7: Done */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[#0D6D4E] text-white flex items-center justify-center text-xs font-bold">
              7
            </div>
            <span className="text-[11px] font-bold text-[#0D6D4E]">Done</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xs space-y-8">
          {/* Header with large check icon */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#DEF7EC] text-[#0D6D4E] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Doha Fresh Markets is ready
              </h1>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Your account is set up and your catalogue is loaded. You can now start
                checking stock and price mismatches and generate files for each
                marketplace.
              </p>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-3 pt-2">
            {/* Item 1 */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#DEF7EC] text-[#0D6D4E] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-900">
                    Business details
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Doha Fresh Markets, Al Waab Branch, Qatar (Asia/Qatar)
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full">
                Done
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#DEF7EC] text-[#0D6D4E] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-900">
                    Marketplaces
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Talabat, Snoonu, Rafeeq
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full">
                Done
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#DEF7EC] text-[#0D6D4E] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-900">
                    ERP catalogue
                  </div>
                  <div className="text-[11px] text-gray-500">
                    12,792 products from RetailOne
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full">
                Done
              </span>
            </div>

            {/* Item 4: Warning */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-amber-100 bg-amber-50/20">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-900">
                    Marketplace files mapped
                  </div>
                  <div className="text-[11px] text-gray-500">
                    2 of 3 marketplaces mapped
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  2 of 3
                </span>
                <button
                  onClick={() => navigate('category-mapping')}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Map Rafeeq
                </button>
              </div>
            </div>

            {/* Item 5: Output templates Warning */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-amber-100 bg-amber-50/20">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-900">
                    Output templates
                  </div>
                  <div className="text-[11px] text-gray-500">
                    5 of 9 templates configured
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  5 of 9
                </span>
                <button
                  onClick={() => navigate('templates')}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Finish later
                </button>
              </div>
            </div>
          </div>

          {/* Section: Invite your team */}
          <div className="space-y-4 pt-4 border-t border-gray-100 text-xs">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Invite your team</h2>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Add your team members so they can start using Shelf. You can always invite
                more people later.
              </p>
            </div>

            <form onSubmit={handleSendInvite} className="flex gap-2">
              <input
                type="email"
                placeholder="name@yourcompany.qa"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#0D6D4E]"
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as any)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-xs bg-white text-gray-700"
              >
                <option>Catalogue Manager</option>
                <option>Store Admin</option>
                <option>Viewer</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 font-semibold text-white bg-[#0D6D4E] hover:bg-[#0b5c42] rounded-lg shadow-xs transition-colors shrink-0"
              >
                Send invite
              </button>
            </form>

            <p className="text-[10px] text-gray-400">
              Catalogue Manager can upload files, fix mismatches, list new products and set
              markups.
            </p>

            {/* Team Table */}
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                  <tr>
                    <th className="py-2 px-3">Email</th>
                    <th className="py-2 px-3">Role</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 w-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {teamMembers.map((m) => (
                    <tr key={m.id}>
                      <td className="py-2.5 px-3 font-medium text-gray-900">
                        {m.email}
                      </td>
                      <td className="py-2.5 px-3 text-gray-700">{m.role}</td>
                      <td className="py-2.5 px-3">
                        <span className="flex items-center gap-1.5 text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                          <span>Invited {m.invitedAt}</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => showToast(`Options for ${m.email}`)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: Your daily routine */}
          <div className="space-y-4 pt-4 border-t border-gray-100 text-xs">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Your daily routine</h2>
              <p className="text-[11px] text-gray-500 mt-0.5">
                A simple 3-step routine to keep your listings in sync.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#DEF7EC] text-[#0D6D4E] font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Upload today's ERP file
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Bring in the latest stock and prices from RetailOne.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#DEF7EC] text-[#0D6D4E] font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Upload marketplace files
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Upload the latest files from Talabat, Snoonu, Rafeeq and Keeta.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#DEF7EC] text-[#0D6D4E] font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Download corrected files
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Review mismatches and download ready-to-upload files for each
                    marketplace.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <button
              onClick={() => navigate('dashboard')}
              className="px-5 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-xs"
            >
              Back
            </button>
            <button
              onClick={() => navigate('dashboard')}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#0D6D4E] hover:bg-[#0b5c42] rounded-lg shadow-xs transition-colors"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
