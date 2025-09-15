'use client';

import { useState, useEffect } from 'react';
import { cookieService, ReportData } from '@/lib/cookieService';

export default function CookieTestPage() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [storageInfo, setStorageInfo] = useState({ count: 0, size: '0 KB' });
  const [importData, setImportData] = useState('');
  const [exportData, setExportData] = useState('');
  const [message, setMessage] = useState('');

  // Form states for manual report creation
  const [formData, setFormData] = useState({
    aircraftId: '',
    tailNumber: '',
    hexId: '',
    status: 'active',
    notes: ''
  });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const allReports = cookieService.getAllReports();
    setReports(allReports);
    setStorageInfo(cookieService.getStorageInfo());
  };

  const showMessage = (msg: string, isError = false) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleGenerateSample = () => {
    const sampleReport = cookieService.generateSampleReport();
    const success = cookieService.storeReport(sampleReport);
    if (success) {
      refreshData();
      showMessage('Sample report generated and stored successfully!');
    } else {
      showMessage('Failed to store sample report', true);
    }
  };

  const handleCreateManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.aircraftId || !formData.tailNumber) {
      showMessage('Aircraft ID and Tail Number are required', true);
      return;
    }

    const newReport: ReportData = {
      id: `manual_${Date.now()}`,
      aircraftId: formData.aircraftId,
      tailNumber: formData.tailNumber,
      hexId: formData.hexId || Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0'),
      reportData: {
        notes: formData.notes,
        createdManually: true
      },
      status: formData.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'test_user',
      metadata: {
        source: 'manual_entry',
        version: '1.0'
      }
    };

    const success = cookieService.storeReport(newReport);
    if (success) {
      refreshData();
      setFormData({ aircraftId: '', tailNumber: '', hexId: '', status: 'active', notes: '' });
      showMessage('Manual report created successfully!');
    } else {
      showMessage('Failed to create manual report', true);
    }
  };

  const handleDeleteReport = (id: string) => {
    const success = cookieService.deleteReport(id);
    if (success) {
      refreshData();
      setSelectedReport(null);
      showMessage('Report deleted successfully!');
    } else {
      showMessage('Failed to delete report', true);
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all reports?')) {
      const success = cookieService.clearAllReports();
      if (success) {
        refreshData();
        setSelectedReport(null);
        showMessage('All reports cleared successfully!');
      } else {
        showMessage('Failed to clear reports', true);
      }
    }
  };

  const handleExport = () => {
    const data = cookieService.exportReports();
    setExportData(data);
    showMessage('Reports exported to text area below');
  };

  const handleImport = () => {
    if (!importData.trim()) {
      showMessage('Please enter JSON data to import', true);
      return;
    }

    const success = cookieService.importReports(importData);
    if (success) {
      refreshData();
      setImportData('');
      showMessage('Reports imported successfully!');
    } else {
      showMessage('Failed to import reports - invalid JSON format', true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cookie Storage Testing</h1>
          <p className="text-gray-600 mb-4">
            This is a testing interface for local storage operations. Not visible in production UI.
          </p>
          
          {message && (
            <div className={`p-3 rounded-md mb-4 ${message.includes('Failed') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Total Reports</h3>
              <p className="text-2xl font-bold text-blue-700">{storageInfo.count}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">Storage Size</h3>
              <p className="text-2xl font-bold text-green-700">{storageInfo.size}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900">Storage Type</h3>
              <p className="text-lg font-bold text-purple-700">LocalStorage</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={handleGenerateSample}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Generate Sample Report
                </button>
                <button
                  onClick={refreshData}
                  className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Refresh Data
                </button>
                <button
                  onClick={handleClearAll}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Clear All Reports
                </button>
              </div>
            </div>

            {/* Manual Report Creation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Create Manual Report</h2>
              <form onSubmit={handleCreateManual} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aircraft ID *</label>
                  <input
                    type="text"
                    value={formData.aircraftId}
                    onChange={(e) => setFormData({...formData, aircraftId: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="AC1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tail Number *</label>
                  <input
                    type="text"
                    value={formData.tailNumber}
                    onChange={(e) => setFormData({...formData, tailNumber: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="N1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hex ID</label>
                  <input
                    type="text"
                    value={formData.hexId}
                    onChange={(e) => setFormData({...formData, hexId: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Auto-generated if empty"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="grounded">Grounded</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Additional notes..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Create Report
                </button>
              </form>
            </div>

            {/* Import/Export */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Import/Export</h2>
              <div className="space-y-4">
                <div>
                  <button
                    onClick={handleExport}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Export All Reports
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Import JSON Data</label>
                  <textarea
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Paste JSON data here..."
                  />
                  <button
                    onClick={handleImport}
                    className="mt-2 w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                  >
                    Import Reports
                  </button>
                </div>
                {exportData && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Exported Data</label>
                    <textarea
                      value={exportData}
                      readOnly
                      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                      rows={6}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Data Display */}
          <div className="space-y-6">
            {/* Reports List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Stored Reports ({reports.length})</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {reports.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No reports stored</p>
                ) : (
                  reports.map((report) => (
                    <div
                      key={report.id}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedReport?.id === report.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedReport(report)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{report.tailNumber}</p>
                          <p className="text-sm text-gray-600">{report.aircraftId}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(report.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            report.status === 'active' ? 'bg-green-100 text-green-800' :
                            report.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                            report.status === 'grounded' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {report.status}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteReport(report.id);
                            }}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Selected Report Details */}
            {selectedReport && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Details</h2>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">ID</label>
                      <p className="text-sm text-gray-900 font-mono">{selectedReport.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Aircraft ID</label>
                      <p className="text-sm text-gray-900">{selectedReport.aircraftId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Tail Number</label>
                      <p className="text-sm text-gray-900">{selectedReport.tailNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Hex ID</label>
                      <p className="text-sm text-gray-900 font-mono">{selectedReport.hexId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <p className="text-sm text-gray-900">{selectedReport.status}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">User ID</label>
                      <p className="text-sm text-gray-900">{selectedReport.userId || 'N/A'}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Report Data</label>
                    <pre className="text-xs text-gray-900 bg-gray-50 p-3 rounded-md overflow-auto">
                      {JSON.stringify(selectedReport.reportData, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Metadata</label>
                    <pre className="text-xs text-gray-900 bg-gray-50 p-3 rounded-md overflow-auto">
                      {JSON.stringify(selectedReport.metadata, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <a
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
