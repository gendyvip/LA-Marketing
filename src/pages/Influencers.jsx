import React, { useState, memo, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Instagram, Facebook, Video } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import SEO from '../components/SEO';
import { seoData } from '../utils/seoData';

// Custom TikTok icon component
const TikTokIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);
import influencerPhoto1 from '../assets/influencers/S.jpg';
import influencerPhoto2 from '../assets/clients/fayrouz.webp';

const InfluencersContainer = styled.section`
  padding: 0;
  background: #000000;
  position: relative;
  overflow: hidden;
`;


const ContentSection = styled.section`
  padding: 8rem 0 5rem;
  background: #000000;
  position: relative;
  overflow: hidden;
  margin-top: 0;
  
  &::before {
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

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
  padding: 0.75rem 1.5rem;
  border: 2px solid #333333;
  background: ${props => props.$active ? '#ee2f2f' : 'transparent'};
  color: ${props => props.$active ? '#ffffff' : '#ffffff'};
  border-radius: 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ee2f2f;
    color: #ffffff;
    background: #ee2f2f;
  }
  
  &.active {
    border-color: #ee2f2f;
  }
`;

const SwiperContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  
  .swiper {
    width: 100%;
    height: 100%;
    padding: 2rem 0;
  }
  
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: stretch;
    width: 100%;
    height: auto;
  }
  
  @media (max-width: 768px) {
    padding: 1rem 0;
    
    .swiper {
      padding: 1rem 0;
      width: 100%;
    }
    
    .swiper-slide {
      width: 100%;
      max-width: 100%;
    }
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: #ee2f2f;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-top: -25px;
    
    &:after {
      font-size: 20px;
    }
  }
  
  .swiper-pagination {
    margin-top: 2rem;
    position: relative;
  }
  
  .swiper-pagination-bullet {
    background: #ee2f2f;
    opacity: 0.5;
    
    &.swiper-pagination-bullet-active {
      opacity: 1;
    }
  }
`;

const InfluencerCard = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #333333;
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(238, 47, 47, 0.2);
    border-color: #ee2f2f;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

const InfluencerImage = styled.div`
  height: 350px;
  background: linear-gradient(135deg, #ee2f2f 0%, #c41e1e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 4rem;
  font-weight: 600;
  position: relative;
  overflow: visible;
  box-shadow: 0 5px 15px rgba(238, 47, 47, 0.3);
  width: 100%;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    height: 418px;
    overflow: visible;
  }
  
  @media (max-width: 480px) {
    height: 550px;
    overflow: visible;
  }
`;

const InfluencerPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  margin: 0;
  padding: 0;
  display: block;
  min-width: 100%;
  min-height: 100%;
  transition: opacity 0.3s ease;
  opacity: 0;
  
  &[src] {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    object-fit: contain;
    object-position: center;
  }
`;

const InfluencerContent = styled.div`
  padding: 3rem;
  
  @media (max-width: 768px) {
    padding: 2.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 2rem;
  }
`;

const InfluencerName = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.75rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
`;

const InfluencerCategory = styled.p`
  color: #ee2f2f;
  font-weight: 500;
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.9;
`;


const SocialLinks = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SocialLink = styled.a`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid #555555;
  
  &:hover {
    background: #ee2f2f;
    color: #ffffff;
    transform: scale(1.1);
    border-color: #ee2f2f;
  }
`;

const Influencers = memo(() => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const filters = useMemo(() => [
    { key: 'all', label: 'All' },
    { key: 'fashion', label: 'Fashion' },
    { key: 'beauty', label: 'Beauty' },
    { key: 'lifestyle', label: 'Lifestyle' },
    { key: 'travel', label: 'Travel' },
    { key: 'actors', label: 'Actors' },
    { key: 'comedy', label: 'Comedy' },
    { key: 'singing', label: 'Singing' },
    { key: 'food', label: 'Food' },
    { key: 'cars', label: 'Cars' }
  ], []);

  const influencers = useMemo(() => [
    {
      id: 1,
      name: 'Style Queen',
      category: 'fashion',
      type: 'Fashion Influencer',
      photo: influencerPhoto1,
      socialLinks: [
        { platform: 'instagram', url: '#' },
        { platform: 'facebook', url: '#' },
        { platform: 'tiktok', url: '#' }
      ]
    },
    {
      id: 2,
      name: 'Beauty Guru',
      category: 'beauty',
      type: 'Beauty Influencer',
      photo: influencerPhoto2,
      socialLinks: [
        { platform: 'instagram', url: '#' },
        { platform: 'facebook', url: '#' },
        { platform: 'tiktok', url: '#' }
      ]
    },
    {
      id: 3,
      name: 'Lifestyle Vlogger',
      category: 'lifestyle',
      type: 'Lifestyle Influencer',
      socialLinks: [
        { platform: 'instagram', url: '#' },
        { platform: 'facebook', url: '#' },
        { platform: 'tiktok', url: '#' }
      ]
    },
    {
      id: 4,
      name: 'Wanderlust',
      category: 'travel',
      type: 'Travel Influencer',
      socialLinks: [
        { platform: 'instagram', url: '#' },
        { platform: 'facebook', url: '#' },
        { platform: 'tiktok', url: '#' }
      ]
    },
    {
      id: 5,
      name: 'Drama Star',
      category: 'actors',
      type: 'Actor',
      photo: influencerPhoto1,
      socialLinks: [
        { platform: 'instagram', url: '#' },
        { platform: 'facebook', url: '#' },
        { platform: 'tiktok', url: '#' }
      ]
    },
    {
      id: 6,
      name: 'Comedy King',
      category: 'comedy',
      type: 'Comedy Influencer',
      photo: influencerPhoto2,
      socialLinks: [
        { platform: 'instagram', url: '#' },
        { platform: 'facebook', url: '#' },
        { platform: 'tiktok', url: '#' }
      ]
    },
    {
      id: 7,
      name: 'Music Star',
      category: 'singing',
      type: 'Singer',
      socialLinks: [
        { platform: 'instagram', url: '#' },
        { platform: 'facebook', url: '#' },
        { platform: 'tiktok', url: '#' }
      ]
    },
    {
      id: 8,
      name: 'Food Blogger',
      category: 'food',
      type: 'Food Influencer',
      photo: influencerPhoto2,
      socialLinks: [
        { platform: 'instagram', url: '#' },
        { platform: 'facebook', url: '#' },
        { platform: 'tiktok', url: '#' }
      ]
    },
    {
      id: 9,
      name: 'Car Enthusiast',
      category: 'cars',
      type: 'Car Influencer',
      socialLinks: [
        { platform: 'instagram', url: '#' },
        { platform: 'facebook', url: '#' },
        { platform: 'tiktok', url: '#' }
      ]
    }
  ], []);

  const filteredInfluencers = useMemo(() => 
    activeFilter === 'all' 
      ? influencers  
      : influencers.filter(client => client.category === activeFilter),
    [activeFilter, influencers]
  );

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'instagram': return <Instagram size={16} />;
      case 'facebook': return <Facebook size={16} />;
      case 'tiktok': return <TikTokIcon size={16} />;
      default: return null;
    }
  };

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
      <SEO {...seoData.influencers} />
      <InfluencersContainer>
        <ContentSection id="content">
        <Container ref={ref}>
          <HeroSection
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <HeroTitle>LA Marketing Influencer Network</HeroTitle>
            <HeroSubtitle>
              We're proud to work with amazing brands, influencers, and startups across the Middle East.
            </HeroSubtitle>
          </HeroSection>

          <FilterTabs>
            {filters.map((filter) => (
              <FilterTab
                key={filter.key}
                $active={activeFilter === filter.key}
                className={activeFilter === filter.key ? 'active' : ''}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </FilterTab>
            ))}
          </FilterTabs>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <SwiperContainer>
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                    spaceBetween={40}
                    slidesPerView={3}
                    navigation={false}
                    pagination={{ clickable: true }}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    effect="coverflow"
                    coverflowEffect={{
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                        centeredSlides: true,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                        centeredSlides: false,
                      },
                      1024: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                        centeredSlides: false,
                      },
                    }}
                    loop={true}
                  >
                    {filteredInfluencers.map((client) => (
                      <SwiperSlide key={client.id}>
                        <InfluencerCard
                          variants={itemVariants}
                          whileHover={{ scale: 1.02 }}
                        >
                          <InfluencerImage>
                            {client.photo ? (
                              <InfluencerPhoto 
                                src={client.photo} 
                                alt={client.name}
                                loading="lazy"
                                decoding="async"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            ) : (
                              client.name.split(' ').map(n => n[0]).join('')
                            )}
                          </InfluencerImage>
                          <InfluencerContent>
                            <InfluencerName>{client.name}</InfluencerName>
                            <InfluencerCategory>{client.type}</InfluencerCategory>
                            
                            <SocialLinks>
                              {client.socialLinks.map((link, index) => (
                                <SocialLink key={index} href={link.url}>
                                  {getSocialIcon(link.platform)}
                                </SocialLink>
                              ))}
                            </SocialLinks>
                          </InfluencerContent>
                        </InfluencerCard>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </SwiperContainer>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          </Container>
        </ContentSection>
      </InfluencersContainer>
    </>
  );
});

export default Influencers;