import React, { useState, memo, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';
import GoogleMap from '../components/GoogleMap';
import { OFFICE_LOCATIONS } from '../utils/mapUtils';
import { GOOGLE_MAPS_CONFIG } from '../config/mapConfig';
import SEO from '../components/SEO';
import { seoData } from '../utils/seoData';

const ContactContainer = styled.section`
  padding: 8rem 0 5rem;
  background: #000000;
  margin-top: 0;
  position: relative;
  overflow: hidden;
  
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
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
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
  font-size: 1.375rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  font-weight: 500;
  letter-spacing: 0.01em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    max-width: 600px;
    margin-bottom: 4rem;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled(motion.div)`
  background: linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
  backdrop-filter: blur(20px);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(238, 47, 47, 0.05) 0%, transparent 50%);
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(238, 47, 47, 0.2);
    border-color: rgba(238, 47, 47, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
`;

const ContactTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 2.5rem;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.01em;
  
  @media (max-width: 768px) {
    font-size: 1.375rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    gap: 1.25rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
  gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const ContactIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ee2f2f 0%, #c41e1e 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  flex-shrink: 0;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(238, 47, 47, 0.3);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(238, 47, 47, 0.4);
  }
`;

const ContactDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContactLabel = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ContactValue = styled.p`
  color: #ffffff;
  opacity: 0.8;
  line-height: 1.5;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ContactForm = styled(motion.form)`
  background: linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
  backdrop-filter: blur(20px);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(238, 47, 47, 0.05) 0%, transparent 50%);
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(238, 47, 47, 0.2);
    border-color: rgba(238, 47, 47, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 2rem;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.01em;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 0.5rem;
  opacity: 0.9;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #333333;
  border-radius: 10px;
  font-size: 1rem;
  background: #000000;
  color: #ffffff;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: #666666;
  }
  
  &:focus {
    outline: none;
    border-color: #ee2f2f;
    box-shadow: 0 0 0 2px rgba(238, 47, 47, 0.2);
  }
  
  &.error {
    border-color: #dc3545;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #333333;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  background: #000000;
  color: #ffffff;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: #666666;
  }
  
  &:focus {
    outline: none;
    border-color: #ee2f2f;
    box-shadow: 0 0 0 2px rgba(238, 47, 47, 0.2);
  }
  
  &.error {
    border-color: #dc3545;
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ee2f2f 0%, #c41e1e 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 8px 25px rgba(238, 47, 47, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    background: linear-gradient(135deg, #c41e1e 0%, #ee2f2f 100%);
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(238, 47, 47, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const MapSection = styled.section`
  background: linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
  padding: 5rem 0;
  border-radius: 2rem;
  margin: 5rem 0;
  border: 1px solid #333333;
  
  @media (max-width: 768px) {
    padding: 3rem 0;
    margin: 3rem 0;
    border-radius: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 0;
    margin: 2rem 0;
    border-radius: 0.5rem;
  }
`;

const MapWrapper = styled.div`
  height: 400px;
  border-radius: 20px;
  border: 1px solid #333333;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.05);
  width: 100%;
  
  @media (max-width: 768px) {
    height: 350px;
    border-radius: 15px;
  }
  
  @media (max-width: 480px) {
    height: 300px;
    border-radius: 10px;
  }
  
  @media (max-width: 360px) {
    height: 250px;
    border-radius: 8px;
  }
`;

const OfficeHours = styled.div`
  background: linear-gradient(135deg, #000000 0%,rgb(14, 14, 14) 100%);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid #333333;
  margin-top: 2rem;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.05);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 15px;
    margin-top: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 10px;
    margin-top: 1rem;
  }
`;

const OfficeHoursTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.01em;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

const HoursList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const HoursItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #333333;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem 0;
  }
`;

const Day = styled.span`
  color: #ffffff;
  font-weight: 500;
  opacity: 0.9;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Time = styled.span`
  color: #ffffff;
  opacity: 0.8;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, #ee2f2f 50%, #ffffff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease-in-out infinite;
  text-shadow: 0 0 30px rgba(238, 47, 47, 0.3);
  position: relative;
  
  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Contact = memo(() => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = useCallback(async (data) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', data);
    reset();
    setIsSubmitting(false);
    
    // Here you would typically send the data to your backend
    alert('Thank you for your message! We\'ll get back to you soon.');
  }, [reset]);

  const contactInfo = useMemo(() => [
    {
      icon: <MapPin size={24} />,
      label: 'Office Address',
      value: 'EG: Hady street - Giza\nAE: Dira - Dubai'
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone Number',
      value: '+201202020213'
    },
    {
      icon: <Mail size={24} />,
      label: 'Email Address',
      value: 'hello@lamarketingae.com'
    },
    {
      icon: <MessageSquare size={24} />,
      label: 'WhatsApp',
      value: '+201202020213'
    }
  ], []);

  const officeHours = useMemo(() => [
    { day: 'Sunday - Thursday', time: '9:00 AM - 6:00 PM' },
    { day: 'Friday', time: 'Closed' },
    { day: 'Saturday', time: '10:00 AM - 4:00 PM' }
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
      <SEO {...seoData.contact} />
      <ContactContainer id="contact">
        <Container ref={ref}>
        <HeroSection
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <HeroTitle>Get In Touch</HeroTitle>
          <HeroSubtitle>
            Ready to transform your digital presence? We'd love to hear from you. 
            Send us a message and let's discuss how we can help your business grow.
          </HeroSubtitle>
        </HeroSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <ContactGrid>
            <ContactInfo variants={itemVariants}>
              <ContactTitle>Contact Information</ContactTitle>
              {contactInfo.map((item, index) => (
                <ContactItem key={index}>
                  <ContactIcon>
                    {item.icon}
                  </ContactIcon>
                  <ContactDetails>
                    <ContactLabel>{item.label}</ContactLabel>
                    <ContactValue style={{ whiteSpace: 'pre-line' }}>
                      {item.value}
                    </ContactValue>
                  </ContactDetails>
                </ContactItem>
              ))}
            </ContactInfo>

            <ContactForm
              variants={itemVariants}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormTitle>Send Us a Message</FormTitle>
              
              <FormGroup>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      {...register('name', { required: 'Name is required' })}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && (
                      <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && (
                      <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+20 XXX XXX XXXX"
                      {...register('phone')}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="What's this about?"
                      {...register('subject')}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="message">Message *</Label>
                    <TextArea
                      id="message"
                      placeholder="Tell us about your project or how we can help..."
                      {...register('message', { required: 'Message is required' })}
                      className={errors.message ? 'error' : ''}
                    />
                    {errors.message && (
                      <ErrorMessage>{errors.message.message}</ErrorMessage>
                    )}
                  </FormGroup>

                  <SubmitButton
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </SubmitButton>
            </ContactForm>
          </ContactGrid>
        </motion.div>

        <MapSection>
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <SectionTitle>Visit Our Office</SectionTitle>
              <MapWrapper>
                <GoogleMap
                  center={OFFICE_LOCATIONS.EGYPT}
                  zoom={GOOGLE_MAPS_CONFIG.DEFAULT_ZOOM}
                />
              </MapWrapper>
              
              <OfficeHours>
                <OfficeHoursTitle>
                  <Clock size={20} />
                  Office Hours
                </OfficeHoursTitle>
                <HoursList>
                  {officeHours.map((hours, index) => (
                    <HoursItem key={index}>
                      <Day>{hours.day}</Day>
                      <Time>{hours.time}</Time>
                    </HoursItem>
                  ))}
                </HoursList>
              </OfficeHours>
            </motion.div>
          </Container>
        </MapSection>
        </Container>
      </ContactContainer>
    </>
  );
});

export default Contact;
