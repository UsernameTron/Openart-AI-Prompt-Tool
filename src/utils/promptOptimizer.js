// Constants for the optimizer
const MODEL_ENHANCEMENTS = {
  flux: ["studio lighting", "8K resolution", "HDR", "detailed textures", "professional photography"],
  sdxl: ["high quality", "detailed", "intricate", "volumetric lighting", "smooth"],
  sd15: ["detailed", "highly detailed", "35mm photography", "cinematic", "professional"]
};

const MAGIC_WORDS = {
  flux: ["detailed", "high quality", "hyperrealistic"],
  sdxl: ["masterpiece", "highly detailed", "best quality"],
  sd15: ["masterpiece", "best quality", "highly detailed"]
};

// Scene type detection patterns
const SCENE_TYPE_KEYWORDS = {
  landscape: ["mountain", "landscape", "sunset", "nature", "forest", "lake", "ocean", "sky", "beach", "waterfall", "desert", "valley", "field", "garden", "river"],
  portrait: ["portrait", "person", "woman", "man", "girl", "boy", "face", "character", "people", "figure", "model", "actor", "actress", "player", "individual"],
  concept: ["abstract", "concept", "surreal", "dream", "fantasy", "idea", "imagination", "thought", "vision", "impression", "feeling", "emotion", "mood"]
};

// Style detection patterns
const STYLE_PATTERNS = [
  // "in the style of X"
  { regex: /in (?:the )?style of (\w+\s?\w*)/gi, group: 1 },
  // "X-style"
  { regex: /(\w+)\s?style/gi, group: 1 },
  // "like X"
  { regex: /like (?:a|an|the)?\s?(?:painting|artwork|drawing|illustration|photo|picture|image)?\s?(?:by|from|of)?\s?(\w+\s?\w*)/gi, group: 1 },
  // "inspired by X"
  { regex: /inspired by (\w+\s?\w*)/gi, group: 1 },
  // common art styles
  { regex: /(impressionist|expressionist|cubist|surrealist|minimalist|baroque|renaissance|pop art|art deco|gothic|realistic|anime|manga|pixel art)/gi, group: 1 }
];

// Technical aspect keywords
const TECHNICAL_KEYWORDS = [
  "8K", "4K", "high resolution", "HDR", "detailed", "sharp", "studio lighting", "dramatic lighting", "soft lighting",
  "volumetric", "photorealistic", "hyperrealistic", "realistic", "cinematic", "professional", "high quality",
  "depth of field", "bokeh", "shallow focus", "wide angle", "telephoto", "macro", "fisheye", "panoramic"
];

/**
 * Analyzes input text to extract key elements for prompt construction
 * @param {string} input - User input description
 * @returns {Object} - Extracted elements
 */
export function analyzeInput(input) {
  // Normalize input
  const text = input.toLowerCase();
  const words = text.split(/\s+/);
  
  const subjects = [];
  const attributes = [];
  const style = [];
  const technical = [];
  let sceneType = "concept"; // Default scene type
  
  // Extract technical aspects
  TECHNICAL_KEYWORDS.forEach(keyword => {
    const lowerKeyword = keyword.toLowerCase();
    if (text.includes(lowerKeyword)) {
      technical.push(keyword);
    }
  });
  
  // Extract style references
  STYLE_PATTERNS.forEach(pattern => {
    const matches = [...text.matchAll(pattern.regex)];
    matches.forEach(match => {
      if (match[pattern.group]) {
        const styleRef = match[pattern.group].trim();
        if (styleRef && !style.includes(styleRef)) {
          style.push(styleRef);
        }
      }
    });
  });
  
  // Extract potential subjects and attributes (very simplified version)
  // This would be better with NLP, but we're keeping it simple for browser-based implementation
  const nouns = [];
  const adjectives = [];
  
  // Simple parts-of-speech patterns
  // Adjectives that commonly appear before nouns
  const commonAdjectives = ["beautiful", "gorgeous", "stunning", "vibrant", "colorful", "dark", "bright", "detailed", 
    "mysterious", "ethereal", "magical", "futuristic", "ancient", "modern", "vintage", "retro", "sleek", "rustic",
    "grand", "tiny", "massive", "miniature", "elaborate", "simple", "complex", "ornate", "elegant", "rough"];
    
  // Common nouns in art prompts
  const commonNouns = ["landscape", "portrait", "scene", "character", "woman", "man", "girl", "boy", "mountain", 
    "ocean", "sky", "forest", "city", "building", "castle", "house", "tree", "flower", "animal", "creature",
    "dragon", "cat", "dog", "bird", "fish", "robot", "spaceship", "car", "vehicle"];
  
  // Find adjectives and nouns
  words.forEach(word => {
    if (commonAdjectives.includes(word)) {
      adjectives.push(word);
    }
    if (commonNouns.includes(word)) {
      nouns.push(word);
    }
  });
  
  // Also look for simple noun phrases (adjective + noun)
  for (let i = 0; i < words.length - 1; i++) {
    if (commonAdjectives.includes(words[i]) && commonNouns.includes(words[i+1])) {
      if (!adjectives.includes(words[i])) adjectives.push(words[i]);
      if (!nouns.includes(words[i+1])) nouns.push(words[i+1]);
    }
  }
  
  // Add found nouns to subjects
  subjects.push(...nouns);
  
  // Add found adjectives to attributes
  attributes.push(...adjectives);
  
  // Determine scene type based on keywords
  for (const [type, keywords] of Object.entries(SCENE_TYPE_KEYWORDS)) {
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        sceneType = type;
        break;
      }
    }
    if (sceneType !== "concept") break; // Stop if we found a more specific type
  }
  
  // Remove duplicates and clean up
  const uniqueSubjects = [...new Set(subjects)];
  const uniqueAttributes = [...new Set(attributes)];
  const uniqueStyle = [...new Set(style)];
  const uniqueTechnical = [...new Set(technical)];
  
  return {
    subjects: uniqueSubjects,
    attributes: uniqueAttributes,
    style: uniqueStyle,
    technical: uniqueTechnical,
    sceneType: sceneType
  };
}

/**
 * Creates an optimized prompt based on the model type
 * @param {string} input - User input description
 * @param {string} modelType - One of 'flux', 'sdxl', or 'sd15'
 * @param {Object} elements - Optional pre-analyzed elements
 * @returns {string} - Optimized prompt
 */
export function optimizePrompt(input, modelType = "flux", elements = null) {
  // Analyze input if elements not provided
  const extractedElements = elements || analyzeInput(input);
  
  // Choose the appropriate optimization function based on model type
  switch (modelType.toLowerCase()) {
    case "sdxl":
      return createSdxlPrompt(extractedElements, input);
    case "sd15":
      return createSd15Prompt(extractedElements, input);
    case "flux":
    default:
      return createFluxPrompt(extractedElements, input);
  }
}

/**
 * Create a prompt optimized for Flux models
 * @param {Object} elements - Extracted elements 
 * @param {string} originalInput - Original user input
 * @returns {string} - Optimized prompt
 */
function createFluxPrompt(elements, originalInput) {
  const { subjects, attributes, style, technical, sceneType } = elements;
  const parts = [];
  
  // Start with scene type
  if (sceneType === "portrait") {
    parts.push("Hyperrealistic portrait");
  } else if (sceneType === "landscape") {
    parts.push("Hyperrealistic landscape");
  } else {
    parts.push("Hyperrealistic");
  }
  
  // Add attributes
  if (attributes.length > 0) {
    parts.push(attributes.join(" "));
  }
  
  // Add subjects
  if (subjects.length > 0) {
    parts.push(subjects.join(" "));
  } else if (subjects.length === 0 && attributes.length === 0) {
    // If no subjects or attributes were extracted, use original input
    parts.push(originalInput);
  }
  
  // Add style references
  if (style.length > 0) {
    parts.push(`in the style of ${style.join(", ")}`);
  }
  
  // Add technical aspects
  technical.forEach(tech => {
    if (!partsContain(parts, tech)) {
      parts.push(tech);
    }
  });
  
  // Add Flux-specific enhancements
  MODEL_ENHANCEMENTS.flux.forEach(enhancement => {
    if (!partsContain(parts, enhancement)) {
      parts.push(enhancement);
    }
  });
  
  // Add magic words
  MAGIC_WORDS.flux.forEach(word => {
    if (!partsContain(parts, word)) {
      parts.push(word);
    }
  });
  
  return parts.join(", ");
}

/**
 * Create a prompt optimized for SDXL models
 * @param {Object} elements - Extracted elements
 * @param {string} originalInput - Original user input 
 * @returns {string} - Optimized prompt
 */
function createSdxlPrompt(elements, originalInput) {
  const { subjects, attributes, style, technical, sceneType } = elements;
  const parts = [];
  
  // Add attributes and subjects
  if (attributes.length > 0 && subjects.length > 0) {
    parts.push(`${attributes.join(" ")} ${subjects.join(" ")}`);
  } else if (subjects.length > 0) {
    parts.push(subjects.join(" "));
  } else {
    // If no subjects were extracted, use original input
    parts.push(originalInput);
  }
  
  // Add style more concisely
  if (style.length > 0) {
    parts.push(`style of ${style.join(", ")}`);
  }
  
  // Add only the most important technical aspects (limited to save tokens)
  if (technical.length > 0) {
    parts.push(...technical.slice(0, 2));
  }
  
  // Add only essential SDXL enhancements
  const essentialEnhancements = MODEL_ENHANCEMENTS.sdxl.slice(0, 2);
  essentialEnhancements.forEach(enhancement => {
    if (!partsContain(parts, enhancement)) {
      parts.push(enhancement);
    }
  });
  
  // Add magic words
  MAGIC_WORDS.sdxl.forEach(word => {
    if (!partsContain(parts, word)) {
      parts.push(word);
    }
  });
  
  // Join and then truncate if too long (SDXL has 75 token limit)
  let result = parts.join(", ");
  const tokens = result.split(/\s+/);
  if (tokens.length > 75) {
    result = tokens.slice(0, 75).join(" ");
  }
  
  return result;
}

/**
 * Create a prompt optimized for SD1.5 Models
 * @param {Object} elements - Extracted elements
 * @param {string} originalInput - Original user input
 * @returns {string} - Optimized prompt
 */
function createSd15Prompt(elements, originalInput) {
  const { subjects, attributes, style, technical, sceneType } = elements;
  const parts = [];
  
  // SD1.5 often works better with style references first
  if (style.length > 0) {
    parts.push(`In the style of ${style.join(", ")}`);
  }
  
  // For portrait scene type
  if (sceneType === "portrait") {
    if (attributes.length > 0) {
      parts.push(`Portrait of ${attributes.join(" ")} ${subjects.join(" ")}`);
    } else {
      parts.push(`Portrait of ${subjects.join(" ")}`);
    }
  } 
  // For landscape scene type
  else if (sceneType === "landscape") {
    parts.push(`Landscape photograph of ${subjects.join(" ")}, ${attributes.join(" ")}`);
  }
  // For other scene types or if no subjects/attributes were extracted
  else if (subjects.length === 0 && attributes.length === 0) {
    parts.push(originalInput);
  } else {
    if (attributes.length > 0 && subjects.length > 0) {
      parts.push(`${attributes.join(" ")} ${subjects.join(" ")}`);
    } else if (subjects.length > 0) {
      parts.push(subjects.join(" "));
    }
  }
  
  // Add technical aspects
  technical.forEach(tech => {
    if (!partsContain(parts, tech)) {
      parts.push(tech);
    }
  });
  
  // Add SD1.5 specific photography terms
  MODEL_ENHANCEMENTS.sd15.forEach(enhancement => {
    if (!partsContain(parts, enhancement)) {
      parts.push(enhancement);
    }
  });
  
  // Add magic words
  MAGIC_WORDS.sd15.forEach(word => {
    if (!partsContain(parts, word)) {
      parts.push(word);
    }
  });
  
  return parts.join(", ");
}

/**
 * Helper function to check if any part contains the given text
 * @param {string[]} parts - Array of prompt parts
 * @param {string} text - Text to check for
 * @returns {boolean} - True if any part contains the text
 */
function partsContain(parts, text) {
  const lowerText = text.toLowerCase();
  return parts.some(part => part.toLowerCase().includes(lowerText));
}