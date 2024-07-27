import React from 'react'; // Import React library
import { Box } from '@mui/material'; // Import Box component from Material-UI
import HeroBanner from './HeroBanner'; // Import HeroBanner component

const Home = () => { // Define the Home component
  return (
    <Box> {/* Container for the Home component */}
      <HeroBanner /> {/* Render the HeroBanner component */}
    </Box>
  );
};

export default Home; // Export the Home component
