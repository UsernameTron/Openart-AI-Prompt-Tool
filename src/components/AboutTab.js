import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Section = styled.section`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  h2 {
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  h3 {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  p {
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  ul, ol {
    margin-bottom: 15px;
    padding-left: 20px;
    
    li {
      margin-bottom: 8px;
    }
  }
`;

const ModelInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ModelCard = styled.div`
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 15px;
  background: #f9f9f9;
  
  h4 {
    color: #4a86e8;
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  ul {
    margin-bottom: 0;
  }
`;

const ExampleBox = styled.div`
  background: #f5f7fa;
  border-left: 4px solid #4a86e8;
  padding: 15px;
  margin: 15px 0;
  
  pre {
    margin: 0;
    white-space: pre-wrap;
    font-family: monospace;
  }
`;

function AboutTab() {
  return (
    <AboutContainer>
      <Section>
        <h2>About OpenArt AI Prompt Optimizer</h2>
        <p>
          The OpenArt AI Prompt Optimizer is a tool designed to transform natural language descriptions 
          into optimized prompts for AI image generation models. It analyzes your input and applies 
          model-specific optimization strategies to create prompts that work better with OpenArt AI's 
          image generation models.
        </p>
        <p>
          This tool is designed to help both beginners and experienced users create more effective 
          prompts without needing to learn all the specific techniques and "magic words" that each 
          model responds to.
        </p>
      </Section>
      
      <Section>
        <h2>How to Use</h2>
        <ol>
          <li>Enter your description in the text area on the Prompt Optimizer tab</li>
          <li>Select which AI model you want to optimize for (Flux, SDXL, or SD1.5)</li>
          <li>Click "Generate Optimized Prompt"</li>
          <li>Copy the optimized prompt</li>
          <li>Paste it into OpenArt AI or your preferred AI image generation tool</li>
        </ol>
        
        <h3>Example</h3>
        <p>Input description:</p>
        <ExampleBox>
          <pre>A beautiful mountain landscape with a lake at sunset</pre>
        </ExampleBox>
        
        <p>Optimized prompt for Flux:</p>
        <ExampleBox>
          <pre>Hyperrealistic landscape, beautiful mountain lake sunset, studio lighting, 8K resolution, HDR, detailed textures, professional photography, detailed, high quality, hyperrealistic</pre>
        </ExampleBox>
      </Section>
      
      <Section>
        <h2>Model-Specific Optimization</h2>
        <p>
          Each AI model has different strengths and responds differently to prompts.
          Our optimizer tailors the output specifically for each model:
        </p>
        
        <ModelInfoGrid>
          <ModelCard>
            <h4>Flux Models</h4>
            <ul>
              <li>Prioritizes keywords at the beginning</li>
              <li>Includes technical specifications (8K resolution, etc.)</li>
              <li>Supports artist reference combinations</li>
              <li>Adds "hyperrealistic" and other quality terms</li>
            </ul>
          </ModelCard>
          
          <ModelCard>
            <h4>SDXL Models</h4>
            <ul>
              <li>Keeps prompts under 75 tokens</li>
              <li>Uses simplified English</li>
              <li>Includes relative spatial descriptions</li>
              <li>Emphasizes aesthetic terms</li>
            </ul>
          </ModelCard>
          
          <ModelCard>
            <h4>SD1.5 Models</h4>
            <ul>
              <li>Focuses on style specificity</li>
              <li>Includes technical photography terminology</li>
              <li>Adds "magic words" for better results</li>
              <li>Emphasizes emotional/mood keywords</li>
            </ul>
          </ModelCard>
        </ModelInfoGrid>
      </Section>
      
      <Section>
        <h2>Tips for Better Results</h2>
        <ul>
          <li><strong>Be specific</strong> about what you want to see in the image</li>
          <li>Include <strong>style references</strong> (e.g., "in the style of Monet")</li>
          <li>Mention <strong>lighting conditions</strong> for more dramatic effects</li>
          <li>Specify <strong>camera angles</strong> or <strong>perspectives</strong> for more control</li>
          <li>For portraits, describe <strong>facial expressions</strong> and <strong>emotions</strong></li>
          <li>For landscapes, include details about <strong>weather</strong> and <strong>time of day</strong></li>
        </ul>
      </Section>
      
      <Section>
        <h2>About OpenArt AI</h2>
        <p>
          <a href="https://openart.ai" target="_blank" rel="noopener noreferrer">OpenArt AI</a> is a platform 
          for AI-generated art that offers various models for creating unique images from text prompts.
          This prompt optimizer is designed to work well with OpenArt AI's models, but can also be useful 
          for other AI image generation platforms.
        </p>
      </Section>
    </AboutContainer>
  );
}

export default AboutTab;