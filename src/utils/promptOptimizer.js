// Import data from the advanced optimizer if available
const modelStrategies = window.modelStrategies || {
  flux: {
    name: "Flux",
    description: "Best for photorealistic images",
    color: "indigo",
    qualityTerms: {
      basic: ["high quality", "detailed"],
      high: ["high quality", "detailed", "hyperrealistic", "8K resolution"],
      ultra: ["hyperrealistic", "8K resolution", "HDR", "detailed textures", "professional", "detailed", "high quality"]
    },
    styleTerms: {
      photography: "professional photography, studio lighting",
      painting: "detailed painting, professional lighting",
      "digital-art": "digital art, detailed rendering",
      illustration: "detailed illustration, professional lighting",
      "3d-render": "3D render, ray tracing, octane render"
    },
    artistTerms: {
      general: "professional artist",
      modern: "by modern artist, contemporary style",
      classic: "by classical artist, traditional style"
    },
    tokenLimit: null,
    tips: [
      "Word order matters, most important details first",
      "Include technical specifications (resolution, lighting)",
      "Artist references work well",
      "Detail-heavy descriptions produce better results"
    ]
  },
  sdxl: {
    name: "SDXL",
    description: "Balanced between realism and creativity",
    color: "purple",
    qualityTerms: {
      basic: ["high quality"],
      high: ["high quality", "detailed", "masterpiece"],
      ultra: ["masterpiece", "best quality", "highly detailed"]
    },
    styleTerms: {
      photography: "photography",
      painting: "painting",
      "digital-art": "digital art",
      illustration: "illustration",
      "3d-render": "3D render"
    },
    artistTerms: {
      general: "artistic",
      modern: "contemporary style",
      classic: "classical style"
    },
    tokenLimit: 75,
    tips: [
      "75 token limit (words and phrases)",
      "Use simple English, not complex descriptions",
      "Include spatial descriptions",
      "Quality terms matter (masterpiece, best quality)"
    ]
  },
  sd15: {
    name: "SD1.5",
    description: "Good for stylistic and artistic outputs",
    color: "green",
    qualityTerms: {
      basic: ["detailed"],
      high: ["detailed", "masterpiece"],
      ultra: ["masterpiece", "best quality", "highly detailed"]
    },
    styleTerms: {
      photography: "35mm photography, cinematic, professional photography",
      painting: "oil painting, professional, detailed brushwork",
      "digital-art": "digital art, trending on artstation",
      illustration: "professional illustration, detailed",
      "3d-render": "3D render, octane render, ray tracing"
    },
    artistTerms: {
      general: "artistic style",
      modern: "modern art style",
      classic: "classical art style"
    },
    tokenLimit: null,
    tips: [
      "Be specific about style and medium",
      "Technical photography terms work well",
      "Include \"magic words\" (masterpiece, detailed, etc.)",
      "Benefits from precise description language"
    ]
  }
};

const magicWords = window.magicWords || {
  quality: [
    "masterpiece", "best quality", "highly detailed", "professional", 
    "sharp focus", "intricate", "beautiful", "high definition"
  ],
  photography: [
    "cinematic", "35mm film", "bokeh", "dof", "film grain", "golden hour", 
    "sharp focus", "dramatic lighting"
  ],
  artistic: [
    "trending on artstation", "digital painting", "concept art", "smooth", 
    "detailed", "illustration", "matte painting"
  ]
};

// Constants for the optimizer (fallback)
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
  
  // For Flux, we want to start with the processed input to preserve important details
  if (subjects.length === 0 && attributes.length === 0) {
    // If no subjects or attributes were extracted, use original input
    parts.push(originalInput);
  } else {
    // Start with scene type specific structure
    if (sceneType === "portrait") {
      if (attributes.length > 0) {
        parts.push(`Portrait of ${attributes.join(" ")} ${subjects.join(" ")}`);
      } else {
        parts.push(`Portrait of ${subjects.join(" ")}`);
      }
    } else if (sceneType === "landscape") {
      if (attributes.length > 0) {
        parts.push(`${attributes.join(" ")} landscape of ${subjects.join(" ")}`);
      } else {
        parts.push(`Landscape of ${subjects.join(" ")}`);
      }
    } else {
      // For other types, combine attributes and subjects
      if (attributes.length > 0 && subjects.length > 0) {
        parts.push(`${attributes.join(" ")} ${subjects.join(" ")}`);
      } else if (subjects.length > 0) {
        parts.push(subjects.join(" "));
      } else if (attributes.length > 0) {
        parts.push(attributes.join(" "));
      }
    }
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
  
  // For Flux model, add professional photography terms if not already present
  if (!partsContain(parts, "photography") && !partsContain(parts, "photograph")) {
    if (modelStrategies.flux.styleTerms && modelStrategies.flux.styleTerms.photography) {
      parts.push(modelStrategies.flux.styleTerms.photography);
    }
  }
  
  // Add quality terms - use advanced settings if available
  let qualityTerms = [];
  if (modelStrategies.flux.qualityTerms && modelStrategies.flux.qualityTerms.high) {
    qualityTerms = modelStrategies.flux.qualityTerms.high;
  } else {
    qualityTerms = MAGIC_WORDS.flux;
  }
  
  // Add quality terms
  qualityTerms.forEach(word => {
    if (!partsContain(parts, word)) {
      parts.push(word);
    }
  });
  
  // Count tokens for information (for debugging)
  const tokens = parts.join(", ").split(/\s+/).length;
  console.log(`Flux prompt tokens: ${tokens}`);
  
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
  
  // For SDXL, we need to be very token-aware (75 token limit)
  // Structure based on scene type
  if (subjects.length === 0 && attributes.length === 0) {
    // If no analysis was possible, use original input but keep it brief
    const simpleInput = originalInput.split(' ').slice(0, 20).join(' ');
    parts.push(simpleInput);
  } else {
    // Scene-type specific phrasing (concise for SDXL)
    if (sceneType === "portrait") {
      if (attributes.length > 0) {
        // Use only the most important attributes to save tokens
        const coreAttributes = attributes.slice(0, 2);
        parts.push(`${coreAttributes.join(" ")} portrait of ${subjects.join(" ")}`);
      } else {
        parts.push(`Portrait of ${subjects.join(" ")}`);
      }
    } else if (sceneType === "landscape") {
      if (attributes.length > 0) {
        // Use only the most important attributes to save tokens
        const coreAttributes = attributes.slice(0, 2);
        parts.push(`${coreAttributes.join(" ")} landscape with ${subjects.join(" ")}`);
      } else {
        parts.push(`Landscape with ${subjects.join(" ")}`);
      }
    } else {
      // For other types, be concise
      if (attributes.length > 0 && subjects.length > 0) {
        // Use only the most important attributes and subjects to save tokens
        const coreAttributes = attributes.slice(0, 2);
        const coreSubjects = subjects.slice(0, 2);
        parts.push(`${coreAttributes.join(" ")} ${coreSubjects.join(" ")}`);
      } else if (subjects.length > 0) {
        parts.push(subjects.slice(0, 3).join(" "));
      } else if (attributes.length > 0) {
        parts.push(attributes.slice(0, 3).join(" "));
      }
    }
  }
  
  // Add style more concisely (SDXL responds well to shorter style descriptions)
  if (style.length > 0) {
    parts.push(`style of ${style.slice(0, 1).join(", ")}`);
  }
  
  // Add only the most important technical aspects (limited to save tokens)
  if (technical.length > 0) {
    parts.push(...technical.slice(0, 1));
  }
  
  // Add quality terms - use advanced settings if available
  let qualityTerms = [];
  if (modelStrategies.sdxl.qualityTerms && modelStrategies.sdxl.qualityTerms.basic) {
    qualityTerms = modelStrategies.sdxl.qualityTerms.basic;
  } else {
    qualityTerms = MAGIC_WORDS.sdxl.slice(0, 2); // Only use a couple to save tokens
  }
  
  // Add quality terms
  qualityTerms.forEach(word => {
    if (!partsContain(parts, word)) {
      parts.push(word);
    }
  });
  
  // SDXL really needs "masterpiece" to get good results
  if (!partsContain(parts, "masterpiece")) {
    parts.push("masterpiece");
  }
  
  // Join and then ensure we're under the 75 token limit
  let result = parts.join(", ");
  const tokens = result.split(/\s+/);
  console.log(`SDXL prompt tokens: ${tokens.length}`);
  
  if (tokens.length > 75) {
    // If too long, preserve the most important part (beginning) and add quality terms at the end
    const truncatedTokens = tokens.slice(0, 70);
    // Add essential quality terms at the end if not already there
    if (!truncatedTokens.includes("masterpiece")) {
      truncatedTokens.push("masterpiece");
    }
    if (!truncatedTokens.includes("best") && !truncatedTokens.includes("quality")) {
      truncatedTokens.push("best quality");
    }
    result = truncatedTokens.join(" ");
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
  
  // SD1.5 often works better with style references first (SD1.5 specific technique)
  if (style.length > 0) {
    parts.push(`In the style of ${style.join(", ")}`);
  } else {
    // If no specific style, specify a medium since SD1.5 works better with this
    if (sceneType === "portrait" || sceneType === "landscape") {
      parts.push("35mm photograph");
    } else {
      parts.push("detailed artwork");
    }
  }
  
  // Structure based on scene type
  if (sceneType === "portrait") {
    if (attributes.length > 0) {
      parts.push(`Portrait of ${attributes.join(" ")} ${subjects.join(" ")}`);
    } else {
      parts.push(`Portrait of ${subjects.join(" ")}`);
    }
  } 
  // For landscape scene type - SD1.5 does well with specific photography terms
  else if (sceneType === "landscape") {
    if (attributes.length > 0) {
      parts.push(`Landscape photograph of ${subjects.join(" ")}, ${attributes.join(" ")}`);
    } else {
      parts.push(`Landscape photograph of ${subjects.join(" ")}`);
    }
  }
  // For other scene types or if no subjects/attributes were extracted
  else if (subjects.length === 0 && attributes.length === 0) {
    parts.push(originalInput);
  } else {
    if (attributes.length > 0 && subjects.length > 0) {
      parts.push(`${attributes.join(" ")} ${subjects.join(" ")}`);
    } else if (subjects.length > 0) {
      parts.push(subjects.join(" "));
    } else if (attributes.length > 0) {
      parts.push(attributes.join(" "));
    }
  }
  
  // Add technical aspects - SD1.5 benefits from these
  technical.forEach(tech => {
    if (!partsContain(parts, tech)) {
      parts.push(tech);
    }
  });
  
  // Add SD1.5 specific style terms from our enhanced data if available
  if (modelStrategies.sd15.styleTerms) {
    // Choose appropriate style terms based on the scene type
    if (sceneType === "portrait" && modelStrategies.sd15.styleTerms.photography) {
      const styleTerm = modelStrategies.sd15.styleTerms.photography;
      if (!partsContain(parts, styleTerm)) {
        parts.push(styleTerm);
      }
    } else if (sceneType === "landscape" && modelStrategies.sd15.styleTerms.photography) {
      const styleTerm = modelStrategies.sd15.styleTerms.photography;
      if (!partsContain(parts, styleTerm)) {
        parts.push(styleTerm);
      }
    }
  } else {
    // Fallback to basic enhancements
    MODEL_ENHANCEMENTS.sd15.forEach(enhancement => {
      if (!partsContain(parts, enhancement)) {
        parts.push(enhancement);
      }
    });
  }
  
  // Add quality terms - use advanced settings if available
  let qualityTerms = [];
  if (modelStrategies.sd15.qualityTerms && modelStrategies.sd15.qualityTerms.high) {
    qualityTerms = modelStrategies.sd15.qualityTerms.high;
  } else {
    qualityTerms = MAGIC_WORDS.sd15;
  }
  
  // SD1.5 NEEDS these magic words to perform well
  qualityTerms.forEach(word => {
    if (!partsContain(parts, word)) {
      parts.push(word);
    }
  });
  
  // Always add these critical SD1.5 magic words
  if (!partsContain(parts, "masterpiece")) {
    parts.push("masterpiece");
  }
  
  if (!partsContain(parts, "best quality")) {
    parts.push("best quality");
  }
  
  // Count tokens for information
  const tokens = parts.join(", ").split(/\s+/).length;
  console.log(`SD1.5 prompt tokens: ${tokens}`);
  
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