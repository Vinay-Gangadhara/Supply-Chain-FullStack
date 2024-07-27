import { useState, useEffect } from 'react'; // Import React hooks for state and lifecycle management
import axios from 'axios'; // Import Axios for making HTTP requests
import spinner from '../assets/icons/spinner.gif'; // Import spinner icon for loading state
import CompanyCard from './CompanyCard'; // Import CompanyCard component

function CompanyListPage() {
  const [companies, setCompanies] = useState([]); // State to store list of companies
  const [search, setSearch] = useState(""); // State to manage the search input
  const [loading, setLoading] = useState(true); // State to manage loading status

  // useEffect hook to fetch company data when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8000/companies')
      .then(response => {
        setCompanies(response.data); // Set the companies state with the fetched data
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error(error); // Log any errors to the console
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Filter companies based on the search input
  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <div className="container mx-auto py-10 px-6 text-black bg-white mt-10 flex flex-col items-center overflow-y-auto">
        <div className="flex flex-col items-center justify-between w-full">
          <h2 className="text-4xl font-bold text-cyan-600 mb-5">Company List</h2>
          {/* Search input for filtering companies */}
          <div className="flex justify-center mb-5 w-full">
            <input
              type="text"
              className="w-full max-w-md p-3 border rounded"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)} // Update search state on input change
            />
          </div>
          {/* Display loading spinner or filtered list of companies */}
          {loading ? (
            <img src={spinner} alt="Loading Companies" /> // Show loading spinner while data is being fetched
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 my-10">
              {/* Map through filtered companies and display each as a CompanyCard */}
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <CompanyCard key={company.company_id} company={company} />
                ))
              ) : (
                <p>No companies available</p> // Display message if no companies match the search
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyListPage; // Export the CompanyListPage component
