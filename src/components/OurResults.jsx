import React from 'react';
import styled from 'styled-components';
import { getSectionBackground } from '../utils/backgrounds';
import resultsBgAsset from '../assets/backgrounds/Backgrounds-01.png';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Target, 
  Users, 
  TrendingUp, 
  Globe, 
  Eye, 
  Heart, 
  Calendar, 
  Video,
  CheckCircle
} from 'lucide-react';

const OurResultsContainer = styled.section`
  padding: 4rem 0;
  background: ${props => props.$bg ? `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url(${props.$bg}) center/cover no-repeat` : '#000000'};
  position: relative;
  overflow: hidden;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 5rem;
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

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ResultCard = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid #333333;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(238, 47, 47, 0.1);
    border-color: #ee2f2f;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ee2f2f, #c41e1e);
  }
`;

const ResultIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ee2f2f 0%, #c41e1e 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #ffffff;
  transition: all 0.3s ease;
  will-change: transform;
  
  ${ResultCard}:hover & {
    transform: scale(1.1);
  }
`;

const ResultNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-family: 'Space Grotesk', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ResultLabel = styled.p`
  color: #ffffff;
  opacity: 0.8;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 500;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  border-radius: 15px;
  border: 1px solid #333333;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    border-color: #ee2f2f;
  }
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  background: #ee2f2f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #ffffff;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-family: 'Space Grotesk', sans-serif;
`;

const StatLabel = styled.p`
  color: #ffffff;
  opacity: 0.8;
  font-size: 0.875rem;
  font-weight: 500;
`;

const OurResults = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const mainResults = [
    {
      icon: <Target size={24} />,
      number: '2,600+',
      label: 'Successful campaigns delivered'
    },
    {
      icon: <Users size={24} />,
      number: '10+',
      label: 'Satisfied government-sector clients'
    },
    {
      icon: <Globe size={24} />,
      number: '15+',
      label: 'Satisfied global private-sector clients'
    },
    {
      icon: <TrendingUp size={24} />,
      number: '4+',
      label: 'Agency collaborations'
    }
  ];

  const networkStats = [
    {
      icon: <Users size={20} />,
      number: '5,000+',
      label: 'Influencers in our global network'
    },
    {
      icon: <Globe size={20} />,
      number: '200,000+',
      label: 'Direct connections with influencers worldwide'
    },
    {
      icon: <Eye size={20} />,
      number: '900M+',
      label: 'Total views generated'
    },
    {
      icon: <Heart size={20} />,
      number: '100M+',
      label: 'Engagements delivered'
    },
    {
      icon: <Calendar size={20} />,
      number: '30+',
      label: 'Successful events organized'
    },
    {
      icon: <Video size={20} />,
      number: '9+',
      label: 'High-quality TV ads produced'
    }
  ];

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

  const bg = resultsBgAsset || getSectionBackground('results');

  return (
    <OurResultsContainer ref={ref} $bg={bg}>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionHeader variants={itemVariants}>
            <SectionTitle>Our Results</SectionTitle>
            <SectionSubtitle>
              At LA Marketing, numbers speak louder than words. Here's what we've achieved so far:
            </SectionSubtitle>
          </SectionHeader>

          <ResultsGrid>
            {mainResults.map((result, index) => (
              <ResultCard
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <ResultIcon>
                  {result.icon}
                </ResultIcon>
                <ResultNumber>{result.number}</ResultNumber>
                <ResultLabel>{result.label}</ResultLabel>
              </ResultCard>
            ))}
          </ResultsGrid>

          <StatsRow>
            {networkStats.map((stat, index) => (
              <StatItem
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <StatIcon>
                  {stat.icon}
                </StatIcon>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </StatsRow>
        </motion.div>
      </Container>
    </OurResultsContainer>
  );
};

export default OurResults;
