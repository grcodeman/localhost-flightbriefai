"use client";

import Link from "next/link";
import FlightBriefLogo from "@/components/FlightBriefLogo";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

// Report data - will be fetched from database
const sampleReports: any[] = [];

export default function ReportWithId() {
  const params = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const reportId = parseInt(params?.id as string);
  
  const [report, setReport] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Find the report by ID
    const foundReport = sampleReports.find(r => r.id === reportId);
    if (foundReport) {
      setReport(foundReport);
    }
  }, [reportId, user, router]);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.share-menu-container')) {
          setShareMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [shareMenuOpen]);

  const handleDownloadPDF = async () => {
    if (!report) return;
    
    setIsDownloading(true);
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      
      // Add title
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(report.name, margin, 30);
      
      // Add metadata
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Report ID: ${report.id}`, margin, 45);
      pdf.text(`Generated: ${report.date}`, margin, 55);
      pdf.text(`Type: ${report.type}`, margin, 65);
      
      // Add content
      pdf.setFontSize(9);
      const lines = pdf.splitTextToSize(report.content, maxWidth);
      let yPosition = 80;
      
      for (let i = 0; i < lines.length; i++) {
        if (yPosition > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(lines[i], margin, yPosition);
        yPosition += 5;
      }
      
      // Save the PDF
      pdf.save(`${report.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareReport = () => {
    setShareMenuOpen(!shareMenuOpen);
  };

  const copyReportLink = async () => {
    const currentUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('Report link copied to clipboard!');
      setShareMenuOpen(false);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Error copying link. Please try again.');
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Aviation Report: ${report?.name}`);
    const body = encodeURIComponent(
      `Hi,\n\nI wanted to share this aviation report with you:\n\n${report?.name}\nGenerated: ${report?.date}\nType: ${report?.type}\n\nView the full report here: ${window.location.href}\n\nBest regards`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
    setShareMenuOpen(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-blue-900">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Report Available</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">No report data found. Please create a new report.</p>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        {/* Report Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {report.name}
            </h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {report.type}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
            <span>Report ID: {report.id}</span>
            <span>•</span>
            <span>Generated: {report.date}</span>
          </div>
        </div>

        {/* Report Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="prose dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed">
              {report.content}
            </pre>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            ← Back to Dashboard
          </Link>
          <div className="flex space-x-3 relative">
            <button 
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                'Download PDF'
              )}
            </button>
            <div className="relative share-menu-container">
              <button 
                onClick={handleShareReport}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Share Report
              </button>
              
              {/* Share Menu */}
              {shareMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  <div className="py-1">
                    <button
                      onClick={copyReportLink}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Copy Link
                    </button>
                    <button
                      onClick={shareViaEmail}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Share via Email
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
