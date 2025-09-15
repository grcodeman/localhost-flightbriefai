"use client";

import Link from "next/link";
import FlightBriefLogo from "@/components/FlightBriefLogo";
import { useState } from "react";

export default function Report() {
  const [aircraftId, setAircraftId] = useState("");
  const [reportData, setReportData] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    const hexId = aircraftId.trim();
    if (!hexId) return;
    
    setIsProcessing(true);
    setReportData("Fetching flight data...");
    
    try {
      // Call the OpenSky API
      const response = await fetch(`/api/flights/${hexId}?days=14&format=summary`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Display the JSON response in a formatted way
      setReportData(JSON.stringify(data, null, 2));
      
    } catch (error) {
      console.error('Error fetching flight data:', error);
      setReportData(`Error: ${error instanceof Error ? error.message : 'Failed to fetch flight data'}\n\nPlease check that the ICAO24 hex code is valid (6 characters, e.g., 'ab0356')`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FlightBriefLogo 
                size="md"
                className="text-blue-600 dark:text-blue-400"
              />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                FlightBrief AI
              </h1>
            </div>
            <Link
              href="/dashboard"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Flight Report
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Enter aircraft information to generate a comprehensive flight report
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="mb-4">
            <label htmlFor="aircraft-id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ICAO24 Hex Code
            </label>
            <div className="flex gap-3">
              <input
                id="aircraft-id"
                type="text"
                value={aircraftId}
                onChange={(e) => setAircraftId(e.target.value)}
                placeholder="e.g., ab0356 (6 hex characters)"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleProcess}
                disabled={!aircraftId.trim() || isProcessing}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:disabled:bg-gray-600 text-white font-medium rounded-md shadow-sm transition-colors duration-200 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Process"}
              </button>
            </div>
          </div>
        </div>

        {/* Report Output Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Report Output
          </h3>
          <textarea
            value={reportData}
            readOnly
            placeholder="Report data will appear here after processing..."
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
          />
        </div>
      </div>
    </div>
  );
}
