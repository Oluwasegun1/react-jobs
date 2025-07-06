import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";
import Spinner from "./Spinner";
import JobListing from "./JobListing";
import { Job } from "../types";

interface JobsListingProps {
  isHome?: boolean;
  filters?: {
    search?: string;
    type?: string;
    location?: string;
    salary?: string;
  };
}

const JobsListing: React.FC<JobsListingProps> = ({
  isHome = false,
  filters,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        let apiUrl = isHome ? "/api/jobs?_limit=3" : "/api/jobs";

        // Add filters to URL if provided
        if (filters && !isHome) {
          const params = new URLSearchParams();
          if (filters.search) params.append("q", filters.search);
          if (filters.type) params.append("type", filters.type);
          if (filters.location) params.append("location", filters.location);
          if (filters.salary) params.append("salary", filters.salary);

          if (params.toString()) {
            apiUrl += `?${params.toString()}`;
          }
        }

        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await res.json();
        setJobs(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";

        // Check if it's a connection error
        if (
          errorMessage.includes("Failed to fetch") ||
          errorMessage.includes("ECONNREFUSED")
        ) {
          setError(
            "Unable to connect to the server. Please make sure the JSON server is running (npm run server)"
          );

          // Auto-retry after 3 seconds if it's a connection error
          if (retryCount < 3) {
            setTimeout(() => {
              setRetryCount((prev) => prev + 1);
            }, 3000);
          }
        } else {
          setError(errorMessage);
        }

        console.error("Error Fetching Data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome, filters, retryCount]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : error ? (
          <div className="text-center py-8">
            <FaExclamationTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <div className="space-y-2">
              <button
                onClick={() => setRetryCount((prev) => prev + 1)}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <FaRedo />
                Retry Now
              </button>
              {retryCount > 0 && (
                <p className="text-sm text-gray-500">
                  Retry attempt: {retryCount}/3
                </p>
              )}
            </div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">
              No jobs found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobsListing;
