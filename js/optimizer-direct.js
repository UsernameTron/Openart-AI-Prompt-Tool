// Direct initialization of the optimizer
console.log("🛠️ Direct optimizer initialization starting...");

// Create the optimizer instance immediately
const directOptimizer = new PromptOptimizer();

// Directly expose the optimizer functions to the window
window.AdvancedPromptOptimizer = {
  optimizeFlux: function(input) {
    console.log("Using direct optimizeFlux with:", input);
    return directOptimizer.optimizeFlux(input);
  },
  optimizeSDXL: function(input) {
    console.log("Using direct optimizeSDXL with:", input);
    return directOptimizer.optimizeSDXL(input);
  },
  optimizeSd15: function(input) {
    console.log("Using direct optimizeSd15 with:", input);
    return directOptimizer.optimizeSd15(input);
  },
  optimizeAll: function(input) {
    console.log("Using direct optimizeAll with:", input);
    return {
      flux: directOptimizer.optimizeFlux(input),
      sdxl: directOptimizer.optimizeSDXL(input),
      sd15: directOptimizer.optimizeSd15(input)
    };
  }
};

console.log("✅ Direct optimizer initialization complete - functions exposed to window");