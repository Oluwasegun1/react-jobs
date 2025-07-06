import React from "react";
import { FaRocket, FaSearch, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

const Hero: React.FC<HeroProps> = ({
  title = "Find Your Dream React Job",
  subtitle = "Discover amazing opportunities with top companies worldwide",
}) => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 py-20 mb-4 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <FaRocket className="mx-auto h-16 w-16 text-white mb-6 animate-bounce" />
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              {title}
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <FaSearch />
              Browse Jobs
            </Link>
            <Link
              to="/add-job"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-200 transform hover:scale-105"
            >
              <FaUsers />
              Post a Job
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-indigo-200">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100+</div>
              <div className="text-indigo-200">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-indigo-200">Developers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
