import React from 'react';
import styled from 'styled-components';
import { getSectionBackground } from '../utils/backgrounds';
import clientsBgAsset from '../assets/backgrounds/Backgrounds-10.png';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

// Import client logo images
import SamsungLogo from '../assets/clients/82317-removebg-preview.webp';
import KhabarSirriLogo from '../assets/clients/clogo_2018-02-12-15-17-56_hJluMRXXvJVlc1zWClkfogXX-removebg-preview.webp';
import LaPoireLogo from '../assets/clients/download-removebg-preview.webp';
import FayrouzLogo from '../assets/clients/fayrouz.webp';
import Images1Logo from '../assets/clients/images (1).webp';
import Images5Logo from '../assets/clients/images__5_-removebg-preview.webp';
import Images7Logo from '../assets/clients/images__7_-removebg-preview.webp';
import ImagesLogo from '../assets/clients/images-removebg-preview.webp';
import ImagesWebpLogo from '../assets/clients/images.webp';
import MaxresLogo from '../assets/clients/maxresdefault-removebg-preview.webp';
// New client logos
import NewClient1 from '../assets/clients/377834211_708328961310479_8774554395414056966_n.jpg';
import EwcLogo from '../assets/clients/ewc_logo_7b63df7166.png';
import LogoHeader from '../assets/clients/logo-header88.png';
import Logo1 from '../assets/clients/Logo1.png';
import RiyadhSeasonLogo from '../assets/clients/website_RiyadhSeason_w.webp';

const JoinClientsContainer = styled.section`
  padding: 4rem 0 1.5rem;
  background: ${props => props.$bg ? `#000000 url(${props.$bg}) center/cover no-repeat` : '#000000'};
  color: #ffffff;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Content = styled(motion.div)`
  text-align: center;
  position: relative;
  z-index: 2;
`;

const Title = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #ee2f2f 50%, #ffffff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #ee2f2f, #c41e1e);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.375rem;
  margin-bottom: 3rem;
  opacity: 0.8;
  line-height: 1.5;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const CTAButton = styled(motion.button)`
  padding: 1.5rem 3rem;
  background: #ee2f2f;
  color: #ffffff;
  border: 2px solid #ee2f2f;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 auto;
  
  &:hover {
    background: #c41e1e;
    border-color: #c41e1e;
    transform: translateY(-2px);
  }
`;

const ClientLogosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  align-items: center;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const ClientLogo = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: transparent;
  border-radius: 0;
  transition: all 0.3s ease;
  min-height: 140px;
  cursor: pointer;
  pointer-events: auto;
  position: relative;
  z-index: 2;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:hover img {
    filter: none !important;
  }
`;

const LogoImage = styled.img`
  max-width: 100%;
  max-height: 120px;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: filter 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
  filter: grayscale(100%) brightness(2);
  pointer-events: none;
  opacity: 0;
  
  &[src] {
    opacity: 1;
  }
`;


const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #000000 0%, #111111 50%, #000000 100%);
  opacity: 0.3;
  z-index: 1;
`;

const JoinClients = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const clientLogos = [
    { name: 'Samsung', logo: SamsungLogo },
    { name: 'Khabar Sirri', logo: KhabarSirriLogo, arabic: 'خبر سري' },
    { name: 'La Poire', logo: LaPoireLogo, arabic: 'لابوار' },
    { name: 'Fayrouz', logo: FayrouzLogo },
    { name: 'Saudi Tourism Authority', logo: Images1Logo, arabic: 'الهيئة السعودية للسياحة' },
    { name: 'KAPCI Coatings', logo: Images5Logo },
    { name: 'Americana Restaurants', logo: Images7Logo },
    { name: '45th Cairo International Film Festival', logo: ImagesLogo },
    { name: 'Client Logo', logo: ImagesWebpLogo },
    { name: 'Jeddah Summer', logo: MaxresLogo, arabic: 'صيف جدة' },
    // New client logos
    { name: 'Client Partner', logo: NewClient1 },
    { name: 'EWC', logo: EwcLogo },
    { name: 'Logo Header', logo: LogoHeader },
    { name: 'Logo 1', logo: Logo1 },
    { name: 'Riyadh Season', logo: RiyadhSeasonLogo, arabic: 'موسم الرياض' }
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleJoinClick = () => {
    // Scroll to contact section or open contact modal
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to contact page if not on home page
      window.location.href = '/contact';
    }
  };

  const bg = clientsBgAsset || getSectionBackground('clients');

  return (
    <JoinClientsContainer ref={ref} $bg={bg}>
      <BackgroundPattern />
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Content variants={itemVariants}>
            <Title>JOIN OUR CLIENTS</Title>
          </Content>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <ClientLogosGrid>
              {clientLogos.map((client, index) => (
                <ClientLogo
                  key={index}
                  variants={itemVariants}
                  onClick={() => console.log(`Clicked on ${client.name}`)}
                >
                  {client.logo ? (
                    <LogoImage 
                      src={client.logo} 
                      alt={client.name}
                      title={client.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        console.error(`Failed to load image for ${client.name}:`, client.logo);
                        e.target.style.display = 'none';
                      }}
                      onLoad={() => {
                        if (client.debug) {
                          console.log(`Successfully loaded image for ${client.name}:`, client.logo);
                        }
                      }}
                    />
                  ) : (
                    <div style={{ 
                      color: '#ffffff', 
                      fontWeight: '600', 
                      textAlign: 'center',
                      fontSize: '0.875rem'
                    }}>
                      {client.name}
                    </div>
                  )}
                </ClientLogo>
              ))}
            </ClientLogosGrid>
          </motion.div>

        </motion.div>
      </Container>
    </JoinClientsContainer>
  );
};

export default JoinClients;
