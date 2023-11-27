import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import '../style/Footer.css'
import NavBar from '../component/NavBar';
import Footer from '../component/Footer';
import SectionChoice from '../component/SectionChoice';
import SplitPage from '../component/SplitPage';
import Communate from '../component/Communate';
import Comments from '../component/Comments';


export default function Index() {
  return (
        <>
        <SplitPage/>
        <SectionChoice/>
        <Communate/>
        <Comments/>
        <Footer/>
        </>
  );
};

