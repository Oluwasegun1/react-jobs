import React, { useState, useCallback } from "react";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { SearchFilters as SearchFiltersType } from "../types";

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFiltersType) => void;
  className?: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onFiltersChange,
  className = "",
}) => {
  const [filters, setFilters] = useState<SearchFiltersType>({
    search: "",
    type: "",
    location: "",
    salary: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = useCallback(
    (key: keyof SearchFiltersType, value: string) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
      onFiltersChange(newFilters);
    },
    [filters, onFiltersChange]
  );

  const clearFilters = useCallback(() => {
    const clearedFilters = {
      search: "",
      type: "",
      location: "",
      salary: "",
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  }, [onFiltersChange]);

  const hasActiveFilters =
    filters.search || filters.type || filters.location || filters.salary;

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {/* Search Bar */}
      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search jobs by title, company, or keywords..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <FaFilter />
          Filters
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
          >
            <FaTimes />
            Clear all
          </button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
          {/* Job Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter location..."
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Salary Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Range
            </label>
            <select
              value={filters.salary}
              onChange={(e) => handleFilterChange("salary", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Salaries</option>
              <option value="Under $50K">Under $50K</option>
              <option value="$50K - 60K">$50K - $60K</option>
              <option value="$60K - 70K">$60K - $70K</option>
              <option value="$70K - 80K">$70K - $80K</option>
              <option value="$80K - 90K">$80K - $90K</option>
              <option value="$90K - 100K">$90K - $100K</option>
              <option value="$100K - 125K">$100K - $125K</option>
              <option value="$125K - 150K">$125K - $150K</option>
              <option value="$150K - 175K">$150K - $175K</option>
              <option value="$175K - 200K">$175K - $200K</option>
              <option value="Over $200K">Over $200K</option>
            </select>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
          {filters.search && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800">
              Search: {filters.search}
              <button
                onClick={() => handleFilterChange("search", "")}
                className="ml-2 text-indigo-600 hover:text-indigo-800"
              >
                <FaTimes size={12} />
              </button>
            </span>
          )}
          {filters.type && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              Type: {filters.type}
              <button
                onClick={() => handleFilterChange("type", "")}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                <FaTimes size={12} />
              </button>
            </span>
          )}
          {filters.location && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              Location: {filters.location}
              <button
                onClick={() => handleFilterChange("location", "")}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <FaTimes size={12} />
              </button>
            </span>
          )}
          {filters.salary && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
              Salary: {filters.salary}
              <button
                onClick={() => handleFilterChange("salary", "")}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                <FaTimes size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
