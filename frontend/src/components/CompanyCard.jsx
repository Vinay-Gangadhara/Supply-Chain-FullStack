import { Link } from 'react-router-dom'; // Import Link component from react-router-dom for navigation
import PropTypes from 'prop-types'; // Import PropTypes for type checking of props
import locationIcon from '../assets/icons/location.gif'; // Import location icon image

// Array of image paths for header images
const headerImages = [
  'src/assets/images/header/image1.jpg', // Path to header image 1
  'src/assets/images/header/image2.jpg', // Path to header image 2
  'src/assets/images/header/image3.jpg', // Path to header image 3
  'src/assets/images/header/image4.jpg', // Path to header image 4
  'src/assets/images/header/image5.jpg'  // Path to header image 5
];

// Function to get a random image from the array
const getRandomImage = () => headerImages[Math.floor(Math.random() * headerImages.length)];

const CompanyCard = ({ company }) => {
  const randomImage = getRandomImage(); // Get a random image for the company card

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md mb-6 overflow-hidden transition-all duration-300 ease-in-out hover:bg-blue-100 hover:shadow-lg hover:scale-105">
      {/* Link component to navigate to the company details page */}
      <Link 
        to={{
          pathname: `/companies/${company.company_id}`, // Navigate to the specific company's page using its ID
          state: { image: randomImage } // Pass the random image in the state
        }}
      >
        <img
          className="w-full h-60 object-cover"
          src={randomImage} // Display the random image in the company card
          alt={company.name} // Alt text for the image, using the company's name for accessibility
        />
        <div className="p-4">
          <h2 className="flex justify-center items-center text-xl font-bold mb-3 mt-2" style={{ fontFamily: 'Sorts Mill Goudy, serif', color: '#ff0000' }}>
            {company.name} {/* Display the company name */}
          </h2>
          <h6 className="flex justify-center items-center text-xl font-bold mb-2.5" style={{ fontFamily: 'Sorts Mill Goudy, serif', color: 'black' }}>
            <img src={locationIcon} alt="location-icon" className="w-8 h-8 mr-4" style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px', padding: '3px' }} />
            {company.address} {/* Display the company address with location icon */}
          </h6>
        </div>
      </Link>
    </div>
  );
};

// Define PropTypes for the CompanyCard component
CompanyCard.propTypes = {
  company: PropTypes.shape({
    company_id: PropTypes.string.isRequired, // company_id is required and should be a string to uniquely identify the company
    name: PropTypes.string.isRequired, // name is required and should be a string to display the company's name
    address: PropTypes.string.isRequired, // address is required and should be a string to display the company's address
  }).isRequired, // The entire company object is required
};

export default CompanyCard; // Export the CompanyCard component as the default export
