import { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { HiEllipsisVertical } from "react-icons/hi2";
import { Link } from "react-router-dom";

const JobListing = ({ job, onDelete }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  let description = job.description;

  if (!showFullDescription) {
    description = description.substring(0, 90) + "...";
  }
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      {/* Three-dot menu icon at top right */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={() => setMenuOpen((open) => !open)}
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
                onDelete && onDelete(job._id);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{job.type}</div>
          <h3 className="text-xl font-bold">{job.title}</h3>
        </div>

        <div className="mb-5">{description}</div>

        <button
          onClick={() => setShowFullDescription((prevState) => !prevState)}
          className="text-indigo-500 mb-5 hover:text-indigo-600"
        >
          {showFullDescription ? "less" : "more"}
        </button>

        <h3 className="text-indigo-500 mb-2">{job.salary} / Year</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaMapMarker className="inline  text-lg:mb-1 mr-1" />
            {job.location}
          </div>
          <Link
            to={`/jobs/${job._id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

JobListing.defaultProps = {
  onDelete: undefined,
};

export default JobListing;
