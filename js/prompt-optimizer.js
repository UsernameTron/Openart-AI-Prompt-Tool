// OpenArt AI Prompt Optimizer - Core Logic

// Main PromptOptimizer class to handle prompt generation
class PromptOptimizer {
  constructor() {
    // Initialize with the data imported from modifiers-data.js
    this.modifiers = promptModifiers;
    this.modelStrategies = modelStrategies;
    this.templates = promptTemplates;
    this.magicWords = magicWords;
    this.selectedModifiers = [];
  }

  // Add a modifier to the selected list
  addModifier(modifier) {
    if (!this.selectedModifiers.includes(modifier)) {
      this.selectedModifiers.push(modifier);
      return true;
    }
    return false;
  }

  // Remove a modifier from the selected list
  removeModifier(modifier) {
    const index = this.selectedModifiers.indexOf(modifier);
    if (index > -1) {
      this.selectedModifiers.splice(index, 1);
      return true;
    }
    return false;
  }

  // Clear all selected modifiers
  clearModifiers() {
    this.selectedModifiers = [];
  }

  // Count approximate tokens in a prompt
  countTokens(prompt) {
    // Simple approximation: split by spaces and punctuation
    return prompt.split(/[\s,]+/).filter(word => word.length > 0).length;
  }

  // Process natural language input
  processInput(input) {
    // Basic cleaning and normalization
    return input.trim()
      .replace(/\s+/g, ' ')
      .replace(/^\w/, c => c.toUpperCase());
  }

  // Optimize for Flux model
  optimizeFlux(input) {
    let prompt = this.processInput(input);
    
    // Add modifiers with proper spacing and commas
    if (this.selectedModifiers.length > 0) {
      prompt += ', ' + this.selectedModifiers.join(', ');
    }
    
    // Add some default quality terms if none are present
    if (!this.hasQualityTerms(prompt)) {
      prompt += ', high quality, detailed';
    }
    
    return prompt;
  }

  // Optimize for SDXL model (with 75 token limit)
  optimizeSDXL(input) {
    let prompt = this.processInput(input);
    let components = [prompt];
    
    // Add selected modifiers
    if (this.selectedModifiers.length > 0) {
      components = components.concat(this.selectedModifiers);
    }
    
    // Add some default quality terms if none are present
    if (!this.hasQualityTerms(prompt)) {
      components.push('high quality');
      components.push('masterpiece');
    }
    
    // Join all parts
    let finalPrompt = components.join(', ');
    
    // Check token count and truncate if needed
    if (this.countTokens(finalPrompt) > 75) {
      // Get tokens
      const tokens = finalPrompt.split(/[\s,]+/).filter(token => token.length > 0);
      // Keep first 70 tokens and add quality terms at the end
      finalPrompt = tokens.slice(0, 70).join(' ') + ', best quality';
    }
    
    return finalPrompt;
  }

  // Optimize for SD1.5 model
  optimizeSD15(input) {
    // For SD1.5, structure is important
    const processedInput = this.processInput(input);
    
    // Check if input is a detailed scene description or just a subject
    const isDetailedScene = processedInput.split(' ').length > 4;
    
    let components = [];
    
    // If it's a simple subject, add a medium
    if (!isDetailedScene && !this.hasPhotographyTerms(processedInput)) {
      components.push(`Photograph of ${processedInput}`);
    } else {
      components.push(processedInput);
    }
    
    // Add selected modifiers
    if (this.selectedModifiers.length > 0) {
      components = components.concat(this.selectedModifiers);
    }
    
    // Add some SD1.5 magic words if not already present
    if (!this.hasQualityTerms(components.join(', '))) {
      components.push('detailed');
      components.push('masterpiece');
      components.push('best quality');
    }
    
    return components.join(', ');
  }

  // Helper to check if quality terms are present
  hasQualityTerms(prompt) {
    const qualityTerms = this.magicWords.quality;
    return qualityTerms.some(term => prompt.toLowerCase().includes(term.toLowerCase()));
  }

  // Helper to check if photography terms are present
  hasPhotographyTerms(prompt) {
    const photoTerms = this.magicWords.photography;
    return photoTerms.some(term => prompt.toLowerCase().includes(term.toLowerCase()));
  }

  // Optimize a prompt for a specific model
  optimizePrompt(input, model = 'flux') {
    switch (model.toLowerCase()) {
      case 'sdxl':
        return this.optimizeSDXL(input);
      case 'sd15':
        return this.optimizeSD15(input);
      case 'flux':
      default:
        return this.optimizeFlux(input);
    }
  }

  // Generate optimized prompts for all models
  generateAllPrompts(input) {
    return {
      flux: this.optimizeFlux(input),
      sdxl: this.optimizeSDXL(input),
      sd15: this.optimizeSD15(input)
    };
  }

  // Get examples for different types of descriptions
  getExamples() {
    return {
      portrait: "A young woman with long curly hair in a red dress standing in a garden",
      landscape: "Mountain lake at sunset with trees and reflections on the water",
      concept: "Cyberpunk city street at night with neon signs and flying cars",
      character: "Wizard with a long beard, wearing purple robes and holding a magical staff",
      object: "Antique pocket watch with intricate engravings and exposed gears",
      abstract: "Flowing organic shapes in shades of blue and green, resembling underwater creatures"
    };
  }
}

// Make the PromptOptimizer class available globally
window.PromptOptimizer = PromptOptimizer;

// Initialize the AdvancedPromptOptimizer directly here
const optimizer = new PromptOptimizer();
window.AdvancedPromptOptimizer = {
  // Core optimization functions
  optimizeFlux: function(input) {
    return optimizer.optimizeFlux(input);
  },
  optimizeSDXL: function(input) {
    return optimizer.optimizeSDXL(input);
  },
  optimizeSd15: function(input) {
    return optimizer.optimizeSD15(input);
  },
  // Helper for React app
  optimizeAll: function(input) {
    return {
      flux: optimizer.optimizeFlux(input),
      sdxl: optimizer.optimizeSDXL(input),
      sd15: optimizer.optimizeSD15(input)
    };
  }
};

console.log("✅ OpenArt Optimizer core loaded and ready");