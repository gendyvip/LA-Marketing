import React from 'react';
import styled from 'styled-components';
import { Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';

const SocialLinksContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: ${props => props.$justify || 'flex-start'};
  
  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ee2f2f 0%, #ff4444 100%);
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #ffffff 0%, #ee2f2f 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 50%;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(238, 47, 47, 0.3);
    
    &::before {
      opacity: 1;
    }
    
    svg {
      color: #ffffff;
      z-index: 1;
      position: relative;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    width: 20px;
    height: 20px;
    transition: color 0.3s ease;
    z-index: 1;
    position: relative;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const SocialLinks = ({ 
  justify = 'flex-start', 
  size = 'medium',
  showLabels = false,
  className = ''
}) => {
  const socialPlatforms = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/la-marketing1/',
      icon: Linkedin,
      label: 'Follow us on LinkedIn'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/lamarekting2',
      icon: Instagram,
      label: 'Follow us on Instagram'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61565095627341',
      icon: Facebook,
      label: 'Follow us on Facebook'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@lamarekting',
      icon: Youtube,
      label: 'Subscribe to our YouTube channel'
    }
  ];

  const iconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;
  const containerSize = size === 'small' ? 36 : size === 'large' ? 52 : 44;

  return (
    <SocialLinksContainer 
      $justify={justify} 
      className={className}
      role="group"
      aria-label="Social media links"
    >
      {socialPlatforms.map((platform) => {
        const IconComponent = platform.icon;
        return (
          <SocialLink
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform.label}
            title={platform.label}
            style={{
              width: containerSize,
              height: containerSize
            }}
          >
            <IconComponent size={iconSize} />
          </SocialLink>
        );
      })}
    </SocialLinksContainer>
  );
};

export default SocialLinks;
