// UI Controller to handle interactions
class UIController {
  constructor(optimizer) {
    this.optimizer = optimizer;
    this.activeModel = 'flux';
    this.initEventListeners();
    this.initModelButtons();
    this.initDropdowns();
    this.populateTabContent();
  }

  initEventListeners() {
    // Generate prompt button
    document.getElementById('optimize-btn').addEventListener('click', () => this.generatePrompt());
    
    // Clear button
    document.getElementById('clear-btn').addEventListener('click', () => this.clearAll());
    
    // Examples button
    document.getElementById('examples-btn').addEventListener('click', () => this.showExamplesModal());
    
    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => this.switchTab(tab));
    });
  }

  initModelButtons() {
    // Model selection buttons
    const fluxBtn = document.getElementById('flux-btn');
    const sdxlBtn = document.getElementById('sdxl-btn');
    const sd15Btn = document.getElementById('sd15-btn');
    
    // Set initial active state
    fluxBtn.classList.add('bg-indigo-600', 'text-white');
    
    // Add click event listeners
    document.querySelectorAll('input[name="model"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        // Reset all buttons
        fluxBtn.classList.remove('bg-indigo-600', 'bg-purple-600', 'bg-green-600', 'text-white');
        sdxlBtn.classList.remove('bg-indigo-600', 'bg-purple-600', 'bg-green-600', 'text-white');
        sd15Btn.classList.remove('bg-indigo-600', 'bg-purple-600', 'bg-green-600', 'text-white');
        
        // Set active button
        this.activeModel = e.target.value;
        
        if (this.activeModel === 'flux') {
          fluxBtn.classList.add('bg-indigo-600', 'text-white');
        } else if (this.activeModel === 'sdxl') {
          sdxlBtn.classList.add('bg-purple-600', 'text-white');
        } else if (this.activeModel === 'sd15') {
          sd15Btn.classList.add('bg-green-600', 'text-white');
        }
      });
    });
  }

  initDropdowns() {
    // Initialize all dropdown menus
    document.querySelectorAll('.dropdown-header').forEach(header => {
      header.addEventListener('click', (e) => {
        const content = header.nextElementSibling;
        content.classList.toggle('hidden');
        
        // Close other dropdowns
        document.querySelectorAll('.dropdown-content').forEach(dropdown => {
          if (dropdown !== content && !dropdown.classList.contains('hidden')) {
            dropdown.classList.add('hidden');
          }
        });
        
        // Stop propagation to prevent document click from immediately closing it
        e.stopPropagation();
      });
    });
    
    // Close dropdowns when clicking elsewhere
    document.addEventListener('click', () => {
      document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        dropdown.classList.add('hidden');
      });
    });
    
    // Initialize dropdown item selection
    document.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const value = item.getAttribute('data-value');
        const label = item.textContent;
        const dropdown = item.closest('.dropdown-container');
        const header = dropdown.querySelector('.dropdown-header span');
        
        // Update header text
        header.textContent = label;
        
        // Add to selected modifiers
        this.addModifier(value, label);
        
        // Hide dropdown
        item.closest('.dropdown-content').classList.add('hidden');
      });
    });
    
    // Initialize copy buttons
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const text = document.getElementById(targetId).textContent;
        
        // Copy to clipboard
        navigator.clipboard.writeText(text)
          .then(() => {
            // Show success message
            this.showNotification('Copied to clipboard!');
            
            // Visual feedback on button
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => {
              btn.textContent = originalText;
            }, 2000);
          })
          .catch(err => {
            console.error('Failed to copy: ', err);
          });
      });
    });
    
    // Show all models button
    document.getElementById('all-prompts-btn').addEventListener('click', () => {
      document.getElementById('all-models-section').classList.toggle('hidden');
    });
  }

  populateTabContent() {
    // Populate tab content for each modifier category
    Object.keys(this.optimizer.modifiers).forEach(tabKey => {
      const tabContent = document.querySelector(`.tab-content[data-content="${tabKey}"]`);
      
      if (!tabContent) return;
      
      // Clear existing content
      let gridHTML = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">';
      
      // Loop through each category in this tab
      const categories = this.optimizer.modifiers[tabKey].categories;
      Object.keys(categories).forEach(categoryKey => {
        const category = categories[categoryKey];
        
        // Create dropdown for this category
        gridHTML += `
          <div>
            <label class="block text-sm text-gray-400 mb-2">${category.title}</label>
            <div class="dropdown-container">
              <div class="dropdown-header">
                <span>Select ${category.title.toLowerCase()}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div class="dropdown-content hidden">
        `;
        
        // Add options
        category.options.forEach(option => {
          gridHTML += `<div class="dropdown-item" data-value="${option.value}">${option.label}</div>`;
        });
        
        // Close the dropdown
        gridHTML += `
              </div>
            </div>
          </div>
        `;
      });
      
      gridHTML += '</div>';
      
      // Set the HTML
      tabContent.innerHTML = gridHTML;
    });
    
    // Re-initialize the dropdowns
    this.initDropdowns();
  }

  switchTab(tab) {
    // Get tab id
    const tabId = tab.getAttribute('data-tab');
    
    // Update active tab
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.remove('active');
    });
    tab.classList.add('active');
    
    // Update active content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.querySelector(`.tab-content[data-content="${tabId}"]`).classList.add('active');
  }

  addModifier(value, label) {
    // Add to optimizer's selected modifiers
    if (this.optimizer.addModifier(value)) {
      // Create tag element
      const tag = document.createElement('div');
      tag.className = 'tag';
      tag.innerHTML = `
        <span>${label}</span>
        <button class="remove-tag" data-value="${value}">×</button>
      `;
      
      // Add to selected modifiers display
      document.getElementById('selected-modifiers').appendChild(tag);
      
      // Add remove event
      tag.querySelector('.remove-tag').addEventListener('click', (e) => {
        const value = e.target.getAttribute('data-value');
        this.removeModifier(value);
      });
    }
  }

  removeModifier(value) {
    // Remove from optimizer
    if (this.optimizer.removeModifier(value)) {
      // Remove from UI
      const tags = document.querySelectorAll('.tag');
      tags.forEach(tag => {
        const tagBtn = tag.querySelector('.remove-tag');
        if (tagBtn && tagBtn.getAttribute('data-value') === value) {
          tag.remove();
        }
      });
    }
  }

  clearAll() {
    // Clear input text
    document.getElementById('input-prompt').value = '';
    
    // Clear selected modifiers
    document.getElementById('selected-modifiers').innerHTML = '';
    this.optimizer.clearModifiers();
    
    // Reset dropdown headers
    document.querySelectorAll('.dropdown-header span').forEach(span => {
      const defaultText = span.closest('.dropdown-container').previousElementSibling.textContent;
      span.textContent = `Select ${defaultText.toLowerCase()}`;
    });
    
    // Hide results
    document.getElementById('results-section').classList.add('hidden');
    document.getElementById('all-models-section').classList.add('hidden');
  }

  generatePrompt() {
    const input = document.getElementById('input-prompt').value.trim();
    
    if (!input) {
      this.showNotification('Please enter a description first', 'error');
      return;
    }
    
    // Generate prompts for all models
    const prompts = this.optimizer.generateAllPrompts(input);
    
    // Update results for the active model
    this.updateActiveModelResult(prompts[this.activeModel]);
    
    // Update all model results
    this.updateAllModelResults(prompts);
    
    // Show results section
    document.getElementById('results-section').classList.remove('hidden');
    
    // Scroll to results
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
  }

  updateActiveModelResult(prompt) {
    const activeModelResult = document.getElementById('active-model-result');
    
    // Create result card based on active model
    let modelColor, modelName, modelDesc;
    
    switch (this.activeModel) {
      case 'sdxl':
        modelColor = 'purple';
        modelName = 'SDXL';
        modelDesc = 'Balanced between realism and creativity';
        break;
      case 'sd15':
        modelColor = 'green';
        modelName = 'SD1.5';
        modelDesc = 'Good for stylistic and artistic outputs';
        break;
      case 'flux':
      default:
        modelColor = 'indigo';
        modelName = 'Flux';
        modelDesc = 'Best for photorealistic images';
    }
    
    // Create HTML for result card
    activeModelResult.innerHTML = `
      <div>
        <div class="model-header bg-${modelColor}-900 bg-opacity-20 rounded-t-lg">
          <h3 class="text-lg font-medium text-${modelColor}-400">${modelName}</h3>
          <p class="text-xs text-gray-400">${modelDesc}</p>
        </div>
        <div class="model-content">
          <div id="active-prompt-result" class="prompt-result mb-2">${prompt}</div>
          <div class="flex justify-between items-center">
            <span class="text-xs text-gray-500"><span id="active-token-count">${this.optimizer.countTokens(prompt)}</span> tokens</span>
            <button class="copy-btn text-xs text-${modelColor}-400 hover:text-${modelColor}-300 flex items-center" data-target="active-prompt-result">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Re-initialize copy button
    document.querySelector('#active-model-result .copy-btn').addEventListener('click', () => {
      const text = document.getElementById('active-prompt-result').textContent;
      
      navigator.clipboard.writeText(text)
        .then(() => {
          this.showNotification('Copied to clipboard!');
          
          // Visual feedback
          const btn = document.querySelector('#active-model-result .copy-btn');
          const originalText = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    });
  }

  updateAllModelResults(prompts) {
    // Update all results
    document.getElementById('flux-result').textContent = prompts.flux;
    document.getElementById('sdxl-result').textContent = prompts.sdxl;
    document.getElementById('sd15-result').textContent = prompts.sd15;
    
    // Update token counts
    document.getElementById('flux-token-count').textContent = this.optimizer.countTokens(prompts.flux);
    document.getElementById('sdxl-token-count').textContent = this.optimizer.countTokens(prompts.sdxl);
    document.getElementById('sd15-token-count').textContent = this.optimizer.countTokens(prompts.sd15);
  }

  showExamplesModal() {
    // Get examples
    const examples = this.optimizer.getExamples();
    
    // Create modal HTML
    const modalHTML = `
      <div id="examples-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-gray-800 rounded-lg max-w-xl w-full mx-4 overflow-hidden">
          <div class="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 class="text-lg font-medium">Example Prompts</h3>
            <button id="close-modal" class="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="p-4 max-h-96 overflow-y-auto">
            <div class="space-y-4">
              ${Object.entries(examples).map(([type, example]) => `
                <div class="example-item">
                  <h4 class="text-sm font-medium text-gray-300 mb-1">${type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                  <div class="flex">
                    <p class="bg-gray-900 p-3 rounded text-sm flex-1">${example}</p>
                    <button class="use-example ml-2 text-indigo-400 hover:text-indigo-300" data-example="${example}">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add modal to body
    const modalElement = document.createElement('div');
    modalElement.innerHTML = modalHTML;
    document.body.appendChild(modalElement);
    
    // Add event listeners
    document.getElementById('close-modal').addEventListener('click', () => {
      document.getElementById('examples-modal').remove();
    });
    
    // Use example buttons
    document.querySelectorAll('.use-example').forEach(btn => {
      btn.addEventListener('click', () => {
        const example = btn.getAttribute('data-example');
        document.getElementById('input-prompt').value = example;
        document.getElementById('examples-modal').remove();
      });
    });
    
    // Close on click outside
    document.getElementById('examples-modal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('examples-modal')) {
        document.getElementById('examples-modal').remove();
      }
    });
  }

  showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `success-message ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`;
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Remove after timeout
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create optimizer instance
  const optimizer = new PromptOptimizer();
  
  // Create UI controller
  const ui = new UIController(optimizer);
});