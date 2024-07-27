import { useState, useEffect } from 'react'; // Import React hooks for state and lifecycle management
import { useParams, Link } from 'react-router-dom'; // Import hooks and components for React Router
import { 
  MapContainer, TileLayer, Marker, Popup, Polygon, Circle, Polyline, useMap 
} from 'react-leaflet'; // Import components from React Leaflet for interactive maps
import L from 'leaflet'; // Import Leaflet for map functionality
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS for styling
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'; // Import Leaflet Routing Machine CSS for styling
import axios from 'axios'; // Import Axios for making HTTP requests
import { 
  Container, Box, Button, CircularProgress, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper 
} from '@mui/material'; // Import Material-UI components for UI design
import LocationCard from './LocationCard'; // Import LocationCard component
import Legend from './Legend'; // Import Legend component
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Tooltip, 
  Legend as RechartsLegend 
} from 'recharts'; // Import Recharts components for creating charts

import 'leaflet-routing-machine'; // Import Leaflet Routing Machine for routing functionality

// Import assets
import headerImage from '../assets/images/header/image2.jpg'; // Import header image
import locationIcon from '../assets/icons/location.gif'; // Import location icon
import latitudeIcon from '../assets/icons/latitude.png'; // Import latitude icon
import customMarkerIcon1 from '../assets/icons/custom-marker1.png'; // Import custom marker icon 1
import customMarkerIcon2 from '../assets/icons/custom-marker2.png'; // Import custom marker icon 2
import customMarkerIcon3 from '../assets/icons/custom-marker3.png'; // Import custom marker icon 3
import movingMarkerIcon from '../assets/icons/moving-marker.png'; // Import moving marker icon

// Define custom marker icons
const customIcons = [
  L.icon({
    iconUrl: customMarkerIcon1, // URL for custom marker icon 1
    iconSize: [60, 60], // Size of the icon
    iconAnchor: [22, 38], // Anchor point of the icon
    popupAnchor: [-3, -38] // Popup anchor point relative to the icon
  }),
  L.icon({
    iconUrl: customMarkerIcon2, // URL for custom marker icon 2
    iconSize: [60, 60], // Size of the icon
    iconAnchor: [22, 38], // Anchor point of the icon
    popupAnchor: [-3, -38] // Popup anchor point relative to the icon
  }),
  L.icon({
    iconUrl: customMarkerIcon3, // URL for custom marker icon 3
    iconSize: [60, 60], // Size of the icon
    iconAnchor: [22, 38], // Anchor point of the icon
    popupAnchor: [-3, -38] // Popup anchor point relative to the icon
  })
];

const movingIcon = L.icon({
  iconUrl: movingMarkerIcon, // URL for moving marker icon
  iconSize: [60, 60], // Size of the icon
  iconAnchor: [30, 30] // Anchor point of the icon
});


// Data for bar chart representing the number of branches in various cities
const barData = [
  { city: 'New York', branches: 5 },  // 5 branches in New York
  { city: 'Los Angeles', branches: 3 },  // 3 branches in Los Angeles
  { city: 'Chicago', branches: 4 },  // 4 branches in Chicago
  { city: 'Houston', branches: 2 },  // 2 branches in Houston
  { city: 'Phoenix', branches: 6 }  // 6 branches in Phoenix
];

// Data for line chart representing the number of branches over years
const lineData = [
  { year: 2018, branches: 2 },  // 2 branches in 2018
  { year: 2019, branches: 3 },  // 3 branches in 2019
  { year: 2020, branches: 5 },  // 5 branches in 2020
  { year: 2021, branches: 4 },  // 4 branches in 2021
  { year: 2022, branches: 6 }  // 6 branches in 2022
];

// Utility function to get the appropriate custom icon based on the index
const getIconForLocation = (index) => customIcons[index % customIcons.length];

// Component for adding a routing machine to the map
const RoutingMachine = ({ start, end }) => {
  const map = useMap();  // Get the map instance using the useMap hook

  useEffect(() => {
    if (!map || !L.Routing) return;  // Ensure map and L.Routing are available

    // Create a new routing control with waypoints from start to end
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start.lat, start.lng),  // Start location
        L.latLng(end.lat, end.lng)  // End location
      ],
      routeWhileDragging: true,  // Enable route dragging
    }).addTo(map);  // Add routing control to the map

    // Cleanup function to remove the routing control from the map
    return () => {
      map.removeControl(routingControl);
    };
  }, [map, start, end]);  // Dependency array for useEffect

  return null;  // This component does not render anything
};

// Component for moving a marker along a specified path
const MovingMarker = ({ path }) => {
  const [markerPosition, setMarkerPosition] = useState(path[0]);  // Initial marker position
  const [index, setIndex] = useState(0);  // Index for the current position in the path

  useEffect(() => {
    if (index >= path.length - 1) return;  // Stop if the end of the path is reached

    // Set a timeout to update the marker position and index
    const timeout = setTimeout(() => {
      setMarkerPosition(path[index]);  // Update marker position
      setIndex(index + 1);  // Increment index
    }, 1);  // Set a delay for the marker movement

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeout);
  }, [index, path]);  // Dependency array for useEffect

  // Render the moving marker with the updated position and icon
  return <Marker position={markerPosition} icon={movingIcon}></Marker>;
};


// Main component for displaying company details and map
const CompanyDetails = () => {
  const { companyId } = useParams(); // Extract the companyId from the URL parameters
  const [company, setCompany] = useState(null); // State to store company details
  const [locations, setLocations] = useState([]); // State to store company locations
  const [nearestLocation, setNearestLocation] = useState(null); // State to store the nearest location to the user
  const [userLocation, setUserLocation] = useState(null); // State to store the user's current location
  const [mapType, setMapType] = useState(1); // State to manage different map types
  const [selectedLocation, setSelectedLocation] = useState(null); // State to store the selected location for displaying route
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [message, setMessage] = useState(''); // State for managing messages

  // States for option 4
  const [userLocationOption4, setUserLocationOption4] = useState(null); // State for user's location in option 4
  const [routeInfoOption4, setRouteInfoOption4] = useState(null); // State for storing route info in option 4

  // States for option 5
  const [shortestPath, setShortestPath] = useState([]); // State for storing the shortest path coordinates
  const [movingMarkerPath, setMovingMarkerPath] = useState([]); // State for storing the path for the moving marker

  useEffect(() => {
    // Fetch company details and locations
    const fetchCompanyDetails = async () => {
      try {
        const [companyRes, locationsRes] = await Promise.all([
          axios.get(`http://localhost:8000/companies/${companyId}`), // Fetch company details
          axios.get(`http://localhost:8000/companies/${companyId}/locations`) // Fetch company locations
        ]);
        setCompany(companyRes.data); // Set company details
        setLocations(locationsRes.data); // Set locations
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchCompanyDetails(); // Call the function to fetch data
  }, [companyId]); // Dependency array to re-fetch data when companyId changes

  const findNearestLocation = () => {
    if (navigator.geolocation) {
      // Use geolocation to get user's current position
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng }); // Set user location state

        try {
          const response = await axios.get(`http://localhost:8000/companies/${companyId}/nearest_location`, {
            params: {
              user_latitude: userLat,
              user_longitude: userLng
            }
          });
          setNearestLocation(response.data); // Set nearest location state
          setMapType(3); // Change map type to 3
          setMessage('Please Click on the Location Marker of the Company. It Displays the Routes from your Location to the company branch Office with actual Direction.');
        } catch (error) {
          console.error('Error finding nearest location:', error);
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleMarkerClickOption3 = (location) => {
    setSelectedLocation(location); // Set the selected location state
  };

  const handleMarkerClickOption4 = async (location) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocationOption4({ lat: userLat, lng: userLng }); // Set user location state for option 4

        try {
          const response = await axios.get(`http://router.project-osrm.org/route/v1/driving/${userLng},${userLat};${location.longitude},${location.latitude}?overview=false`);
          const route = response.data.routes[0];
          setRouteInfoOption4({
            totalDistance: (route.distance / 1000).toFixed(2), // Convert to km
            totalTime: (route.duration / 3600).toFixed(2), // Convert to hours
            sourceName: 'Your Location',
            destinationName: location.name,
          });
          setMessage('Displaying detailed route information. Scroll Down');
        } catch (error) {
          console.error('Error fetching route info:', error);
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleOption5 = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng }); // Set user location state

        try {
          const response = await axios.get(`http://localhost:8000/companies/${companyId}/nearest_location`, {
            params: {
              user_latitude: userLat,
              user_longitude: userLng
            }
          });
          const nearest = response.data;
          setNearestLocation(nearest); // Set nearest location state
          setMapType(5); // Change map type to 5
          setMessage('This Map is the Interactive Display which shows the Shortest Direction path with moving marker from your Location to the nearest Office Location.');

          const routeRes = await axios.get(`http://router.project-osrm.org/route/v1/driving/${userLng},${userLat};${nearest.longitude},${nearest.latitude}?overview=full&geometries=geojson`);
          const path = routeRes.data.routes[0].geometry.coordinates.map(coord => ({
            lat: coord[1],
            lng: coord[0]
          }));
          setShortestPath(path); // Set the shortest path state
          setMovingMarkerPath(path); // Set the moving marker path state
        } catch (error) {
          console.error('Error fetching route info:', error);
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  if (loading) {
    return (
      <Container style={{ textAlign: 'center', padding: '20px' }}>
        <CircularProgress /> {/* Display loading spinner while fetching data */}
      </Container>
    );
  }


  return (
    <div className="flex h-screen flex-col">
      <div className="container mx-auto py-10 px-6 text-black bg-white mt-10 flex flex-col items-center overflow-y-auto">
        {/* Header section with title and back button */}
        <div className="w-full flex justify-between items-center mb-10">
          <div className="flex-1"></div>
          <h2 className="text-5xl font-bold text-cyan-600 border-b-4 border-red-600 text-center flex-1" style={{ fontFamily: 'Pacifico, cursive' }}>
            Company Details
          </h2>
          <div className="flex-1 flex justify-end">
            <Link to="/companies" className="text-blue-500 hover:underline">
              <Button variant="contained">Back to Company List</Button>
            </Link>
          </div>
        </div>
        {/* Company details section with image and information */}
        <div className="flex w-full h-3/4 mb-12">
          <div className="w-1/2 p-3">
            <img
              src={headerImage}
              alt={company?.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-1/2 p-5 flex flex-col justify-center">
            <h6 className="flex text-4xl font-bold pl-5 mb-4" style={{ fontFamily: 'Pacifico, cursive', color: 'black' }}>
              {company?.name}
            </h6>
            <h6 className="flex text-xl font-bold pl-5 mb-4" style={{ fontFamily: 'Pacifico, cursive', color: 'black' }}>
              <img src={locationIcon} alt="location-icon" className="w-8 h-8 mr-4" style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px', padding: '3px' }} />
              {company?.address}
            </h6>
            <h6 className="flex text-xl font-bold pl-5 mb-10" style={{ fontFamily: 'Pacifico, cursive', color: 'black' }}>
              <img src={latitudeIcon} alt="latitude-icon" className="w-8 h-8 mr-4" style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px', padding: '3px' }} />
              Latitude: {company?.latitude} Longitude: {company?.longitude}
            </h6>
            {/* Map section displaying the company location */}
            <div className="w-full h-60 mt-4 relative">
              <MapContainer
                center={[company?.latitude, company?.longitude]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[company?.latitude, company?.longitude]} icon={customIcons[0]}>
                  <Popup>
                    {company?.name} <br /> {company?.address}
                  </Popup>
                </Marker>
                <Circle
                  center={[company?.latitude, company?.longitude]}
                  radius={1000} // radius in meters
                  color="red"
                  fillColor="red"
                  fillOpacity={0.2}
                />
              </MapContainer>
            </div>
          </div>
        </div>
        {/* Branch locations section */}
        <div className="flex flex-col w-full">
          <h2 className="text-5xl font-bold text-cyan-600 mb-10" style={{ fontFamily: 'Pacifico, cursive' }}>
            Our Branch's
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-1">
            {locations.map((location, index) => (
              <LocationCard key={index} location={location} />
            ))}
          </div>
          {/* Map displaying all branch locations */}
          <Box className="flex gap-4 mb-4" style={{ height: '300px', width: '100%' }}>
            <MapContainer
              center={[company?.latitude, company?.longitude]}
              zoom={7}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {locations.map((location, index) => (
                <Marker
                  key={location.location_id}
                  position={[location.latitude, location.longitude]}
                  icon={getIconForLocation(index)}
                >
                  <Popup>{location.name}</Popup>
                </Marker>
              ))}
              <Circle
                center={[company?.latitude, company?.longitude]}
                radius={100000} // radius in meters
                color="red"
                fillColor="red"
                fillOpacity={0.2}
              />
              <Legend />
            </MapContainer>
          </Box>
        </div>
        {/* Sample charts section */}
        <div className="flex flex-col w-full">
          <h2 className="text-5xl font-bold text-cyan-600 mt-10 mb-10" style={{ fontFamily: 'Pacifico, cursive' }}>
            Sample Chart Visualisation
          </h2>
          <div className="flex w-full mb-10">
            {/* Bar chart displaying branch distribution by city */}
            <div className="w-1/2 p-4">
              <h3 className="text-3xl font-bold text-cyan-600 mb-4">Branch Distribution by City</h3>
              <BarChart
                width={600}
                height={300}
                data={barData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip />
                <RechartsLegend />
                <Bar dataKey="branches" fill="#8884d8" />
              </BarChart>
            </div>
            {/* Line chart displaying new branches opened each year */}
            <div className="w-1/2 p-4">
              <h3 className="text-3xl font-bold text-cyan-600 mb-4">New Branches Opened Each Year</h3>
              <LineChart
                width={600}
                height={300}
                data={lineData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <RechartsLegend />
                <Line type="monotone" dataKey="branches" stroke="#8884d8" />
              </LineChart>
            </div>
          </div>
        </div>
        {/* Map visualisation techniques section */}
        <div className="flex flex-col w-full">
          <h2 className="text-5xl font-bold text-cyan-600 mt-10 mb-10" style={{ fontFamily: 'Pacifico, cursive' }}>
            Map Visualisation Techniques
          </h2>
          <Box className="flex gap-4 mb-4">
            <Button variant="contained" onClick={() => { setMapType(1); setMessage('This is a Normal Map. This Displays all the Branchs for the Company using Markers.'); }} style={{ marginRight: '10px' }}>
              Normal Map
            </Button>
            <Button variant="contained" onClick={() => { setMapType(2); setMessage('This is a polygon map. This Describes the Area Distribution among the branchs. This Displays Connected Graph of the Branchs'); }} style={{ marginRight: '10px' }}>
              Polygon Map
            </Button>
            <Button variant="contained" onClick={findNearestLocation} style={{ marginRight: '10px' }}>
              User Location and Routing
            </Button>
            <Button variant="contained" onClick={() => { setMapType(4); setMessage('Please Click on the Location marker. The Route Matrix will be Displayed Below. It will have the Source Point, Destination Point, Distance between your location and Destination and other Matrix.'); }}>
              Detailed Route Info
            </Button>
            <Button variant="contained" onClick={handleOption5}>
              Shortest Distance with Moving Marker
            </Button>
          </Box>
          {message && (
            <Box className="mb-4">
              <h3>{message}</h3>
            </Box>
          )}
          {/* Dynamic map based on selected map type */}
          <Box style={{ height: '600px', width: '100%' }}>
            <MapContainer
              center={[company?.latitude, company?.longitude]}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Render markers for all locations if mapType is 1 */}
              {mapType === 1 && locations.map((location, index) => (
                <Marker
                  key={location.location_id}
                  position={[location.latitude, location.longitude]}
                  icon={getIconForLocation(index)}
                >
                  <Popup>{location.name}</Popup>
                </Marker>
              ))}
              {/* Render polygon connecting all locations if mapType is 2 */}
              {mapType === 2 && (
                <Polygon
                  positions={locations.map(location => [location.latitude, location.longitude])}
                />
              )}
              {/* Render user location, location markers, and routing if mapType is 3 */}
              {mapType === 3 && userLocation && (
                <>
                  <Marker position={[userLocation.lat, userLocation.lng]}>
                    <Popup>Your Location</Popup>
                  </Marker>
                  {locations.map((location, index) => (
                    <Marker
                      key={location.location_id}
                      position={[location.latitude, location.longitude]}
                      icon={getIconForLocation(index)}
                      eventHandlers={{ click: () => handleMarkerClickOption3(location) }}
                    >
                      <Popup>{location.name}</Popup>
                    </Marker>
                  ))}
                  {selectedLocation && (
                    <RoutingMachine
                      start={userLocation}
                      end={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
                    />
                  )}
                </>
              )}
              {/* Render user location and detailed route info markers if mapType is 4 */}
              {mapType === 4 && (
                <>
                  {userLocationOption4 && (
                    <Marker position={[userLocationOption4.lat, userLocationOption4.lng]}>
                      <Popup>Your Location</Popup>
                    </Marker>
                  )}
                  {locations.map((location, index) => (
                    <Marker
                      key={location.location_id}
                      position={[location.latitude, location.longitude]}
                      icon={getIconForLocation(index)}
                      eventHandlers={{ click: () => handleMarkerClickOption4(location) }}
                    >
                      <Popup>{location.name}</Popup>
                    </Marker>
                  ))}
                </>
              )}
              {/* Render user location, nearest location, and shortest path with moving marker if mapType is 5 */}
              {mapType === 5 && (
                <>
                  {userLocation && (
                    <Marker position={[userLocation.lat, userLocation.lng]}>
                      <Popup>Your Location</Popup>
                    </Marker>
                  )}
                  {nearestLocation && (
                    <Marker position={[nearestLocation.latitude, nearestLocation.longitude]}>
                      <Popup>{nearestLocation.name}</Popup>
                    </Marker>
                  )}
                  {shortestPath.length > 0 && (
                    <>
                      <Polyline positions={shortestPath} color="blue" />
                      <MovingMarker path={movingMarkerPath} />
                    </>
                  )}
                </>
              )}
              <Legend />
            </MapContainer>
            {/* Display route information if mapType is 4 */}
            {mapType === 4 && routeInfoOption4 && (
              <Box className="flex flex-col items-center mt-4">
                <h3 className="text-2xl font-bold">Route Information</h3>
                <TableContainer component={Paper} style={{ width: '60%' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Metric</TableCell>
                        <TableCell align="center">Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">Total Distance</TableCell>
                        <TableCell align="center">{routeInfoOption4.totalDistance} km</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">Total Time</TableCell>
                        <TableCell align="center">{routeInfoOption4.totalTime} hours</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">Source</TableCell>
                        <TableCell align="center">{routeInfoOption4.sourceName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">Destination</TableCell>
                        <TableCell align="center">{routeInfoOption4.destinationName}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;






