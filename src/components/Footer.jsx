import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import LALogo from '../assets/logo.png';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks';

const FooterContainer = styled.footer`
  background: #000000;
  color: #ffffff;
  padding: 4rem 0 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, #ee2f2f 50%, transparent 100%);
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  column-gap: 4rem;
  row-gap: 2rem;
  align-items: start;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoImage = styled.img`
  height: 48px;
  width: auto;
  object-fit: contain;
  transition: opacity 0.3s ease;
  opacity: 0;
  
  &[src] {
    opacity: 1;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
  
  &:nth-child(2) {
    margin-left: 4rem;
    
    @media (max-width: 1024px) {
      margin-left: 0;
    }
  }
`;

const FooterTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #ee2f2f 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FooterText = styled.p`
  color: #ffffff;
  opacity: 0.8;
  line-height: 1.6;
  font-size: 0.875rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #ffffff;
  opacity: 0.8;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
    color: #ee2f2f;
  }
  
  svg {
    color: #ee2f2f;
    transition: all 0.3s ease;
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
`;


const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  text-align: center;
  color: #ffffff;
  opacity: 0.8;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 1px;
    background: linear-gradient(90deg, #ee2f2f, #c41e1e);
  }
`;

const QuickLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 0.5rem;
`;

const QuickLink = styled(Link)`
  color: #ffffff;
  opacity: 0.8;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 1rem;
  
  &::before {
    content: '→';
    position: absolute;
    left: 0;
    color: #ee2f2f;
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: #ee2f2f;
    opacity: 1;
    padding-left: 1.5rem;
    
    &::before {
      opacity: 1;
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <BrandRow>
            <LogoImage 
              src={LALogo} 
              alt="LA Marketing" 
              loading="lazy"
              decoding="async"
            />
          </BrandRow>
          <FooterText>
            We are a leading marketing agency specializing in digital transformation,
            influencer marketing, and brand development across the Middle East.
          </FooterText>
          <SocialLinks justify="flex-start" size="medium" />
        </FooterSection>

        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <QuickLinks>
            <QuickLink to="/">Home</QuickLink>
            <QuickLink to="/influencers">Influencers</QuickLink>
            <QuickLink to="/about">About</QuickLink>
            <QuickLink to="/contact">Contact</QuickLink>
          </QuickLinks>
        </FooterSection>

        

        <FooterSection>
          <FooterTitle>Contact Info</FooterTitle>
          <ContactItem>
            <MapPin size={16} />
            <span style={{ whiteSpace: 'pre-line' }}>22 Hady Street Mohandseen<br />Giza, 12655, EG</span>
          </ContactItem>
          <ContactItem>
            <Phone size={16} />
            <span>+201202020213<br />+971562922548</span>
          </ContactItem>
          <ContactItem>
            <Mail size={16} />
            <span>hello@lamarketingae.com</span>
          </ContactItem>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <FooterText>
          © {currentYear} LA Marketing. All rights reserved.
        </FooterText>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
