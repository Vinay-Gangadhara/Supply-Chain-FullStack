import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Add this import
import './App.css';
import './index.css';
import Home from './pages/Home';
import Header from './components/Header';
import CompanyListPage from './components/CompanyListPage';
import CompanyDetailsPage from './components/CompanyDetailsPage';
import { Box } from '@mui/material';

function App() {

  return (
    <Box width="400px" sx={{ width: { xl: '100%' } }} m="auto">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<CompanyListPage />} />
        <Route path="/companies/:companyId" element={<CompanyDetailsPage />} />
      </Routes>
    </Box>
  );
}

export default App;
