import { useState, useEffect, useCallback } from "react";
import { Job, SearchFilters } from "../types";

interface UseJobsReturn {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  fetchJobs: (filters?: SearchFilters) => Promise<void>;
  addJob: (job: Omit<Job, "id">) => Promise<void>;
  updateJob: (id: string, job: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
}

export const useJobs = (): UseJobsReturn => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async (filters?: SearchFilters) => {
    setLoading(true);
    setError(null);

    try {
      let url = "/api/jobs";
      const params = new URLSearchParams();

      if (filters) {
        if (filters.search) params.append("q", filters.search);
        if (filters.type) params.append("type", filters.type);
        if (filters.location) params.append("location", filters.location);
        if (filters.salary) params.append("salary", filters.salary);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const addJob = useCallback(
    async (job: Omit<Job, "id">) => {
      try {
        const response = await fetch("/api/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job),
        });

        if (!response.ok) {
          throw new Error("Failed to add job");
        }

        await fetchJobs(); // Refresh the jobs list
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add job");
        throw err;
      }
    },
    [fetchJobs]
  );

  const updateJob = useCallback(
    async (id: string, job: Partial<Job>) => {
      try {
        const response = await fetch(`/api/jobs/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job),
        });

        if (!response.ok) {
          throw new Error("Failed to update job");
        }

        await fetchJobs(); // Refresh the jobs list
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update job");
        throw err;
      }
    },
    [fetchJobs]
  );

  const deleteJob = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/jobs/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete job");
        }

        await fetchJobs(); // Refresh the jobs list
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete job");
        throw err;
      }
    },
    [fetchJobs]
  );

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    addJob,
    updateJob,
    deleteJob,
  };
};
