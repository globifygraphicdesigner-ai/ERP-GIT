import React from 'react';
import { FileSpreadsheet, Plus, Download, Edit3, MoreHorizontal } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MarketplaceBadge } from '../common/MarketplaceBadge';

export const TemplatesView: React.FC = () => {
  const { showToast } = useApp();

  const templates = [
    {
      id: 'tmpl-1',
      name: 'Talabat Price & Stock Update',
      marketplace: 'talabat' as const,
      format: 'Excel (.xlsx)',
      columns: 14,
      lastModified: '06 Oct 2026',
      status: 'Configured',
    },
    {
      id: 'tmpl-2',
      name: 'Snoonu Catalogue Sync Format',
      marketplace: 'snoonu' as const,
      format: 'Excel (.xlsx)',
      columns: 18,
      lastModified: '05 Oct 2026',
      status: 'Configured',
    },
    {
      id: 'tmpl-3',
      name: 'Rafeeq Price Master Template',
      marketplace: 'rafeeq' as const,
      format: 'Excel (.xlsx)',
      columns: 12,
      lastModified: '04 Oct 2026',
      status: 'Configured',
    },
    {
      id: 'tmpl-4',
      name: 'Rafeeq New Product Template',
      marketplace: 'rafeeq' as const,
      format: 'Excel (.xlsx)',
      columns: 22,
      lastModified: 'Pending setup',
      status: 'Missing',
    },
    {
      id: 'tmpl-5',
      name: 'Keeta Fast Stock Push Format',
      marketplace: 'keeta' as const,
      format: 'CSV (.csv)',
      columns: 8,
      lastModified: '01 Oct 2026',
      status: 'Configured',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Output Templates
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage file export formatting templates for Talabat, Snoonu, Rafeeq, and Keeta seller portals.
          </p>
        </div>

        <button
          onClick={() => showToast('Create new output template modal')}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0D6D4E] hover:bg-[#0b5c42] rounded-lg shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New template</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
              <tr>
                <th className="py-2.5 px-4">Template name</th>
                <th className="py-2.5 px-4">Marketplace</th>
                <th className="py-2.5 px-4">File format</th>
                <th className="py-2.5 px-4 text-center">Columns</th>
                <th className="py-2.5 px-4">Last modified</th>
                <th className="py-2.5 px-4 text-center">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {templates.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-[#0D6D4E]" />
                      <span>{t.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <MarketplaceBadge marketplace={t.marketplace} />
                  </td>
                  <td className="py-3 px-4 text-gray-600">{t.format}</td>
                  <td className="py-3 px-4 text-center font-mono text-gray-700">
                    {t.columns}
                  </td>
                  <td className="py-3 px-4 text-gray-500">{t.lastModified}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        t.status === 'Configured'
                          ? 'bg-[#DEF7EC] text-[#03543F]'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => showToast(`Downloaded template ${t.name}`)}
                        className="p-1 text-gray-400 hover:text-gray-700 rounded"
                        title="Download sample"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => showToast(`Edit template ${t.name}`)}
                        className="p-1 text-gray-400 hover:text-gray-700 rounded"
                        title="Configure"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-700 rounded">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
