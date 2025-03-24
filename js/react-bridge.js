// Bridge between standalone optimizer and React app - v1.0.2
(function() {
  // When the window loads, verify that the optimizer is ready
  window.addEventListener('DOMContentLoaded', function() {
    console.log("🔄 OpenArt Optimizer bridge initializing...");
    
    // Check if the optimizer is available
    if (window.AdvancedPromptOptimizer) {
      console.log("✅ OpenArt Optimizer bridge connected to advanced optimizer");
      
      // Test the optimizer with a simple prompt
      const testPrompt = "test prompt";
      try {
        const result = window.AdvancedPromptOptimizer.optimizeFlux(testPrompt);
        console.log("🧪 Test prompt result:", result);
      } catch (err) {
        console.error("❌ Error testing optimizer:", err);
      }
    } else {
      console.warn("⚠️ Advanced optimizer not found - falling back to basic optimizer");
    }
  });
})();