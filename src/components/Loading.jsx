import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0%, 100% { box-shadow: .2em 0px 0 0px currentcolor; }
  12% { box-shadow: .2em .2em 0 0 currentcolor; }
  25% { box-shadow: 0 .2em 0 0px currentcolor; }
  37% { box-shadow: -.2em .2em 0 0 currentcolor; }
  50% { box-shadow: -.2em 0 0 0 currentcolor; }
  62% { box-shadow: -.2em -.2em 0 0 currentcolor; }
  75% { box-shadow: 0px -.2em 0 0 currentcolor; }
  87% { box-shadow: .2em -.2em 0 0 currentcolor; }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-in-out;
  margin: 0;
  padding: 0;
  padding-top: env(safe-area-inset-top, 0px);

  @media (max-width: 768px) {
    padding-top: env(safe-area-inset-top, 0px);
  }

  @media (max-width: 480px) {
    padding-top: env(safe-area-inset-top, 0px);
  }
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 400px;
  width: 100%;
  padding: 0 2rem;
`;

const FancyLoader = styled.div`
  position: relative;
  transform: rotateZ(45deg);
  perspective: 1000px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  color: #ffffff;
  margin-bottom: 20px;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    transform: rotateX(70deg);
    animation: ${spin} 1s linear infinite;
  }

  &::after {
    color: #ee2f2f;
    transform: rotateY(70deg);
    animation-delay: .4s;
  }

  @media (max-width: 768px) {
    width: 42px;
    height: 42px;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const LoadingText = styled.h2`
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0;
  text-align: center;
  letter-spacing: 0.06em;
  line-height: 1.2;
  text-transform: uppercase;
  background: linear-gradient(135deg, #ffffff 0%, #ee2f2f 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 24px rgba(238, 47, 47, 0.25);

  @media (min-width: 1024px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const Loading = ({ message = "Welcome to LA Marketing"}) => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.add('app-loading');
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('app-loading');
      }
    };
  }, []);

  const content = (
    <LoadingContainer role="status" aria-live="polite">
      <LoadingContent>
        <FancyLoader />
        <LoadingText>{message}</LoadingText>
      </LoadingContent>
    </LoadingContainer>
  );

  const rootEl = typeof document !== 'undefined' ? document.body : null;
  return rootEl ? createPortal(content, rootEl) : content;
};

export default Loading;
