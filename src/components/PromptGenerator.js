import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { optimizePrompt, analyzeInput } from '../utils/promptOptimizer';
import { examplePrompts } from '../utils/examples';

const GeneratorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputSection = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const OutputSection = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
  font-size: 16px;
  margin-bottom: 15px;
  
  &:focus {
    outline: none;
    border-color: #4a86e8;
    box-shadow: 0 0 0 2px rgba(74, 134, 232, 0.2);
  }
`;

const InputControls = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ModelSelector = styled.div`
  display: flex;
  align-items: center;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 10px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  background: ${props => props.checked ? 'rgba(74, 134, 232, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.checked ? '#4a86e8' : '#ddd'};
  transition: all 0.2s;
  
  &:hover {
    background: rgba(74, 134, 232, 0.05);
  }
  
  input {
    width: auto;
    margin: 0;
  }
  
  span {
    font-size: 14px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background: ${props => props.primary ? '#4a86e8' : '#f8f9fa'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: 1px solid ${props => props.primary ? '#4a86e8' : '#ddd'};
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.primary ? '#3b78e7' : '#f0f0f0'};
  }
  
  &:disabled {
    background: #f0f0f0;
    color: #999;
    border-color: #ddd;
    cursor: not-allowed;
  }
`;

const ResultBox = styled.div`
  position: relative;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  margin-top: 5px;
  margin-bottom: 20px;
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-word;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: ${props => props.copied ? '#28a745' : 'rgba(0, 0, 0, 0.05)'};
  color: ${props => props.copied ? 'white' : '#555'};
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.copied ? '#28a745' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const Label = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
`;

const AnalysisSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
`;

const AnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

const AnalysisCard = styled.div`
  background: #f8f9fa;
  border-radius: 4px;
  padding: 15px;
  border-left: 4px solid #4a86e8;
  
  h4 {
    margin: 0 0 10px 0;
    font-size: 14px;
    color: #555;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: #333;
    word-break: break-word;
  }
`;

function PromptGenerator() {
  const [input, setInput] = useState('');
  const [model, setModel] = useState('flux');
  const [results, setResults] = useState({
    flux: '',
    sdxl: '',
    sd15: ''
  });
  const [analysis, setAnalysis] = useState(null);
  const [copied, setCopied] = useState({
    flux: false,
    sdxl: false,
    sd15: false
  });
  
  // Reset copied state after 2 seconds
  useEffect(() => {
    const timers = Object.keys(copied).map(key => {
      if (copied[key]) {
        return setTimeout(() => {
          setCopied(prev => ({ ...prev, [key]: false }));
        }, 2000);
      }
      return null;
    }).filter(Boolean);
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [copied]);
  
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  const handleModelChange = (e) => {
    setModel(e.target.value);
  };
  
  const handleLoadExample = () => {
    const randomExample = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    setInput(randomExample);
  };
  
  const handleClear = () => {
    setInput('');
    setResults({
      flux: '',
      sdxl: '',
      sd15: ''
    });
    setAnalysis(null);
  };
  
  const handleOptimize = () => {
    if (!input.trim()) return;
    
    // Analyze input
    const analysisResult = analyzeInput(input);
    setAnalysis(analysisResult);
    
    // Generate optimized prompts for all models
    const optimizedFlux = optimizePrompt(input, 'flux', analysisResult);
    const optimizedSdxl = optimizePrompt(input, 'sdxl', analysisResult);
    const optimizedSd15 = optimizePrompt(input, 'sd15', analysisResult);
    
    setResults({
      flux: optimizedFlux,
      sdxl: optimizedSdxl,
      sd15: optimizedSd15
    });
  };
  
  const handleCopy = (modelType) => {
    setCopied(prev => ({ ...prev, [modelType]: true }));
  };
  
  return (
    <GeneratorContainer>
      <InputSection>
        <h2>Your Description</h2>
        <p>Enter your natural language description below to optimize it for AI image generation.</p>
        
        <TextArea
          value={input}
          onChange={handleInputChange}
          placeholder="Example: A beautiful mountain landscape with a lake at sunset"
        />
        
        <InputControls>
          <ModelSelector>
            <span>Optimize for:</span>
            <RadioGroup>
              <RadioLabel checked={model === 'flux'}>
                <input
                  type="radio"
                  name="model"
                  value="flux"
                  checked={model === 'flux'}
                  onChange={handleModelChange}
                />
                <span>Flux</span>
              </RadioLabel>
              
              <RadioLabel checked={model === 'sdxl'}>
                <input
                  type="radio"
                  name="model"
                  value="sdxl"
                  checked={model === 'sdxl'}
                  onChange={handleModelChange}
                />
                <span>SDXL</span>
              </RadioLabel>
              
              <RadioLabel checked={model === 'sd15'}>
                <input
                  type="radio"
                  name="model"
                  value="sd15"
                  checked={model === 'sd15'}
                  onChange={handleModelChange}
                />
                <span>SD1.5</span>
              </RadioLabel>
            </RadioGroup>
          </ModelSelector>
          
          <ButtonRow>
            <Button onClick={handleLoadExample}>Load Example</Button>
            <Button onClick={handleClear}>Clear</Button>
            <Button primary onClick={handleOptimize} disabled={!input.trim()}>
              Generate Optimized Prompt
            </Button>
          </ButtonRow>
        </InputControls>
      </InputSection>
      
      {results[model] && (
        <OutputSection>
          <h2>Optimized Prompts</h2>
          
          <Label>Flux Model</Label>
          <ResultBox>
            {results.flux}
            <CopyToClipboard text={results.flux} onCopy={() => handleCopy('flux')}>
              <CopyButton copied={copied.flux}>
                {copied.flux ? 'Copied!' : 'Copy'}
              </CopyButton>
            </CopyToClipboard>
          </ResultBox>
          
          <Label>SDXL Model</Label>
          <ResultBox>
            {results.sdxl}
            <CopyToClipboard text={results.sdxl} onCopy={() => handleCopy('sdxl')}>
              <CopyButton copied={copied.sdxl}>
                {copied.sdxl ? 'Copied!' : 'Copy'}
              </CopyButton>
            </CopyToClipboard>
          </ResultBox>
          
          <Label>SD1.5 Model</Label>
          <ResultBox>
            {results.sd15}
            <CopyToClipboard text={results.sd15} onCopy={() => handleCopy('sd15')}>
              <CopyButton copied={copied.sd15}>
                {copied.sd15 ? 'Copied!' : 'Copy'}
              </CopyButton>
            </CopyToClipboard>
          </ResultBox>
          
          {analysis && (
            <AnalysisSection>
              <h3>Prompt Analysis</h3>
              <p>Here's what we detected in your description:</p>
              
              <AnalysisGrid>
                <AnalysisCard>
                  <h4>Scene Type</h4>
                  <p>{analysis.sceneType}</p>
                </AnalysisCard>
                
                {analysis.subjects.length > 0 && (
                  <AnalysisCard>
                    <h4>Subjects</h4>
                    <p>{analysis.subjects.join(', ')}</p>
                  </AnalysisCard>
                )}
                
                {analysis.attributes.length > 0 && (
                  <AnalysisCard>
                    <h4>Attributes</h4>
                    <p>{analysis.attributes.join(', ')}</p>
                  </AnalysisCard>
                )}
                
                {analysis.style.length > 0 && (
                  <AnalysisCard>
                    <h4>Style References</h4>
                    <p>{analysis.style.join(', ')}</p>
                  </AnalysisCard>
                )}
                
                {analysis.technical.length > 0 && (
                  <AnalysisCard>
                    <h4>Technical Aspects</h4>
                    <p>{analysis.technical.join(', ')}</p>
                  </AnalysisCard>
                )}
              </AnalysisGrid>
            </AnalysisSection>
          )}
        </OutputSection>
      )}
    </GeneratorContainer>
  );
}

export default PromptGenerator;