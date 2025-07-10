import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteJob } from "../lib/queries";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useState } from "react";

interface Job {
  _id: string;
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

const JobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(`Job ID: ${id}`);
  const job: Job = useLoaderData() as Job;
  const [menuOpen, setMenuOpen] = useState(false);

  const onDeleteClick = async (jobId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;
    try {
      await deleteJob(jobId);
      toast.success("Job deleted successfully");
      navigate("/jobs");
    } catch (err) {
      toast.error("Failed to delete job.");
    }
  };

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      {job ? (
        <section className="bg-indigo-50">
          <div className="container m-auto py-10 px-6">
            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
              <main>
                <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                  <div className="text-gray-500 mb-4">{job.type}</div>
                  <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                  <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                    <FaMapMarker className="text-orange-700 mr-1" />
                    <p className="text-orange-700">{job.location}</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                  <h3 className="text-indigo-800 text-lg font-bold mb-6">
                    Job Description
                  </h3>
                  <p className="mb-4">{job.description}</p>
                  <h3 className="text-indigo-800 text-lg font-bold mb-2">
                    Salary
                  </h3>
                  <p className="mb-4">{job.salary} / Year</p>
                </div>
              </main>

              {/* Sidebar */}
              <aside>
                {/* Company Info */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-6">Company Info</h3>
                  <h2 className="text-2xl">{job.company.name}</h2>
                  <p className="my-2">{job.company.description}</p>
                  <hr className="my-4" />
                  <h3 className="text-xl">Contact Email:</h3>
                  <p className="my-2 bg-indigo-100 p-2 font-bold">
                    {job.company.contactEmail}
                  </p>
                  <h3 className="text-xl">Contact Phone:</h3>
                  <p className="my-2 bg-indigo-100 p-2 font-bold">
                    {job.company.contactPhone}
                  </p>
                </div>

                {/* Manage */}
                <div className="bg-white p-6 rounded-lg shadow-md mt-6 relative">
                  <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                  {/* Three-dot menu icon at top right */}
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={() =>
                        setMenuOpen && setMenuOpen((open) => !open)
                      }
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <HiEllipsisVertical className="w-6 h-6 text-gray-500" />
                    </button>
                    {menuOpen && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-20">
                        <Link
                          to={`/edit-job/${job._id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setMenuOpen(false)}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            setMenuOpen(false);
                            onDeleteClick(job._id);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      ) : (
        <p>Loading job details...</p>
      )}
    </>
  );
};

export default JobPage;
