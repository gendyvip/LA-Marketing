import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Users, CheckCircle, Lightbulb, Camera, Calendar } from 'lucide-react';
import SEO from '../components/SEO';
import { seoData } from '../utils/seoData';

const AboutContainer = styled.section`
  padding: 8rem 0 5rem;
  background: #000000;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  margin-top: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: #000000;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 80% 40%, rgba(238, 47, 47, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 40% 50%, rgba(238, 47, 47, 0.03) 0%, transparent 50%);
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

const HeroSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 5rem;
`;

const HeroTitle = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #ee2f2f 50%, #ffffff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  position: relative;
  text-align: center;
  
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

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #ffffff;
  opacity: 0.8;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
`;

const Section = styled.section`
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
  text-align: center;
  margin-bottom: 3rem;
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

const MissionVisionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const MissionVisionCard = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  padding: 2rem;
  border-radius: 24px;
  text-align: center;
  border: 1px solid #333333;
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

const CardIcon = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #ee2f2f 0%, #c41e1e 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #ffffff;
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
  
  ${MissionVisionCard}:hover & {
    transform: scale(1.15) rotate(5deg);
    box-shadow: 0 12px 30px rgba(238, 47, 47, 0.4);
    
    &::before {
      opacity: 1;
    }
  }
`;

const CardTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(135deg, #ffffff 0%, #ee2f2f 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  text-shadow: 0 0 30px rgba(238, 47, 47, 0.3);
  transition: all 0.3s ease;
`;

const CardDescription = styled.p`
  color: #ffffff;
  opacity: 0.8;
  line-height: 1.6;
  font-size: 1.125rem;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
`;

const ValueCard = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid #333333;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.05);
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
    height: 3px;
    background: linear-gradient(90deg, #ee2f2f, #c41e1e);
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

const ValueIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ee2f2f 0%, #c41e1e 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #ffffff;
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
  
  ${ValueCard}:hover & {
    transform: scale(1.15) rotate(5deg);
    box-shadow: 0 12px 30px rgba(238, 47, 47, 0.4);
    
    &::before {
      opacity: 1;
    }
  }
`;

const ValueTitle = styled.h4`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  background: linear-gradient(135deg, #ffffff 0%, #ee2f2f 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  text-shadow: 0 0 30px rgba(238, 47, 47, 0.3);
  transition: all 0.3s ease;
`;

const ValueDescription = styled.p`
  color: #ffffff;
  opacity: 0.8;
  line-height: 1.6;
`;




const About = memo(() => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const values = useMemo(() => [
    {
      icon: <Target size={24} />,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, delivering exceptional results that exceed expectations.'
    },
    {
      icon: <Users size={24} />,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and building strong partnerships with our clients.'
    },
    {
      icon: <Lightbulb size={24} />,
      title: 'Innovation',
      description: 'We embrace new technologies and creative approaches to solve complex marketing challenges.'
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'Integrity',
      description: 'We maintain the highest standards of honesty and transparency in all our business practices.'
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

  return (
    <>
      <SEO {...seoData.about} />
      <AboutContainer>
        <Container ref={ref}>
        <HeroSection
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <HeroTitle>About LA Marketing</HeroTitle>
          <HeroSubtitle>
          At LA Marketing, we specialize in influencer marketing that delivers measurable impact. Our mission is to connect brands, governments, and organizations with the right voices to amplify their message, expand their reach, and drive real results across the MENA region and beyond.
          </HeroSubtitle>
        </HeroSection>

        <Section>
          <SectionTitle>Our Core Pillars</SectionTitle>
          <MissionVisionGrid>
            <MissionVisionCard
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <CardIcon>
                <Users size={32} />
              </CardIcon>
              <CardTitle>Influencer Marketing</CardTitle>
              <CardDescription>
                Access one of the largest influencer networks in the MENA region and from all over the world, powered by advanced tools that ensure precision targeting, transparency, and measurable outcomes.
              </CardDescription>
            </MissionVisionCard>

            <MissionVisionCard
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <CardIcon>
                <Camera size={32} />
              </CardIcon>
              <CardTitle>Media Production Department</CardTitle>
              <CardDescription>
                Led by seasoned professionals, our production team creates world-class TV ads, branded films, digital content, and storytelling visuals that elevate every campaign.
              </CardDescription>
            </MissionVisionCard>

            <MissionVisionCard
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <CardIcon>
                <Calendar size={32} />
              </CardIcon>
              <CardTitle>Event Management Department</CardTitle>
              <CardDescription>
                From intimate activations to large-scale experiences, we design and execute events that engage audiences, strengthen brand presence, and deliver unforgettable impact.
              </CardDescription>
            </MissionVisionCard>
          </MissionVisionGrid>
        </Section>


        <Section>
          <SectionTitle>Our Core Values</SectionTitle>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <ValuesGrid>
              {values.map((value, index) => (
                <ValueCard
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <ValueIcon>
                    {value.icon}
                  </ValueIcon>
                  <ValueTitle>{value.title}</ValueTitle>
                  <ValueDescription>{value.description}</ValueDescription>
                </ValueCard>
              ))}
            </ValuesGrid>
          </motion.div>
        </Section>


        </Container>
      </AboutContainer>
    </>
  );
});

export default About;
