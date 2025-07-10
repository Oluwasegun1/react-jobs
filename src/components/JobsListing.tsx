import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";
import Spinner from "./Spinner";
import JobListing from "./JobListing";
import { Job } from "../types";
import { client } from "../lib/sanityClient"; // Adjust the import path as necessary

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

  // adjust path

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        // Construct dynamic GROQ query with filters
        let query = `*[_type == "job"`;
        const queryFilters: string[] = [];

        if (filters?.search) {
          queryFilters.push(`title match "${filters.search}*"`);
        }

        if (filters?.type) {
          queryFilters.push(`type == "${filters.type}"`);
        }

        if (filters?.location) {
          queryFilters.push(`location match "${filters.location}*"`);
        }

        if (filters?.salary) {
          queryFilters.push(`salary match "${filters.salary}*"`);
        }

        if (queryFilters.length > 0) {
          query += ` && ${queryFilters.join(" && ")}`;
        }

        query += `]{ 
        _id,
        title,
        type,
        location,
        description,
        salary,
        company->{
          name,
          description,
          contactEmail,
          contactPhone
        }
      }`;

        if (isHome) {
          query += `[0...3]`; // Limit for home page
        }

        const data = await client.fetch(query);
        setJobs(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";

        setError(errorMessage);
        console.error("Sanity Fetch Error:", error);
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
              <JobListing
                key={job._id}
                job={job}
                onDelete={async (jobId) => {
                  // Optimistically update UI
                  setJobs((prevJobs) =>
                    prevJobs.filter((j) => j._id !== jobId)
                  );
                  try {
                    const { deleteJob } = await import("../lib/queries");
                    await deleteJob(jobId);
                  } catch (err) {
                    // Optionally, show error and revert UI
                    setJobs((prevJobs) => [...prevJobs, job]);
                    alert("Failed to delete job.");
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobsListing;
