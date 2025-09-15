"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

// Example reports data
const exampleReports = [
  {
    id: 1,
    name: "Q3 Flight Operations Summary",
    date: "2025-09-10",
    type: "Operations Report"
  },
  {
    id: 2,
    name: "Aircraft Maintenance Analysis",
    date: "2025-09-08",
    type: "Maintenance Report"
  },
  {
    id: 3,
    name: "Safety Incident Review - August",
    date: "2025-09-01",
    type: "Safety Report"
  },
  {
    id: 4,
    name: "Fleet Utilization Metrics",
    date: "2025-08-28",
    type: "Performance Report"
  },
  {
    id: 5,
    name: "Fuel Cost Analysis - Summer 2025",
    date: "2025-08-25",
    type: "Financial Report"
  },
  {
    id: 6,
    name: "Pilot Training Progress Update",
    date: "2025-08-20",
    type: "Training Report"
  }
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-blue-900">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon 
                icon={faPlane} 
                className="text-2xl text-blue-600 dark:text-blue-400 transform rotate-45"
              />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                FlightBrief AI
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Welcome and Controls Section */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Welcome Message */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, <span className="text-blue-600 dark:text-blue-400">Cody</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Here are your recent flight reports and analytics
            </p>
          </div>

          {/* Search and Create Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="text-gray-400"
                />
              </div>
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Create Button */}
            <Link
              href="/report"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Create
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-64 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">

        {/* Reports List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Recent Reports
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {exampleReports.map((report) => (
              <div key={report.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {report.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {report.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {new Date(report.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
