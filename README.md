# OpenArt AI Prompt Optimizer (Web Version)

A web-based tool for optimizing natural language descriptions into effective prompts for OpenArt AI's image generation models.

![OpenArt AI Prompt Optimizer Web Interface](https://via.placeholder.com/800x400?text=OpenArt+AI+Prompt+Optimizer)

## Features

- **Zero Installation**: Access directly from your web browser
- **Model-Specific Optimization**: Tailored prompts for Flux, SDXL, and SD1.5 models
- **Real-time Analysis**: Instant feedback on your input
- **Responsive Design**: Works on desktop and mobile devices
- **Clipboard Integration**: Copy optimized prompts with one click

## How It Works

1. Enter your description in the text area
2. Select your target AI model (Flux, SDXL, or SD1.5)
3. Click "Generate Optimized Prompt"
4. View your optimized prompts for all three models
5. Copy the result with a single click

## Deployment

This app is deployed using Netlify and can be accessed at:
[openart-prompt-optimizer.netlify.app](https://openart-prompt-optimizer.netlify.app)

## Local Development

To run this project locally:

1. Clone the repository:
```bash
git clone https://github.com/yourusername/openart-prompt-optimizer.git
cd openart-prompt-optimizer/openart-web-optimizer
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

## Deployment to Netlify

1. Create a Netlify account and connect your GitHub repository

2. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `build`

3. Deploy!

## Technologies Used

- React.js - Frontend UI
- Styled Components - Styling
- Netlify - Hosting and serverless functions

## License

MIT