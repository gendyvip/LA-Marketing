import React, { memo, useCallback, useState } from "react";
import styled from "styled-components";
import { getSectionBackground } from "../utils/backgrounds";
import heroBgAsset from "../assets/backgrounds/Backgrounds-01.png";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroContainer = styled.section`
  height: 100vh;
  background: ${(props) =>
    props.$bg
      ? `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${props.$bg}) center/cover no-repeat`
      : "#000000"};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  will-change: transform;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      #ee2f2f 50%,
      transparent 100%
    );
    z-index: 1;
    animation: none;
    will-change: auto;
  }

  @media (max-width: 1200px) {
    background: #000000;
    animation: none;
    will-change: auto;
  }

  @media (max-width: 768px) {
    align-items: flex-start;
    padding-top: 8rem;
    animation: none;
    will-change: auto;
  }

  @media (max-width: 480px) {
    padding-top: 6rem;
    animation: none;
    will-change: auto;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(238, 47, 47, 0.1) 0%,
      transparent 70%
    );
    z-index: 1;
    animation: none;
    will-change: auto;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  color: #ffffff;
  max-width: 1000px;
  padding: 0 2rem;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 1rem;
    max-width: 100%;
    animation: none;
    will-change: auto;
    z-index: 10;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
    animation: none;
    will-change: auto;
    z-index: 10;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-family: "Space Grotesk", sans-serif;
  font-size: 4.3rem;
  font-weight: 700;
  margin-bottom: 2rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  word-break: break-word;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #ee2f2f 30%,
    #ffffff 70%,
    #ee2f2f 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease-in-out infinite;
  will-change: background-position;
  text-shadow: 0 0 30px rgba(238, 47, 47, 0.3);
  position: relative;
  text-align: center;
  max-width: 100%;
  hyphens: auto;
  font-display: swap;
  will-change: transform;

  span {
    display: inline-block;
    transition: all 0.3s ease;
    animation: none;
    will-change: auto;
  }

  @keyframes gradientShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background: linear-gradient(135deg, #ffffff 0%, #ee2f2f 50%, #ffffff 100%);
  }

  @media (max-width: 1200px) {
    font-size: 3.5rem;
    line-height: 1.15;
    animation: none;
    will-change: auto;
  }

  @media (max-width: 992px) {
    font-size: 3rem;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    animation: none;
    will-change: auto;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    line-height: 1.1;
    margin-bottom: 2rem;
    letter-spacing: -0.02em;
    word-break: break-word;
    background: linear-gradient(
      135deg,
      #ffffff 0%,
      #ee2f2f 30%,
      #ffffff 70%,
      #ee2f2f 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
    animation: gradientShift 3s ease-in-out infinite;
    will-change: background-position;
    text-shadow: 0 0 30px rgba(238, 47, 47, 0.3);
    position: relative;
    text-align: center;
    max-width: 100%;
    hyphens: auto;
    font-display: swap;
    will-change: transform;
    display: block;
    visibility: visible;
    opacity: 1;
    z-index: 10;
  }

  @media (max-width: 576px) {
    font-size: 2rem;
    line-height: 1.1;
    margin-bottom: 2rem;
    letter-spacing: -0.02em;
    word-break: break-word;
    background: linear-gradient(
      135deg,
      #ffffff 0%,
      #ee2f2f 30%,
      #ffffff 70%,
      #ee2f2f 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
    animation: gradientShift 3s ease-in-out infinite;
    will-change: background-position;
    text-shadow: 0 0 30px rgba(238, 47, 47, 0.3);
    position: relative;
    text-align: center;
    max-width: 100%;
    hyphens: auto;
    font-display: swap;
    will-change: transform;
    display: block;
    visibility: visible;
    opacity: 1;
    z-index: 10;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    line-height: 1.1;
    margin-bottom: 2rem;
    letter-spacing: -0.02em;
    word-break: break-word;
    background: linear-gradient(
      135deg,
      #ffffff 0%,
      #ee2f2f 30%,
      #ffffff 70%,
      #ee2f2f 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
    animation: gradientShift 3s ease-in-out infinite;
    will-change: background-position;
    text-shadow: 0 0 30px rgba(238, 47, 47, 0.3);
    position: relative;
    text-align: center;
    max-width: 100%;
    hyphens: auto;
    font-display: swap;
    will-change: transform;
    display: block;
    visibility: visible;
    opacity: 1;
    z-index: 10;
  }

  @media (max-width: 360px) {
    font-size: 1.6rem;
    line-height: 1.1;
    margin-bottom: 2rem;
    letter-spacing: -0.02em;
    word-break: break-word;
    background: linear-gradient(
      135deg,
      #ffffff 0%,
      #ee2f2f 30%,
      #ffffff 70%,
      #ee2f2f 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
    animation: gradientShift 3s ease-in-out infinite;
    will-change: background-position;
    text-shadow: 0 0 30px rgba(238, 47, 47, 0.3);
    position: relative;
    text-align: center;
    max-width: 100%;
    hyphens: auto;
    font-display: swap;
    will-change: transform;
    display: block;
    visibility: visible;
    opacity: 1;
    z-index: 10;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.375rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  line-height: 1.6;
  font-weight: 500;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  letter-spacing: 0.02em;
  font-display: swap;
  will-change: transform;
  text-align: center;

  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ee2f2f, transparent);
    border-radius: 1px;
    animation: none;
    will-change: auto;
  }

  @media (max-width: 768px) {
    font-size: 1.125rem;
    max-width: 600px;
    margin-bottom: 4rem;
    animation: none;
    will-change: auto;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    max-width: 500px;
    animation: none;
    will-change: auto;
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  will-change: transform, opacity;

  @media (max-width: 768px) {
    will-change: auto;
  }

  @media (max-width: 480px) {
    will-change: auto;
  }
`;

const HeroButton = styled(motion.button)`
  padding: 1rem 2rem;
  border: none;
  border-radius: 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:focus {
    outline: none;
  }

  &.primary {
    background: linear-gradient(135deg, #ee2f2f 0%, #c41e1e 100%);
    color: #ffffff;
    box-shadow: 0 4px 15px rgba(238, 47, 47, 0.3);

    &:hover {
      background: linear-gradient(135deg, #c41e1e 0%, #a01717 100%);
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(238, 47, 47, 0.4);
    }
  }

  &.secondary {
    background: transparent;
    color: #ffffff;
    border: 2px solid #ee2f2f !important;
    box-shadow: 0 4px 15px rgba(238, 47, 47, 0.2);

    &:hover {
      background: linear-gradient(135deg, #ee2f2f 0%, #c41e1e 100%);
      color: #ffffff;
      transform: translateY(-3px);
      border: 2px solid #ee2f2f !important;
      box-shadow: 0 8px 25px rgba(238, 47, 47, 0.4);
    }

    &:active {
      background: linear-gradient(135deg, #ee2f2f 0%, #c41e1e 100%);
      color: #ffffff;
      border: 2px solid #ee2f2f !important;
    }

    &:focus {
      border: 2px solid #ee2f2f !important;
    }

    &:visited {
      border: 2px solid #ee2f2f !important;
    }
  }
`;

const ScrollDownButton = styled(motion.button)`
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: #ee2f2f;
    border: 2px solid #ee2f2f;
    transform: translateX(-50%) translateY(-5px);
  }

  &:focus {
    outline: none;
    border: 2px solid #ffffff !important;
  }

  &:active {
    background: transparent !important;
    border: 2px solid #ffffff !important;
    transform: translateX(-50%);
  }

  &:visited {
    border: 2px solid #ffffff !important;
  }

  @media (max-width: 768px) {
    bottom: 6rem;
    left: 45%;
    width: 45px;
    height: 45px;
    animation: none;
    will-change: auto;
  }

  @media (max-width: 480px) {
    bottom: 0.5rem;
    width: 40px;
    height: 40px;
    animation: none;
    will-change: auto;
  }

  @media (max-width: 360px) {
    bottom: 0.25rem;
    width: 35px;
    height: 35px;
    animation: none;
    will-change: auto;
  }
`;

const Hero = memo(() => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(true);

  const handleGetInTouch = useCallback(() => {
    navigate("/contact");
  }, [navigate]);

  const handleExploreWork = useCallback(() => {
    const servicesSection = document.querySelector("#services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleScrollDown = useCallback(() => {
    const servicesSection = document.querySelector("#services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const bg = heroBgAsset || getSectionBackground("hero");

  const titleText =
    "WE SPECIALIZE IN INFLUENCER MARKETING THAT DELIVERS MEASURABLE IMPACT";
  const chars = Array.from(titleText);

  const titleContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02 },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <HeroContainer $bg={bg} className="hero-container" role="banner">
      <HeroBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroContent>
          <HeroTitle
            className="hero-title"
            variants={titleContainer}
            initial="hidden"
            animate="visible"
            aria-label={titleText}
          >
            {showContent
              ? chars.map((ch, i) => (
                  <motion.span key={i} variants={charVariants}>
                    {ch === " " ? "\u00A0" : ch}
                  </motion.span>
                ))
              : titleText}
          </HeroTitle>

          <HeroSubtitle className="hero-subtitle" variants={itemVariants}>
            CONNECTING BRANDS, GOVERNMENTS, AND ORGANIZATIONS WITH THE RIGHT
            VOICES ACROSS THE MENA REGION AND BEYOND
          </HeroSubtitle>

          <HeroButtons
            variants={itemVariants}
            role="group"
            aria-label="Call to action buttons"
          >
            <HeroButton
              className="primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetInTouch}
              aria-label="Get in touch with LA Marketing"
            >
              Get In Touch
            </HeroButton>
            <HeroButton
              className="secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExploreWork}
              aria-label="Explore our digital marketing services"
            >
              Explore Our Services
            </HeroButton>
          </HeroButtons>
        </HeroContent>
      </motion.div>

      <ScrollDownButton
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleScrollDown}
        aria-label="Scroll down to services section"
      >
        <ChevronDown size={20} aria-hidden="true" />
      </ScrollDownButton>
    </HeroContainer>
  );
});

export default Hero;
