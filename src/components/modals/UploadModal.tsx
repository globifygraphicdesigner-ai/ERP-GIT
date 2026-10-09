import React, { useState } from 'react';
import { X, Upload, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MarketplaceId } from '../../types';

export const UploadModal: React.FC = () => {
  const { isUploadModalOpen, closeUploadModal, uploadModalPreselectedSource, navigate, showToast } =
    useApp();

  const [source, setSource] = useState<MarketplaceId | 'erp'>(
    uploadModalPreselectedSource || 'talabat'
  );
  const [fileMode, setFileMode] = useState<'all' | 'partial'>('all');
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
  } | null>({
    name:
      uploadModalPreselectedSource === 'erp'
        ? 'Item_Master_06Oct2026.xlsx'
        : `${uploadModalPreselectedSource || 'talabat'}_items_06Oct.xlsx`,
    size: '1.4 MB',
  });

  if (!isUploadModalOpen) return null;

  const sources: { id: MarketplaceId | 'erp'; label: string }[] = [
    { id: 'erp', label: 'ERP (RetailOne)' },
    { id: 'talabat', label: 'Talabat' },
    { id: 'snoonu', label: 'Snoonu' },
    { id: 'rafeeq', label: 'Rafeeq' },
    { id: 'keeta', label: 'Keeta' },
  ];

  const handleSourceChange = (newSource: MarketplaceId | 'erp') => {
    setSource(newSource);
    setSelectedFile({
      name:
        newSource === 'erp'
          ? 'Item_Master_06Oct2026.xlsx'
          : `${newSource}_items_06Oct.xlsx`,
      size: '1.4 MB',
    });
  };

  const handleUploadSubmit = () => {
    closeUploadModal();
    showToast(`Uploading ${selectedFile?.name || 'file'}...`);
    // Navigate to review
    navigate('upload-review');
  };

  const sourceName = sources.find((s) => s.id === source)?.label || 'source';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dim backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-[1px] transition-opacity"
        onClick={closeUploadModal}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 text-gray-900 z-10 border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between pb-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Upload file</h2>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Select the source, choose the file and upload it. Shelf will recognise the
              layout if you've uploaded a file from this source before.
            </p>
          </div>
          <button
            onClick={closeUploadModal}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 pt-3">
          {/* Step 1: Source */}
          <div>
            <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              1. Source
            </label>
            <div className="grid grid-cols-5 gap-1.5 p-1 bg-gray-50 border border-gray-200 rounded-lg">
              {sources.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSourceChange(item.id)}
                  className={`py-2 px-1 text-xs font-medium rounded-md transition-all text-center truncate ${
                    source === item.id
                      ? 'bg-[#E8F5EE] text-[#0D6D4E] font-semibold border border-[#0D6D4E]/30 shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: File contains */}
          <div>
            <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              2. File contains
            </label>
            <div className="space-y-2">
              <label
                className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                  fileMode === 'all'
                    ? 'border-[#0D6D4E] bg-[#E8F5EE]/30'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="fileContent"
                  checked={fileMode === 'all'}
                  onChange={() => setFileMode('all')}
                  className="mt-0.5 accent-[#0D6D4E]"
                />
                <div>
                  <div className="text-xs font-semibold text-gray-900">
                    All products (full list)
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Products not in the file will be flagged as missing.
                  </div>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                  fileMode === 'partial'
                    ? 'border-[#0D6D4E] bg-[#E8F5EE]/30'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="fileContent"
                  checked={fileMode === 'partial'}
                  onChange={() => setFileMode('partial')}
                  className="mt-0.5 accent-[#0D6D4E]"
                />
                <div>
                  <div className="text-xs font-semibold text-gray-900">
                    Only some products (partial update)
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Only the products in this file will be updated.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Step 3: Choose file */}
          <div>
            <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              3. Choose file
            </label>

            {/* Dropzone */}
            <div
              onClick={() => {
                setSelectedFile({
                  name: `${source}_update_${Date.now().toString().slice(-4)}.xlsx`,
                  size: '1.4 MB',
                });
              }}
              className="border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-xl p-5 text-center cursor-pointer transition-colors bg-gray-50/50"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2 text-gray-500">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-700">
                Drag and drop your file here
              </p>
              <p className="text-[11px] text-[#0D6D4E] hover:underline mt-0.5 font-medium">
                or click to browse
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                .xlsx, .xls or .csv up to 25 MB
              </p>
            </div>

            {/* Selected file card */}
            {selectedFile && (
              <div className="mt-3 flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-emerald-600 rounded text-white flex items-center justify-center font-bold text-xs">
                    X
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-900">
                      {selectedFile.name}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {selectedFile.size}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Info note */}
          <div className="flex items-start gap-2 text-xs text-blue-700 bg-blue-50/70 p-2.5 rounded-lg border border-blue-100">
            <Info className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
            <span>
              Shelf will recognise the layout if you've uploaded a {sourceName} file before.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={closeUploadModal}
            className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUploadSubmit}
            disabled={!selectedFile}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#0D6D4E] rounded-lg hover:bg-[#0b5c42] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};
