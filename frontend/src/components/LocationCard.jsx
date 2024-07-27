// LocationCard.jsx
import PropTypes from 'prop-types'; // Import PropTypes for type checking of props
import locationIcon from '../assets/icons/location.gif'; // Import location icon image
import BranchIcon from '../assets/images/company-branches.jpg'; // Import branch icon image

const LocationCard = ({ location }) => {
  return (
    <div className="bg-black border border-gray-300 rounded-lg shadow-md mb-6 overflow-hidden transition-all duration-300 ease-in-out hover:bg-blue-500 hover:shadow-lg hover:scale-105">
      {/* Container for the card with background color, border, rounded corners, shadow, and hover effects */}
      <div className="p-4">
        <img
          className="w-full h-60 object-cover" // Styling for the image to cover the container
          src={BranchIcon} // Source of the image
          alt={location.name} // Alt text for the image for accessibility
        />
        <h2 className="flex justify-center items-center text-xl font-bold mb-3 mt-2" style={{ fontFamily: 'Sorts Mill Goudy, serif', color: '#ff0000' }}>
          {location.name} {/* Display the name of the location */}
        </h2>
        <h6 className="flex justify-center items-center text-xl font-bold mb-2.5" style={{ fontFamily: 'Sorts Mill Goudy, serif', color: 'white' }}>
          <img 
            src={locationIcon} // Source of the location icon
            alt="location-icon" // Alt text for the icon
            className="w-8 h-8 mr-4" // Styling for the icon
            style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px', padding: '3px' }}
          />
          {location.address} {/* Display the address of the location */}
        </h6>
        <h2 className="flex justify-center items-center text-xl font-bold mb-3 mt-2" style={{ fontFamily: 'Sorts Mill Goudy, serif' }}>
          <span style={{ color: '#ff0000', paddingRight: '5px'}}>Latitude:</span> 
          <span style={{ color: '#ffffff', paddingRight: '10px' }}>{location.latitude}</span> 
          <span style={{ color: '#ff0000', paddingRight: '5px' }}>Longitude:</span> 
          <span style={{ color: '#ffffff' }}>{location.longitude}</span>
          {/* Display the latitude and longitude of the location */}
        </h2>
      </div>
    </div>
  );
};

// Define PropTypes for the LocationCard component
LocationCard.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string.isRequired, // Name is required and should be a string
    address: PropTypes.string.isRequired, // Address is required and should be a string
    latitude: PropTypes.number.isRequired, // Latitude is required and should be a number
    longitude: PropTypes.number.isRequired, // Longitude is required and should be a number
  }).isRequired, // The location prop is required
};

export default LocationCard; // Export the LocationCard component
