import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import PromptGenerator from './components/PromptGenerator';
import AboutTab from './components/AboutTab';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

const TabContainer = styled.div`
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  background: ${props => props.active ? '#4a86e8' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  padding: 10px 20px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 4px 4px 0 0;
  
  &:hover {
    background: ${props => props.active ? '#4a86e8' : '#f0f0f0'};
  }
`;

function App() {
  const [activeTab, setActiveTab] = useState('generator');

  return (
    <AppContainer>
      <Header />
      
      <MainContent className="container">
        <TabContainer>
          <TabButton 
            active={activeTab === 'generator'} 
            onClick={() => setActiveTab('generator')}
          >
            Prompt Optimizer
          </TabButton>
          <TabButton 
            active={activeTab === 'about'} 
            onClick={() => setActiveTab('about')}
          >
            About & Help
          </TabButton>
        </TabContainer>
        
        {activeTab === 'generator' && <PromptGenerator />}
        {activeTab === 'about' && <AboutTab />}
      </MainContent>
      
      <Footer />
    </AppContainer>
  );
}

export default App;