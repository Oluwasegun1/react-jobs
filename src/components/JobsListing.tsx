
import {useState, useEffect} from 'react';
import Spinner from './Spinner';
import JobListing from './JobListing';

interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  salary: number;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
}


const JobsListing = ({ isHome = false }: { isHome?: boolean }) => {
  const [jobs, setJobs] = useState<Job[]>([]); // Use Job[] to indicate array of Job objects
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome
      ? '/api/jobs?_limit=3'
      : '/api/jobs';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);

      } catch (error) {
       console.log('Error Fetching Data', error)
      } finally {
        setLoading(false);
      }
    
    }

    fetchJobs();

   }, [isHome]);
   

  return (
    <section className="bg-blue-50 px-4 py-10">
    <div className="container-xl lg:container m-auto">
      <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
        {isHome ? 'Recent Jobs' : 'Browse Jobs'}
      </h2>
    
        { loading ? (
          <Spinner loading={loading} />             
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

export default JobsListing
