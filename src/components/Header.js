import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #4a86e8;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.div`
  font-size: 1.8rem;
  margin-right: 0.5rem;
`;

const LogoText = styled.div`
  h1 {
    font-size: 1.5rem;
    margin: 0;
  }
  
  p {
    font-size: 0.9rem;
    margin: 0;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.3rem;
    }
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <LogoIcon>✨</LogoIcon>
          <LogoText>
            <h1>OpenArt AI Prompt Optimizer</h1>
            <p>Transform natural language into optimized AI prompts</p>
          </LogoText>
        </Logo>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;