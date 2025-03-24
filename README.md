# OpenArt AI Prompt Optimizer

A zero-installation web-based tool for optimizing natural language descriptions into effective prompts for AI image generation models (Flux, SDXL, and SD1.5).

![OpenArt AI Prompt Optimizer](https://via.placeholder.com/800x400?text=OpenArt+AI+Prompt+Optimizer)

## Features

- **Zero Installation**: Access directly from your web browser
- **Model-Specific Optimization**: Specialized strategies for:
  - **Flux**: Optimized for photorealistic outputs with detailed technical specifications
  - **SDXL**: Token-aware strategies (75 token limit) with intelligent truncation
  - **SD1.5**: Enhanced with style specificity and "magic words" optimization
- **Comprehensive Modifier System**: 10 categories including:
  - Style, Quality, Lighting, Medium, Perspective
  - Photography, Environment, Color, Mood, Effects
- **Scene Type Detection**: Automatically detects and optimizes for:
  - Portraits, Landscapes, Concept art, Character descriptions
  - Objects, Abstract compositions
- **Dark-themed Modern UI**: Responsive design that works on all devices
- **Clipboard Integration**: Copy optimized prompts with one click
- **Examples Library**: 30+ curated example prompts across different categories

## How It Works

1. Enter your natural language description in the text area
2. Select your target AI model (Flux, SDXL, or SD1.5)
3. Optionally add modifier tags from the category tabs
4. Click "Generate Optimized Prompt"
5. View optimized prompts for all models with token counts
6. Copy the result with a single click

## Architecture

The application uses a hybrid approach:

- **Core React Application**: Main UI framework and interactivity
- **Advanced Optimization Engine**: Custom JavaScript modules:
  - `modifiers-data.js`: Comprehensive data structures for prompt enhancement
  - `prompt-optimizer.js`: Model-specific optimization algorithms
  - `ui-controller.js`: Enhanced UI interactions

## Deployment

This app is deployed using Netlify and can be accessed at:
[openart-prompt-optimizer.netlify.app](https://openart-prompt-optimizer.netlify.app)

## Local Development

To run this project locally:

1. Clone the repository:
```bash
git clone https://github.com/UsernameTron/Openart-AI-Prompt-Tool.git
cd openart-web-optimizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
openart-web-optimizer/
├── public/               # Static assets
│   ├── index.html        # Main HTML with script references
│   └── js/               # Symlink to ../js for easy access
├── js/                   # Advanced optimizer modules
│   ├── modifiers-data.js # Comprehensive modifier categories
│   ├── prompt-optimizer.js # Core optimization logic
│   └── ui-controller.js  # Enhanced UI interactions
├── src/                  # React application source
│   ├── components/       # React UI components
│   ├── utils/            # Utility and helper functions
│   └── App.js            # Main React application
└── netlify/
    └── functions/        # Serverless functions
```

## Technologies Used

- **React**: Frontend framework for responsive UI
- **JavaScript**: Core logic for prompt optimization
- **CSS/Styled Components**: Modern dark-themed styling
- **Netlify**: Zero-installation hosting

## License

MIT