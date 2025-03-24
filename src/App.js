import React, { useState, useEffect } from 'react';
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

const AdvancedModeToggle = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #4a86e8;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  &:hover {
    background: #3a76d8;
  }
`;

function App() {
  const [activeTab, setActiveTab] = useState('generator');
  const [useAdvancedUI, setUseAdvancedUI] = useState(false);

  // Setup message listener for the iframe to switch back
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'switch-to-basic') {
        setUseAdvancedUI(false);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Check if advanced optimizer is available
  useEffect(() => {
    // Wait for DOM content to be loaded and scripts to execute
    const checkAdvancedAvailability = () => {
      const hasAdvancedOptimizer = window.AdvancedPromptOptimizer && 
        typeof window.AdvancedPromptOptimizer.optimizeFlux === 'function';
      
      console.log("Checking advanced optimizer availability:", hasAdvancedOptimizer);
      
      if (hasAdvancedOptimizer) {
        // Auto-detect and offer advanced UI if optimizer is available
        const autoSwitchToAdvanced = window.confirm(
          "Advanced Optimizer detected! Would you like to switch to the advanced UI with additional modifiers and a dark theme?"
        );
        
        if (autoSwitchToAdvanced) {
          setUseAdvancedUI(true);
        }
      }
    };

    // Wait a moment for all scripts to load
    const timer = setTimeout(checkAdvancedAvailability, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // If using advanced UI, create an iframe to load the standalone HTML
  if (useAdvancedUI) {
    return (
      <>
        <iframe 
          src="/advanced.html" 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            zIndex: 900
          }}
          title="Advanced OpenArt Prompt Optimizer"
        />
        <AdvancedModeToggle onClick={() => setUseAdvancedUI(false)}>
          Switch to Basic UI
        </AdvancedModeToggle>
      </>
    );
  }

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
      
      <AdvancedModeToggle onClick={() => setUseAdvancedUI(true)}>
        Switch to Advanced UI
      </AdvancedModeToggle>
    </AppContainer>
  );
}

export default App;