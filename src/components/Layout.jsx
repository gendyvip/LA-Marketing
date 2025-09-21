import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  ${props => props.$backgroundUrl ? css`
    background: linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25))), url(${props.$backgroundUrl}) center/cover no-repeat;
  ` : css`
    background: #ffffff;
  `}
`;

const MainContent = styled(motion.main)`
  flex: 1;
  width: 100%;
`;

const Layout = ({ children }) => {
  const backgroundModules = import.meta.glob('../assets/backgrounds/*.{png,jpg,jpeg,webp,avif}', { eager: true });
  const backgroundUrls = Object.values(backgroundModules)
    .map((mod) => mod && mod.default)
    .filter(Boolean);
  const backgroundUrl = backgroundUrls.length > 0 ? backgroundUrls[0] : undefined;

  return (
    <LayoutContainer $backgroundUrl={backgroundUrl}>
      <Header />
      <MainContent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
