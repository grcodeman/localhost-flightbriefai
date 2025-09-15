// Cookie service for storing and retrieving report data in local storage
// This is for testing purposes only

export interface ReportData {
  id: string;
  aircraftId: string;
  tailNumber: string;
  hexId: string;
  reportData: any;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  metadata?: any;
}

export interface CookieReport {
  report_id: string;
  name: string;
  timestamp: string;
  paragraph: string;
}

class CookieService {
  private readonly REPORT_KEY = 'aviation_reports';
  private readonly COOKIE_REPORTS_KEY = 'cookie_reports';
  private readonly MAX_COOKIE_SIZE = 4096; // 4KB limit for cookies
  
  // Store report data in localStorage (cookies have size limitations)
  storeReport(report: ReportData): boolean {
    try {
      const existingReports = this.getAllReports();
      const updatedReports = [...existingReports.filter(r => r.id !== report.id), report];
      
      localStorage.setItem(this.REPORT_KEY, JSON.stringify(updatedReports));
      return true;
    } catch (error) {
      console.error('Failed to store report:', error);
      return false;
    }
  }

  // Retrieve all reports from localStorage
  getAllReports(): ReportData[] {
    try {
      const stored = localStorage.getItem(this.REPORT_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to retrieve reports:', error);
      return [];
    }
  }

  // Retrieve a specific report by ID
  getReport(id: string): ReportData | null {
    try {
      const reports = this.getAllReports();
      return reports.find(report => report.id === id) || null;
    } catch (error) {
      console.error('Failed to retrieve report:', error);
      return null;
    }
  }

  // Delete a report by ID
  deleteReport(id: string): boolean {
    try {
      const reports = this.getAllReports();
      const filteredReports = reports.filter(report => report.id !== id);
      localStorage.setItem(this.REPORT_KEY, JSON.stringify(filteredReports));
      return true;
    } catch (error) {
      console.error('Failed to delete report:', error);
      return false;
    }
  }

  // Clear all reports
  clearAllReports(): boolean {
    try {
      localStorage.removeItem(this.REPORT_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear reports:', error);
      return false;
    }
  }

  // Get storage info
  getStorageInfo(): { count: number; size: string } {
    try {
      const reports = this.getAllReports();
      const dataString = JSON.stringify(reports);
      return {
        count: reports.length,
        size: `${(dataString.length / 1024).toFixed(2)} KB`
      };
    } catch (error) {
      return { count: 0, size: '0 KB' };
    }
  }

  // Export reports as JSON
  exportReports(): string {
    try {
      const reports = this.getAllReports();
      return JSON.stringify(reports, null, 2);
    } catch (error) {
      console.error('Failed to export reports:', error);
      return '[]';
    }
  }

  // Import reports from JSON
  importReports(jsonData: string): boolean {
    try {
      const reports = JSON.parse(jsonData);
      if (Array.isArray(reports)) {
        localStorage.setItem(this.REPORT_KEY, JSON.stringify(reports));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import reports:', error);
      return false;
    }
  }

  // Create a cookie report (for saving from report page)
  createCookie(report_id: string, name: string, paragraph: string): boolean {
    try {
      const cookieReport: CookieReport = {
        report_id,
        name,
        timestamp: new Date().toISOString(),
        paragraph
      };

      const existingCookieReports = this.getCookieReports();
      const updatedCookieReports = [...existingCookieReports.filter(r => r.report_id !== report_id), cookieReport];
      
      localStorage.setItem(this.COOKIE_REPORTS_KEY, JSON.stringify(updatedCookieReports));
      return true;
    } catch (error) {
      console.error('Failed to create cookie report:', error);
      return false;
    }
  }

  // Get all cookie reports
  getCookieReports(): CookieReport[] {
    try {
      const stored = localStorage.getItem(this.COOKIE_REPORTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to retrieve cookie reports:', error);
      return [];
    }
  }

  // Get a specific cookie report by ID
  getCookieReport(report_id: string): CookieReport | null {
    try {
      const reports = this.getCookieReports();
      return reports.find(report => report.report_id === report_id) || null;
    } catch (error) {
      console.error('Failed to retrieve cookie report:', error);
      return null;
    }
  }

  // Delete a cookie report by ID
  deleteCookieReport(report_id: string): boolean {
    try {
      const reports = this.getCookieReports();
      const filteredReports = reports.filter(report => report.report_id !== report_id);
      localStorage.setItem(this.COOKIE_REPORTS_KEY, JSON.stringify(filteredReports));
      return true;
    } catch (error) {
      console.error('Failed to delete cookie report:', error);
      return false;
    }
  }

  // Clear all cookie reports
  clearAllCookieReports(): boolean {
    try {
      localStorage.removeItem(this.COOKIE_REPORTS_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear cookie reports:', error);
      return false;
    }
  }

  // Get cookie reports info
  getCookieReportsInfo(): { count: number; size: string } {
    try {
      const reports = this.getCookieReports();
      const dataString = JSON.stringify(reports);
      return {
        count: reports.length,
        size: `${(dataString.length / 1024).toFixed(2)} KB`
      };
    } catch (error) {
      return { count: 0, size: '0 KB' };
    }
  }

  // Generate sample report data for testing
  generateSampleReport(): ReportData {
    const id = `test_${Date.now()}`;
    const aircraftTypes = ['B737', 'A320', 'B777', 'A350', 'B787'];
    const statuses = ['active', 'maintenance', 'grounded', 'scheduled'];
    
    return {
      id,
      aircraftId: `AC${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      tailNumber: `N${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      hexId: Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0'),
      reportData: {
        aircraftType: aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)],
        flightHours: Math.floor(Math.random() * 10000),
        lastInspection: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        notes: `Sample report generated for testing - ${new Date().toLocaleString()}`
      },
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'test_user',
      metadata: {
        source: 'cookie_testing',
        version: '1.0'
      }
    };
  }
}

export const cookieService = new CookieService();
