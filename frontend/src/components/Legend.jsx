import customMarkerIcon1 from '../assets/icons/custom-marker1.png'; // Import custom marker icon 1
import customMarkerIcon2 from '../assets/icons/custom-marker2.png'; // Import custom marker icon 2
import customMarkerIcon3 from '../assets/icons/custom-marker3.png'; // Import custom marker icon 3
import customMarkerIcon4 from '../assets/icons/custom-marker4.png'; // Import custom marker icon 4

const Legend = () => {
  return (
    <div style={{
      position: 'absolute', // Position the legend absolutely within its containing element
      bottom: '20px', // 20px from the bottom of the containing element
      left: '20px', // 20px from the left of the containing element
      padding: '10px', // 10px padding inside the legend
      backgroundColor: 'white', // White background for the legend
      borderRadius: '5px', // Rounded corners with 5px radius
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)', // Box shadow for a slight 3D effect
      zIndex: 1000, // Ensure the legend is on top of other elements
    }}>
      {/* Legend item for Headquarters */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <img src={customMarkerIcon1} alt="Custom Icon 1" style={{ width: '35px', height: '35px', marginRight: '10px' }} />
        <span className="text-xl font-bold pl-1 mb-1" style={{ fontFamily: 'Pacifico, cursive', color: 'black' }}>Headquarters</span>
      </div>
      {/* Legend item for Branch 1 */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <img src={customMarkerIcon2} alt="Custom Icon 2" style={{ width: '35px', height: '35px', marginRight: '10px' }} />
        <span className="text-xl font-bold pl-1 mb-1" style={{ fontFamily: 'Pacifico, cursive', color: 'black' }}>Branch 1</span>
      </div>
      {/* Legend item for Branch 2 */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <img src={customMarkerIcon3} alt="Custom Icon 3" style={{ width: '35px', height: '35px', marginRight: '10px' }} />
        <span className="text-xl font-bold pl-1 mb-1" style={{ fontFamily: 'Pacifico, cursive', color: 'black' }}>Branch 2</span>
      </div>
      {/* Legend item for Radius 100Km */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={customMarkerIcon4} alt="Custom Icon 4" style={{ width: '35px', height: '35px', marginRight: '10px' }} />
        <span className="text-xl font-bold pl-1 mb-1" style={{ fontFamily: 'Pacifico, cursive', color: 'black' }}>Radius 100Km</span>
      </div>
    </div>
  );
};

export default Legend; // Export the Legend component
