import Link from "next/link";
import FlightBriefLogo from "@/components/FlightBriefLogo";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FlightBriefLogo 
              size="lg"
              className="text-blue-400 w-8 h-8"
            />
            <span className="text-white text-xl font-bold">FlightBrief AI</span>
          </div>
          <Link
            href="/login"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              AI-Powered Flight Intelligence
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Generate Sales Flight
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Log Reports</span>
              <br />in 1 Minute
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Transform hours of manual flight data research into instant, comprehensive sales briefings. 
              <span className="text-blue-400 font-semibold">Enter an aircraft ID, get intelligence instantly.</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
              <Link
                href="/login"
                className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Start Free Trial
              </Link>
              <Link
                href="/demo"
                className="w-full sm:w-auto px-7 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-all duration-200 border border-white/20 backdrop-blur-sm"
              >
                Watch Demo
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Real-time data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Enterprise security</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>99.9% uptime</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Three simple steps to transform your aviation sales process
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <div className="absolute -right-6 top-1/2 hidden lg:block w-12 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Enter Aircraft ID</h3>
              <p className="text-slate-300 leading-relaxed">
                Simply input the ICAO24 hex code or tail number of any aircraft you're tracking for a potential sale.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div className="absolute -right-6 top-1/2 hidden lg:block w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Analyzes Data</h3>
              <p className="text-slate-300 leading-relaxed">
                Our AI instantly gathers flight history, patterns, routes, and operational insights from multiple data sources.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Get Sales Brief</h3>
              <p className="text-slate-300 leading-relaxed">
                Receive a comprehensive, AI-generated sales briefing with key insights, usage patterns, and opportunity analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
                Why Sales Teams Love
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> FlightBrief AI</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 text-lg">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">60x Faster Research</h3>
                    <p className="text-slate-300">Turn hours of manual research into minutes of automated intelligence gathering.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-400 text-lg">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Precise Insights</h3>
                    <p className="text-slate-300">Get detailed flight patterns, utilization rates, and operational insights that matter to buyers.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-400 text-lg">📈</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Higher Close Rates</h3>
                    <p className="text-slate-300">Enter every conversation with data-backed insights that demonstrate aircraft value and opportunity.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-700">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1 bg-slate-700 h-8 rounded-md flex items-center px-3">
                    <span className="text-slate-300 text-sm">FlightBrief AI Dashboard</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400 font-medium">Aircraft: N123AB</span>
                      <span className="text-emerald-400 text-sm">Active</span>
                    </div>
                    <div className="text-slate-300 text-sm">
                      <p>• 145 flights in last 30 days</p>
                      <p>• Primary routes: LAX ↔ SFO, LAX ↔ LAS</p>
                      <p>• Avg utilization: 82 hours/month</p>
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-slate-300 text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span>Generating sales briefing...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Sales Process?
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Join hundreds of aviation sales professionals who are closing deals faster with AI-powered flight intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-12 py-4 bg-white text-blue-600 text-lg font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="px-12 py-4 bg-white/10 text-white text-lg font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20"
            >
              Contact Sales
            </Link>
          </div>
          <p className="text-blue-100 mt-6 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <FlightBriefLogo 
              size="sm"
              className="text-blue-400 w-6 h-6"
            />
            <span className="text-white font-medium">FlightBrief AI</span>
          </div>
          <div className="text-slate-400 text-sm">
            © 2024 FlightBrief AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
