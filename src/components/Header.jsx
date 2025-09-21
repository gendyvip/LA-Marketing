import React, { useState, useEffect, memo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LALogo from '../assets/logo.png';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  background: ${props => props.scrolled || props.isNotHome ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.01)'};
  backdrop-filter: ${props => props.scrolled || props.isNotHome ? 'blur(10px)' : 'blur(0px)'};
  transition: all 0.3s ease;
  padding: 1rem 0;
  border-bottom: ${props => props.scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent'};
`;

const NavContainer = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const LogoImage = styled.img`
  height: 72px;
  width: auto;
  max-width: 260px;
  object-fit: contain;
  transition: all 0.3s ease, opacity 0.3s ease;
  opacity: 0;
  
  &[src] {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    height: 56px;
    max-width: 200px;
  }
`;

const LogoText = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-left: 0.75rem;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
  
  ${Logo}:hover & {
    color: #ffffff;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
  opacity: 0.8;
  
  &:hover {
    color: #ffffff;
    opacity: 1;
  }
  
  &.active {
    color: #ffffff;
    opacity: 1;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      height: 1px;
      background: #ffffff;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.98);
  backdrop-filter: blur(10px);
  z-index: 999;
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
`;

const MobileNavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  transition: color 0.3s ease;
  opacity: 0.8;
  
  &:hover {
    color: #ffffff;
    opacity: 1;
  }
  
  &.active {
    color: #ffffff;
    opacity: 1;
  }
`;

const MobileCloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
`;


const Header = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isNotHome = location.pathname !== '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);


  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/influencers', label: 'Influencers' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <HeaderContainer
        scrolled={isScrolled}
        isNotHome={isNotHome}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavContainer>
          <Logo to="/">
            <LogoImage 
              src={LALogo} 
              alt="LA Marketing" 
              loading="eager"
              decoding="sync"
            />
          </Logo>
          
          <NavLinks>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
              </NavLink>
            ))}
          </NavLinks>
          
          <MobileMenuButton onClick={toggleMobileMenu}>
            <Menu size={24} />
          </MobileMenuButton>
        </NavContainer>
      </HeaderContainer>

      {isMobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MobileCloseButton onClick={toggleMobileMenu}>
            <X size={24} />
          </MobileCloseButton>
          {navItems.map((item) => (
            <MobileNavLink
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
              onClick={toggleMobileMenu}
            >
              {item.label}
            </MobileNavLink>
          ))}
        </MobileMenu>
      )}
    </>
  );
});

export default Header;
