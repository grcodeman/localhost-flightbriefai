"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import FlightBriefLogo from "@/components/FlightBriefLogo";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

// Reports data - will be fetched from database
const exampleReports: any[] = [];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const router = useRouter();


  // Filter reports based on search query
  const filteredReports = exampleReports.filter(report => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      report.name.toLowerCase().includes(query) ||
      report.type.toLowerCase().includes(query)
    );
  });

  // Function to highlight search terms
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </span>
      ) : part
    );
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-blue-900">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
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
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user?.displayName || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
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
              Welcome back, <span className="text-blue-600 dark:text-blue-400">{user?.displayName || "User"}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your aviation reports and analytics
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
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Recent Reports
              </h3>
              {searchQuery.trim() && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredReports.length} of {exampleReports.length} reports
                </span>
              )}
            </div>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredReports.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <FontAwesomeIcon icon={faSearch} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery.trim() ? `No reports found for "${searchQuery}"` : "No reports available"}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Create your first report to get started
                </p>
              </div>
            ) : (
              filteredReports.map((report) => (
                <Link key={report.id} href={`/report/${report.id}`}>
                  <div className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {highlightText(report.name, searchQuery)}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {highlightText(report.type, searchQuery)}
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
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
