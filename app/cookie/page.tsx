'use client';

import { useState, useEffect } from 'react';
import { cookieService, CookieReport } from '@/lib/cookieService';

export default function CookieTestPage() {
  const [cookieReports, setCookieReports] = useState<CookieReport[]>([]);

  useEffect(() => {
    loadCookieReports();
    // Add demo data if no reports exist
    const existingReports = cookieService.getCookieReports();
    if (existingReports.length === 0) {
      addDemoData();
    }
  }, []);

  const loadCookieReports = () => {
    const reports = cookieService.getCookieReports();
    setCookieReports(reports);
  };

  const addDemoData = () => {
    const demoReport = {
      report_id: 'demo_001',
      name: 'Sample Flight Report - N123AB',
      timestamp: new Date().toISOString(),
      paragraph: 'This is a demo flight report for aircraft N123AB. The aircraft completed a routine maintenance check and is cleared for normal operations. All systems are functioning within normal parameters. Next inspection due in 30 days.'
    };
    
    cookieService.createCookie(demoReport.report_id, demoReport.name, demoReport.paragraph);
    loadCookieReports();
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cookie Storage Testing</h1>
          <p className="text-gray-600 mb-4">
            Testing interface for cached reports. Shows report_id, name, timestamp and paragraph.
          </p>
        </div>

        {/* Cached Reports List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Cached Reports ({cookieReports.length})</h2>
          
          {cookieReports.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">No cached reports found</p>
              <p className="text-sm text-gray-400">Demo data will be added automatically on first load</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cookieReports.map((report) => (
                <div key={report.report_id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Report ID:</label>
                      <p className="text-sm text-gray-900 font-mono">{report.report_id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Timestamp:</label>
                      <p className="text-sm text-gray-900">
                        {new Date(report.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="text-sm font-medium text-gray-700">Name:</label>
                    <p className="text-sm text-gray-900 font-medium">{report.name}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Paragraph:</label>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{report.paragraph}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
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
