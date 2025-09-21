import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getSectionBackground } from '../utils/backgrounds';
import servicesBgAsset from '../assets/backgrounds/Backgrounds-10.png';
import { useInView } from 'react-intersection-observer';
import { 
  Users, 
  Camera, 
  Calendar
} from 'lucide-react';

const ServicesContainer = styled.section`
  padding: 8rem 0;
  background: ${props => props.$bg ? `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${props.$bg}) center/cover no-repeat` : '#000000'};
  position: relative;
  overflow: hidden;
  margin-top: -1px;
  min-height: 100vh;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, #ee2f2f 50%, transparent 100%);
    z-index: 1;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(238, 47, 47, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(238, 47, 47, 0.03) 0%, transparent 50%);
    z-index: 1;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
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
`;

const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  color: #ffffff;
  opacity: 0.8;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ServiceCard = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  padding: 3rem;
  border: 1px solid #333333;
  border-radius: 24px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(10px);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ee2f2f, #c41e1e);
    border-radius: 24px 24px 0 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(238, 47, 47, 0.05) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(238, 47, 47, 0.15);
    border-color: #ee2f2f;
    
    &::after {
      opacity: 1;
    }
  }
`;

const ServiceIcon = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #ee2f2f 0%, #c41e1e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  color: #ffffff;
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow: 0 8px 20px rgba(238, 47, 47, 0.3);
  will-change: transform;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, #ee2f2f, #c41e1e);
    border-radius: 22px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${ServiceCard}:hover & {
    transform: scale(1.15) rotate(5deg);
    box-shadow: 0 12px 30px rgba(238, 47, 47, 0.4);
    
    &::before {
      opacity: 1;
    }
  }
`;

const ServiceTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(135deg, #ffffff 0%, #ee2f2f 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
  text-shadow: 0 0 30px rgba(238, 47, 47, 0.3);
  transition: all 0.3s ease;
  
`;

const ServiceDescription = styled.p`
  color: #ffffff;
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  ${ServiceCard}:hover & {
    opacity: 1;
  }
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ServiceFeature = styled.li`
  color: #ffffff;
  opacity: 0.8;
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1.5rem;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #ffffff;
    font-weight: 600;
  }
`;

const Services = memo(() => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const services = useMemo(() => [
    {
      icon: <Users size={24} />,
      title: 'Influencer Marketing',
      description: 'We connect your brand with the right voices — from local creators to global influencers.',
      features: [
        'Build customized influencer strategies tailored to your goals',
        'Access one of the largest influencer networks in the MENA region and beyond',
        'Run measurable campaigns with advanced tools for tracking performance and ROI',
        'Deliver campaigns that boost awareness, engagement, and sales'
      ]
    },
    {
      icon: <Camera size={24} />,
      title: 'Media Production',
      description: 'From concept to screen, our media production team transforms ideas into impactful visuals.',
      features: [
        'TV commercials, digital ads, and branded films',
        'Creative direction, scriptwriting, and storyboarding',
        'Professional video and photo production with cinematic quality',
        'Post-production editing, motion graphics, and visual effects'
      ]
    },
    {
      icon: <Calendar size={24} />,
      title: 'Event Management',
      description: 'We create unforgettable experiences that engage audiences and elevate brands.',
      features: [
        'End-to-end planning and execution of corporate, cultural, and brand events',
        'Influencer activations and product launch events',
        'Stage design, logistics, and audience engagement strategies',
        'On-ground coverage and integration with influencer campaigns'
      ]
    }
  ], []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const bg = servicesBgAsset || getSectionBackground('services');

  return (
    <ServicesContainer id="services" $bg={bg}>
      <Container ref={ref}>
        <SectionHeader
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionTitle>Our Services</SectionTitle>
          <SectionSubtitle>
            We offer comprehensive marketing solutions designed to help your business
            grow and succeed in the digital landscape.
          </SectionSubtitle>
        </SectionHeader>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <ServiceIcon>
                  {service.icon}
                </ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceFeatures>
                  {service.features.map((feature, featureIndex) => (
                    <ServiceFeature key={featureIndex}>{feature}</ServiceFeature>
                  ))}
                </ServiceFeatures>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </motion.div>
      </Container>
    </ServicesContainer>
  );
});

export default Services;
