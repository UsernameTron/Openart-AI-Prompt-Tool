// Serverless function for prompt optimization
// This can be extended with more complex NLP in the future if needed

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    const { input, modelType = "flux" } = data;
    
    if (!input) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Input is required" })
      };
    }
    
    // Extract elements from the input
    const elements = analyzeInput(input);
    
    // Generate optimized prompts
    const optimizedPrompt = optimizePrompt(input, modelType, elements);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        originalInput: input,
        modelType,
        optimizedPrompt,
        analysis: elements
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error processing prompt", details: error.message })
    };
  }
};

// Simple implementation of the prompt optimizer for the serverless function
// This duplicates the client-side logic as a fallback

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
  landscape: ["mountain", "landscape", "sunset", "nature", "forest", "lake", "ocean", "sky"],
  portrait: ["portrait", "person", "woman", "man", "girl", "boy", "face", "character"],
  concept: ["abstract", "concept", "surreal", "dream", "fantasy"]
};

// Analyzes input text to extract key elements
function analyzeInput(input) {
  const text = input.toLowerCase();
  const subjects = [];
  const attributes = [];
  const style = [];
  const technical = [];
  let sceneType = "concept"; // Default scene type
  
  // Simple detection of scene type
  for (const [type, keywords] of Object.entries(SCENE_TYPE_KEYWORDS)) {
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        sceneType = type;
        if (keyword !== type) {
          subjects.push(keyword);
        }
        break;
      }
    }
    if (sceneType !== "concept") break;
  }
  
  // Very simplified subject and attribute extraction
  const words = text.split(/\s+/);
  const commonAdjectives = ["beautiful", "gorgeous", "stunning", "vibrant", "colorful", "dark", "bright"];
  
  words.forEach(word => {
    if (commonAdjectives.includes(word) && !attributes.includes(word)) {
      attributes.push(word);
    }
  });
  
  // Simple style detection
  if (text.includes("style of") || text.includes("in the style")) {
    const styleMatch = text.match(/(?:in the |in |)style of (\w+)/i);
    if (styleMatch && styleMatch[1]) {
      style.push(styleMatch[1]);
    }
  }
  
  // Simple technical aspect detection
  const techTerms = ["8k", "4k", "hdr", "resolution", "high quality", "detailed"];
  techTerms.forEach(term => {
    if (text.includes(term) && !technical.includes(term)) {
      technical.push(term);
    }
  });
  
  return {
    subjects,
    attributes,
    style,
    technical,
    sceneType
  };
}

// Creates an optimized prompt based on model type
function optimizePrompt(input, modelType, elements) {
  const { subjects, attributes, style, technical, sceneType } = elements;
  const parts = [];
  
  if (modelType === "flux") {
    // Add scene type prefix
    if (sceneType === "portrait") {
      parts.push("Hyperrealistic portrait");
    } else if (sceneType === "landscape") {
      parts.push("Hyperrealistic landscape");
    } else {
      parts.push("Hyperrealistic");
    }
    
    // Add attributes and subjects
    if (attributes.length > 0) parts.push(attributes.join(" "));
    if (subjects.length > 0) parts.push(subjects.join(" "));
    
    // Add style references
    if (style.length > 0) parts.push(`in the style of ${style.join(", ")}`);
    
    // Add technical aspects and enhancements
    parts.push(...MODEL_ENHANCEMENTS.flux, ...MAGIC_WORDS.flux);
  } 
  else if (modelType === "sdxl") {
    // Add attributes and subjects
    if (attributes.length > 0 && subjects.length > 0) {
      parts.push(`${attributes.join(" ")} ${subjects.join(" ")}`);
    } else if (subjects.length > 0) {
      parts.push(subjects.join(" "));
    } else {
      parts.push(input);
    }
    
    // Add style references
    if (style.length > 0) parts.push(`style of ${style.join(", ")}`);
    
    // Add technical aspects and enhancements (limited)
    parts.push(...technical.slice(0, 2), ...MODEL_ENHANCEMENTS.sdxl.slice(0, 2), ...MAGIC_WORDS.sdxl);
  }
  else if (modelType === "sd15") {
    // Add style references first
    if (style.length > 0) parts.push(`In the style of ${style.join(", ")}`);
    
    // Add attributes and subjects
    if (attributes.length > 0 && subjects.length > 0) {
      parts.push(`${attributes.join(" ")} ${subjects.join(" ")}`);
    } else if (subjects.length > 0) {
      parts.push(subjects.join(" "));
    } else {
      parts.push(input);
    }
    
    // Add technical aspects and enhancements
    parts.push(...technical, ...MODEL_ENHANCEMENTS.sd15, ...MAGIC_WORDS.sd15);
  }
  
  return parts.join(", ");
}