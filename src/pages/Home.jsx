import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import OurResults from '../components/OurResults';
import JoinClients from '../components/JoinClients';
import SEO from '../components/SEO';
import { seoData } from '../utils/seoData';

const Home = () => {
  return (
    <>
      <SEO {...seoData.home} />
      <Hero />
      <Services />
      <OurResults />
      <JoinClients />
      </>
  );
};

export default Home;
