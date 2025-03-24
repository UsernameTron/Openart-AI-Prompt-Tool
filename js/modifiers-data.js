// Image Prompt Modifiers Data
const promptModifiers = {
  // Style Modifiers
  style: {
    title: "Style Modifiers",
    categories: {
      artisticStyles: {
        title: "Artistic Styles",
        options: [
          { value: "impressionism", label: "Impressionism" },
          { value: "cubism", label: "Cubism" },
          { value: "cartoon", label: "Cartoon" },
          { value: "anime", label: "Anime" },
          { value: "abstract", label: "Abstract" },
          { value: "surrealism", label: "Surrealism" },
          { value: "expressionism", label: "Expressionism" },
          { value: "pop art", label: "Pop Art" }
        ]
      },
      artMovements: {
        title: "Art Movements",
        options: [
          { value: "art deco", label: "Art Deco" },
          { value: "steampunk", label: "Steampunk" },
          { value: "vaporwave", label: "Vaporwave" },
          { value: "art nouveau", label: "Art Nouveau" },
          { value: "bauhaus", label: "Bauhaus" },
          { value: "cyberpunk", label: "Cyberpunk" },
          { value: "minimalist", label: "Minimalist" }
        ]
      },
      artistInspirations: {
        title: "Artist Inspirations",
        options: [
          { value: "like Picasso", label: "Picasso" },
          { value: "like Monet", label: "Monet" },
          { value: "like Warhol", label: "Warhol" },
          { value: "like Van Gogh", label: "Van Gogh" },
          { value: "like Dali", label: "Dali" },
          { value: "like Banksy", label: "Banksy" },
          { value: "like Klimt", label: "Klimt" }
        ]
      },
      visualAesthetics: {
        title: "Visual Aesthetics",
        options: [
          { value: "retro", label: "Retro" },
          { value: "vintage", label: "Vintage" },
          { value: "modern", label: "Modern" },
          { value: "futuristic", label: "Futuristic" },
          { value: "fantasy", label: "Fantasy" },
          { value: "sci-fi", label: "Sci-Fi" },
          { value: "dystopian", label: "Dystopian" }
        ]
      }
    }
  },
  
  // Quality Modifiers
  quality: {
    title: "Quality Modifiers",
    categories: {
      resolutionTerms: {
        title: "Resolution Terms",
        options: [
          { value: "8K", label: "8K" },
          { value: "high resolution", label: "High Resolution" },
          { value: "detailed", label: "Detailed" },
          { value: "4K", label: "4K" },
          { value: "ultra HD", label: "Ultra HD" }
        ]
      },
      technicalTerms: {
        title: "Technical Terms",
        options: [
          { value: "HDR", label: "HDR" },
          { value: "studio lighting", label: "Studio Lighting" },
          { value: "professional lighting", label: "Professional Lighting" },
          { value: "ray tracing", label: "Ray Tracing" },
          { value: "high dynamic range", label: "High Dynamic Range" }
        ]
      },
      detailEnhancers: {
        title: "Detail Enhancers",
        options: [
          { value: "detailed skin", label: "Detailed Skin" },
          { value: "intricate details", label: "Intricate Details" },
          { value: "fine details", label: "Fine Details" },
          { value: "highly detailed", label: "Highly Detailed" },
          { value: "intricate textures", label: "Intricate Textures" }
        ]
      },
      professionalTerms: {
        title: "Professional Terms",
        options: [
          { value: "masterpiece", label: "Masterpiece" },
          { value: "award-winning", label: "Award-Winning" },
          { value: "professional", label: "Professional" },
          { value: "best quality", label: "Best Quality" },
          { value: "cinematic", label: "Cinematic" }
        ]
      }
    }
  },
  
  // Lighting Modifiers
  lighting: {
    title: "Lighting Modifiers",
    categories: {
      lightingTypes: {
        title: "Lighting Types",
        options: [
          { value: "soft lighting", label: "Soft Lighting" },
          { value: "dramatic lighting", label: "Dramatic Lighting" },
          { value: "cinematic lighting", label: "Cinematic Lighting" },
          { value: "natural lighting", label: "Natural Lighting" },
          { value: "moody lighting", label: "Moody Lighting" }
        ]
      },
      timeOfDay: {
        title: "Time of Day",
        options: [
          { value: "golden hour", label: "Golden Hour" },
          { value: "sunset", label: "Sunset" },
          { value: "night", label: "Night" },
          { value: "dawn", label: "Dawn" },
          { value: "dusk", label: "Dusk" }
        ]
      },
      lightQuality: {
        title: "Light Quality",
        options: [
          { value: "soft light", label: "Soft Light" },
          { value: "harsh light", label: "Harsh Light" },
          { value: "diffused light", label: "Diffused Light" },
          { value: "warm light", label: "Warm Light" },
          { value: "cool light", label: "Cool Light" }
        ]
      },
      lightSources: {
        title: "Light Sources",
        options: [
          { value: "candlelight", label: "Candlelight" },
          { value: "neon light", label: "Neon Light" },
          { value: "moonlight", label: "Moonlight" },
          { value: "sunlight", label: "Sunlight" },
          { value: "firelight", label: "Firelight" }
        ]
      }
    }
  },
  
  // Medium and Material
  medium: {
    title: "Medium and Material",
    categories: {
      artMedium: {
        title: "Art Medium",
        options: [
          { value: "oil paint", label: "Oil Paint" },
          { value: "watercolor", label: "Watercolor" },
          { value: "pencil sketch", label: "Pencil Sketch" },
          { value: "charcoal", label: "Charcoal" },
          { value: "digital painting", label: "Digital Painting" }
        ]
      },
      physicalMaterials: {
        title: "Physical Materials",
        options: [
          { value: "ceramic", label: "Ceramic" },
          { value: "glass", label: "Glass" },
          { value: "metal", label: "Metal" },
          { value: "wood", label: "Wood" },
          { value: "marble", label: "Marble" }
        ]
      },
      textures: {
        title: "Textures",
        options: [
          { value: "rough texture", label: "Rough" },
          { value: "smooth texture", label: "Smooth" },
          { value: "glossy texture", label: "Glossy" },
          { value: "matte texture", label: "Matte" },
          { value: "weathered texture", label: "Weathered" }
        ]
      },
      renderingStyles: {
        title: "Rendering Styles",
        options: [
          { value: "photorealistic", label: "Photorealistic" },
          { value: "cartoon style", label: "Cartoon" },
          { value: "3D render", label: "3D Render" },
          { value: "hand-drawn", label: "Hand-drawn" },
          { value: "hyperrealistic", label: "Hyperrealistic" }
        ]
      }
    }
  },
  
  // Perspective and Composition
  perspective: {
    title: "Perspective and Composition",
    categories: {
      cameraAngles: {
        title: "Camera Angles",
        options: [
          { value: "aerial view", label: "Aerial View" },
          { value: "from below", label: "From Below" },
          { value: "from above", label: "From Above" },
          { value: "wide angle", label: "Wide Angle" },
          { value: "top-down view", label: "Top-down View" }
        ]
      },
      perspective: {
        title: "Perspective",
        options: [
          { value: "looking down", label: "Looking Down" },
          { value: "looking up", label: "Looking Up" },
          { value: "eye-level", label: "Eye-level" },
          { value: "isometric", label: "Isometric" },
          { value: "first-person", label: "First-person" }
        ]
      },
      composition: {
        title: "Composition",
        options: [
          { value: "centered composition", label: "Centered" },
          { value: "off-center composition", label: "Off-center" },
          { value: "symmetrical composition", label: "Symmetrical" },
          { value: "rule of thirds", label: "Rule of Thirds" },
          { value: "dynamic composition", label: "Dynamic" }
        ]
      },
      distance: {
        title: "Distance",
        options: [
          { value: "close-up", label: "Close-up" },
          { value: "far away", label: "Far Away" },
          { value: "panoramic", label: "Panoramic" },
          { value: "medium shot", label: "Medium Shot" },
          { value: "extreme close-up", label: "Extreme Close-up" }
        ]
      }
    }
  },
  
  // Photography Terms
  photography: {
    title: "Photography Terms",
    categories: {
      cameraSettings: {
        title: "Camera Settings",
        options: [
          { value: "shallow depth of field", label: "Shallow Depth of Field" },
          { value: "bokeh", label: "Bokeh" },
          { value: "sharp focus", label: "Sharp Focus" },
          { value: "long exposure", label: "Long Exposure" },
          { value: "motion blur", label: "Motion Blur" }
        ]
      },
      photographyTypes: {
        title: "Photography Types",
        options: [
          { value: "portrait photography", label: "Portrait" },
          { value: "landscape photography", label: "Landscape" },
          { value: "macro photography", label: "Macro" },
          { value: "aerial photography", label: "Aerial" },
          { value: "wildlife photography", label: "Wildlife" }
        ]
      },
      photoEffects: {
        title: "Photo Effects",
        options: [
          { value: "black and white", label: "Black and White" },
          { value: "sepia", label: "Sepia" },
          { value: "vintage photo", label: "Vintage" },
          { value: "film grain", label: "Film Grain" },
          { value: "cross-processed", label: "Cross-processed" }
        ]
      },
      filmTypes: {
        title: "Film Types",
        options: [
          { value: "polaroid", label: "Polaroid" },
          { value: "35mm film", label: "35mm Film" },
          { value: "analog film", label: "Analog" },
          { value: "lomography", label: "Lomography" },
          { value: "medium format", label: "Medium Format" }
        ]
      }
    }
  },
  
  // Environment Modifiers
  environment: {
    title: "Environment Modifiers",
    categories: {
      weather: {
        title: "Weather",
        options: [
          { value: "foggy", label: "Foggy" },
          { value: "rainy", label: "Rainy" },
          { value: "snowy", label: "Snowy" },
          { value: "sunny", label: "Sunny" },
          { value: "cloudy", label: "Cloudy" }
        ]
      },
      seasons: {
        title: "Seasons",
        options: [
          { value: "spring", label: "Spring" },
          { value: "summer", label: "Summer" },
          { value: "autumn", label: "Autumn" },
          { value: "winter", label: "Winter" },
          { value: "monsoon", label: "Monsoon" }
        ]
      },
      timePeriod: {
        title: "Time Period",
        options: [
          { value: "1920s", label: "1920s" },
          { value: "medieval", label: "Medieval" },
          { value: "futuristic", label: "Futuristic" },
          { value: "ancient", label: "Ancient" },
          { value: "post-apocalyptic", label: "Post-apocalyptic" }
        ]
      },
      locationTypes: {
        title: "Location Types",
        options: [
          { value: "city", label: "City" },
          { value: "forest", label: "Forest" },
          { value: "beach", label: "Beach" },
          { value: "mountains", label: "Mountains" },
          { value: "desert", label: "Desert" }
        ]
      }
    }
  },
  
  // Color Modifiers
  color: {
    title: "Color Modifiers",
    categories: {
      colorSchemes: {
        title: "Color Schemes",
        options: [
          { value: "red and blue", label: "Red and Blue" },
          { value: "pastel colors", label: "Pastel Colors" },
          { value: "neon colors", label: "Neon Colors" },
          { value: "monochromatic", label: "Monochromatic" },
          { value: "complementary colors", label: "Complementary Colors" }
        ]
      },
      colorMood: {
        title: "Color Mood",
        options: [
          { value: "warm colors", label: "Warm Colors" },
          { value: "cool colors", label: "Cool Colors" },
          { value: "vibrant colors", label: "Vibrant" },
          { value: "muted colors", label: "Muted" },
          { value: "earth tones", label: "Earth Tones" }
        ]
      },
      colorEffects: {
        title: "Color Effects",
        options: [
          { value: "gradient", label: "Gradient" },
          { value: "color splash", label: "Color Splash" },
          { value: "faded colors", label: "Faded" },
          { value: "high contrast", label: "High Contrast" },
          { value: "duotone", label: "Duotone" }
        ]
      },
      colorIntensity: {
        title: "Color Intensity",
        options: [
          { value: "bright colors", label: "Bright" },
          { value: "dark colors", label: "Dark" },
          { value: "saturated colors", label: "Saturated" },
          { value: "desaturated colors", label: "Desaturated" },
          { value: "high-key", label: "High-key" }
        ]
      }
    }
  },
  
  // Mood Modifiers
  mood: {
    title: "Mood Modifiers",
    categories: {
      emotionalTone: {
        title: "Emotional Tone",
        options: [
          { value: "happy", label: "Happy" },
          { value: "sad", label: "Sad" },
          { value: "mysterious", label: "Mysterious" },
          { value: "peaceful", label: "Peaceful" },
          { value: "tense", label: "Tense" }
        ]
      },
      atmosphere: {
        title: "Atmosphere",
        options: [
          { value: "dreamy", label: "Dreamy" },
          { value: "nightmarish", label: "Nightmarish" },
          { value: "magical", label: "Magical" },
          { value: "ethereal", label: "Ethereal" },
          { value: "ominous", label: "Ominous" }
        ]
      },
      timeFeel: {
        title: "Time Feel",
        options: [
          { value: "nostalgic", label: "Nostalgic" },
          { value: "futuristic aesthetic", label: "Futuristic" },
          { value: "timeless", label: "Timeless" },
          { value: "retro mood", label: "Retro" },
          { value: "contemporary", label: "Contemporary" }
        ]
      },
      dramaticQuality: {
        title: "Dramatic Quality",
        options: [
          { value: "epic", label: "Epic" },
          { value: "intimate", label: "Intimate" },
          { value: "dramatic", label: "Dramatic" },
          { value: "subtle", label: "Subtle" },
          { value: "intense", label: "Intense" }
        ]
      }
    }
  },
  
  // Special Effects
  effects: {
    title: "Special Effects",
    categories: {
      visualEffects: {
        title: "Visual Effects",
        options: [
          { value: "glowing", label: "Glowing" },
          { value: "sparkling", label: "Sparkling" },
          { value: "smoky", label: "Smoky" },
          { value: "misty", label: "Misty" },
          { value: "dusty", label: "Dusty" }
        ]
      },
      motionEffects: {
        title: "Motion Effects",
        options: [
          { value: "blurred motion", label: "Blurred Motion" },
          { value: "frozen in time", label: "Frozen in Time" },
          { value: "dynamic motion", label: "Dynamic Motion" },
          { value: "slow motion effect", label: "Slow Motion" },
          { value: "action shot", label: "Action Shot" }
        ]
      },
      digitalEffects: {
        title: "Digital Effects",
        options: [
          { value: "glitch effect", label: "Glitch" },
          { value: "pixelated", label: "Pixelated" },
          { value: "double exposure", label: "Double Exposure" },
          { value: "holographic", label: "Holographic" },
          { value: "vignette", label: "Vignette" }
        ]
      },
      lightingEffects: {
        title: "Lighting Effects",
        options: [
          { value: "lens flare", label: "Lens Flare" },
          { value: "god rays", label: "God Rays" },
          { value: "backlit", label: "Backlit" },
          { value: "rim light", label: "Rim Light" },
          { value: "volumetric lighting", label: "Volumetric Lighting" }
        ]
      }
    }
  }
};

// Example data for model strategies
const modelStrategies = {
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
    tokenLimit: null, // No strict token limit
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
    tokenLimit: 75, // SDXL has a 75 token limit
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
    tokenLimit: null, // No strict token limit
    tips: [
      "Be specific about style and medium",
      "Technical photography terms work well",
      "Include \"magic words\" (masterpiece, detailed, etc.)",
      "Benefits from precise description language"
    ]
  }
};

// Example templates for different types of scenes
const promptTemplates = {
  landscape: "{description}, {style}, {quality}, {lighting}, {time}",
  portrait: "{subject} {pose}, {lighting}, {composition}, {quality}, {style}",
  concept: "{subject} {style}, {mood}, {lighting}, {quality}, {perspective}",
  abstract: "abstract {description}, {style}, {colors}, {mood}, {quality}"
};

// Example data to help with intelligent prompt construction
const magicWords = {
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