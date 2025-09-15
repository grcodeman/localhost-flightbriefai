import Link from "next/link";
import FlightBriefLogo from "@/components/FlightBriefLogo";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        {/* Logo and Title */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <FlightBriefLogo 
              size="xl"
              className="text-blue-600 dark:text-blue-400 w-24 h-24"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            FlightBrief AI
          </h1>
        </div>
        
        {/* Sign In Button */}
        <div>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
