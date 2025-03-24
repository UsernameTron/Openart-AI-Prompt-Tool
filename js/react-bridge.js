// Bridge between standalone optimizer and React app - v1.0.1
(function() {
  // When the window loads, check if the optimizer instance is ready
  window.addEventListener('DOMContentLoaded', function() {
    console.log("🔄 OpenArt Optimizer bridge initializing...");
    
    // Create the optimizer instance
    const optimizer = new PromptOptimizer();
    
    // Store optimization functions for React app to access
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
    
    console.log("✅ OpenArt Optimizer bridge ready");
  });
})();