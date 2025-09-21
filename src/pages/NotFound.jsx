import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(238, 47, 47, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(238, 47, 47, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const NotFoundContent = styled.div`
  text-align: center;
  max-width: 600px;
  z-index: 1;
  position: relative;
`;

const ErrorCode = styled(motion.h1)`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1;
  background: linear-gradient(135deg, #ffffff 0%, #ee2f2f 50%, #ffffff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease-in-out infinite;
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 4rem;
  }
`;

const ErrorTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ErrorDescription = styled(motion.p)`
  font-size: 1.125rem;
  color: #cccccc;
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const ActionButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  min-width: 160px;
  justify-content: center;
  
  &.primary {
    background: linear-gradient(135deg, #ee2f2f 0%, #ff4444 100%);
    color: #ffffff;
    box-shadow: 0 4px 15px rgba(238, 47, 47, 0.3);
    
    &:hover {
      background: linear-gradient(135deg, #ff4444 0%, #ee2f2f 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(238, 47, 47, 0.4);
    }
  }
  
  &.secondary {
    background: transparent;
    color: #ffffff;
    border: 2px solid #333333;
    
    &:hover {
      border-color: #ee2f2f;
      color: #ee2f2f;
      transform: translateY(-2px);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  min-width: 160px;
  justify-content: center;
  
  &.primary {
    background: linear-gradient(135deg, #ee2f2f 0%, #ff4444 100%);
    color: #ffffff;
    box-shadow: 0 4px 15px rgba(238, 47, 47, 0.3);
    
    &:hover {
      background: linear-gradient(135deg, #ff4444 0%, #ee2f2f 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(238, 47, 47, 0.4);
    }
  }
  
  &.secondary {
    background: transparent;
    color: #ffffff;
    border: 2px solid #333333;
    
    &:hover {
      border-color: #ee2f2f;
      color: #ee2f2f;
      transform: translateY(-2px);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;



const NotFound = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <SEO 
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist. Return to LA Marketing's homepage for digital marketing services in Dubai, UAE."
        keywords="404, page not found, LA Marketing, digital marketing"
        url="/404"
      />
      <NotFoundContainer>
        <NotFoundContent>
          <ErrorCode
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            404
          </ErrorCode>
          
          <ErrorTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Page Not Found
          </ErrorTitle>
          
          <ErrorDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Sorry, the page you're looking for doesn't exist or has been moved. 
            Let's get you back on track with our digital marketing services.
          </ErrorDescription>
          
          <ActionButtons
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <StyledLink
              to="/"
              className="primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={20} />
              Go Home
            </StyledLink>
            
            <ActionButton
              className="secondary"
              onClick={handleGoBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
              Go Back
            </ActionButton>
          </ActionButtons>
          
        </NotFoundContent>
      </NotFoundContainer>
    </>
  );
};

export default NotFound;
