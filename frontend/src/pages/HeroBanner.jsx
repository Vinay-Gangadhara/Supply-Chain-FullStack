import React from 'react'; // Import React library
import { Box, Typography, Button } from '@mui/material'; // Import components from Material-UI
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom for navigation
import rescueIcon from '../assets/icons/rescue-icon.png'; // Import rescue icon image
import HeroBannerImage from '../assets/images/banner.jpg'; // Import hero banner image

const HeroBanner = () => (
  <Box sx={{ mt: { lg: '70px', xs: '70px' }, ml: { sm: '20px' } }} position="relative" p="20px">
    {/* Outer container with responsive margin-top and margin-left, relative positioning, and padding */}
    
    <Typography>
      <img src={rescueIcon} alt="rescue Icon" style={{ marginBottom: '20px' }} />
      {/* Rescue icon image with bottom margin */}
    </Typography>
    
    <Typography>
      <span style={{ color: 'darkblue', fontWeight: '300', fontSize: '50px' }}>Welcome</span>
      {/* Welcome message with dark blue color, light font weight, and large font size */}
    </Typography>
    
    <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '40px' }, fontFamily: 'Pacifico, cursive' }} mb="23px" mt="30px">
      Supply Chain<br />
      Full Stack application
      {/* Main heading with bold font, responsive font size, and custom font family */}
    </Typography>
    
    <Typography fontSize="16px" fontFamily="Alegreya" lineHeight="25px">
      Designed to streamline company listings and enhance user experience, <br />
      our application provides detailed pages with integrated maps for better visualization, <br />
      and offers insightful analysis based on company data, facilitating informed decision-making.
      {/* Description with specific font size, custom font family, and line height */}
    </Typography>
    
    <Link to='/companies'>
      <li className='hidden sm:inline' style={{ position: 'relative', left: '37%', top: '50px' }}>
        <Button 
          variant="contained" 
          className='text-4xl border-b-4 border-transparent font-semibold transition duration-300 ease-in-out transform hover:bg-gradient-to-r from-[#4066ff] to-[#2949c6] hover:text-white' 
          style={{ padding: '10px 10px', fontSize: '2rem', fontFamily: 'Pacifico, cursive' }}
        >
          Company Listings
          {/* Button styled with custom classes and inline styles */}
        </Button>
      </li>
    </Link>
    
    <Typography fontWeight={600} color="#0000ff" sx={{ opacity: '0.1', display: { lg: 'block', xs: 'none' }, fontSize: '200px', mt: '80px' }}>
      <span style={{ color: '#2596be', fontWeight: '600' }}>Supply</span>
      <span style={{ color: '#000000', fontWeight: '400' }}>Chain</span>
      {/* Large background text with low opacity, responsive display, and custom colors */}
    </Typography>
    
    <img src={HeroBannerImage} style={{ zIndex: -1, top: '260px', height: '110%', opacity: '1.1' }} alt="hero-banner" className="hero-banner-img" />
    {/* Hero banner image with custom styles */}
  </Box>
);

export default HeroBanner; // Export the HeroBanner component
