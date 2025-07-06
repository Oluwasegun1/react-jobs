import React, { useState, useCallback } from "react";
import JobsListing from "../components/JobsListing";
import SearchFilters from "../components/SearchFilters";
import { SearchFilters as SearchFiltersType } from "../types";

const JobsPage: React.FC = () => {
  const [filters, setFilters] = useState<SearchFiltersType>({
    search: "",
    type: "",
    location: "",
    salary: "",
  });

  const handleFiltersChange = useCallback((newFilters: SearchFiltersType) => {
    setFilters(newFilters);
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600 text-center text-lg">
            Browse through our curated list of React development opportunities
          </p>
        </div>

        <SearchFilters onFiltersChange={handleFiltersChange} className="mb-8" />

        <JobsListing filters={filters} />
      </div>
    </section>
  );
};

export default JobsPage;
