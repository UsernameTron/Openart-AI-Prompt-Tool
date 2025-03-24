import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 1.5rem 0;
  border-top: 1px solid #dee2e6;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: #6c757d;
  margin: 0;
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  a {
    color: #4a86e8;
    text-decoration: none;
    font-size: 0.9rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          © {currentYear} OpenArt AI Prompt Optimizer. All rights reserved.
        </Copyright>
        <FooterLinks>
          <a href="https://openart.ai" target="_blank" rel="noopener noreferrer">OpenArt AI</a>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            document.querySelector('[data-tab="about"]')?.click();
          }}>About</a>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            document.querySelector('[data-tab="about"]')?.click();
          }}>Help</a>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;