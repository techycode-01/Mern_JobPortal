import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Sidebar from "../Sidebar/Sidebar";
import Jobs from "./Jobs";
import Card from "../components/Card";
import Newsletter from "../components/Newsletter";
import toast from "react-hot-toast";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/all-jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load jobs. Please try again.");
        setIsLoading(false);
      });
  }, []);

  // ----------- Handle Filter Changes -----------
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // ----------- Filtering Logic -----------
  const getFilteredJobs = () => {
    let filteredJobs = jobs;

    // Filter by Position (query)
    if (query) {
      filteredJobs = filteredJobs.filter(
        (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }

    // Filter by Location
    if (location) {
      filteredJobs = filteredJobs.filter(
        (job) => job.jobLocation.toLowerCase().indexOf(location.toLowerCase()) !== -1
      );
    }

    // Filter by Sidebar Category
    if (selectedCategory) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          salaryType,
          experienceLevel,
          maxPrice,
          postingDate,
          employmentType,
        }) => {
          const isLocationMatch = jobLocation?.toLowerCase() === selectedCategory.toLowerCase();
          const isSalaryTypeMatch = salaryType?.toLowerCase() === selectedCategory.toLowerCase();
          const isExperienceMatch = experienceLevel?.toLowerCase() === selectedCategory.toLowerCase();
          const isEmploymentMatch = employmentType?.toLowerCase() === selectedCategory.toLowerCase();
          
          // Numerical salary check: only if selectedCategory is a number and doesn't look like a date (yyyy-mm-dd)
          const isNumericalSelection = !isNaN(selectedCategory) && !selectedCategory.includes("-");
          const isSalaryRangeMatch = isNumericalSelection && parseInt(maxPrice) <= parseInt(selectedCategory);

          // Date check: show jobs posted on or after the selected date
          const isDateMatch = postingDate >= selectedCategory;

          return (
            isLocationMatch ||
            isSalaryTypeMatch ||
            isExperienceMatch ||
            isEmploymentMatch ||
            isSalaryRangeMatch ||
            isDateMatch
          );
        }
      );
    }

    return filteredJobs;
  };

  const filteredJobs = getFilteredJobs();

  // ----------- Pagination Logic -----------
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Map result to Card components
  const result = paginatedJobs.map((data, i) => <Card key={i} data={data} />);

  return (
    <div>
      <Banner
        query={query}
        handleInputChange={handleInputChange}
        location={location}
        handleLocationChange={handleLocationChange}
      />

      {/* main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        <div className="col-span-2 bg-white p-4 rounded">
          {isLoading ? ( // Loading indicator
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p>No data found</p>
            </>
          )}

          {/* pagination block */}
          {result.length > 0 && (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline disabled:text-gray-400"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className="hover:underline disabled:text-gray-400"
              >
                Next
              </button>
            </div>
          )}
        </div>
        <div className="bg-white p-4 rounded">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Home;
