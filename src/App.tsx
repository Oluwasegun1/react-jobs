
import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Homepage from './pages/Homepage';
import MainLayout from './pages/MainLayout';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage'; 
import AddJobPage from './pages/AddJobPage';
import EditJob from './pages/EditJob';

const App: React.FC = () => {
  // Add New Job
  const addJob = async (newJob) => {
    try {
       await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });
      // Handle response as needed
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  // Delete Job
  const deleteJob = async (id: string) => {
    try {
       await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });
      // Handle response as needed
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  // Update Job
  const updateJob = async (job) => {
    try {
       await fetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });
      // Handle response as needed
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  // Create router and routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="/edit-job/:id" element={<EditJob updateJobSubmit={updateJob} />} loader={jobLoader} />
        <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
