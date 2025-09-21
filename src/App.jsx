import React, { lazy, Suspense, memo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Loading from './components/Loading';

// Lazy load all pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Influencers = lazy(() => import('./pages/Influencers'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const ScrollManager = memo(() => {
  const location = useLocation();
  
  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, location.hash]);
  
  return null;
});

const App = memo(() => {
  return (
    <Router>
      <ScrollManager />
      <Layout>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<Loading message="Loading Home..." />}>
              <Home />
            </Suspense>
          } />
          <Route path="/about" element={
            <Suspense fallback={<Loading message="Loading About..." />}>
              <About />
            </Suspense>
          } />
          <Route path="/influencers" element={
            <Suspense fallback={<Loading message="Loading Influencers..." />}>
              <Influencers />
            </Suspense>
          } />
          <Route path="/contact" element={
            <Suspense fallback={<Loading message="Loading Contact..." />}>
              <Contact />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<Loading message="Loading..." />}>
              <NotFound />
            </Suspense>
          } />
        </Routes>
      </Layout>
    </Router>
  );
});

export default App;
