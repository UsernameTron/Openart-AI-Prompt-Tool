# Netlify Deployment Guide

This guide will walk you through deploying the OpenArt AI Prompt Optimizer web application to Netlify.

## Step 1: Prepare Your Repository

1. Push your code to a GitHub repository:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/openart-prompt-optimizer.git

# Push to GitHub
git push -u origin main
```

## Step 2: Sign Up for Netlify

1. Go to [Netlify](https://www.netlify.com/) and sign up for an account
2. You can sign up using your GitHub account for easier integration

## Step 3: Create a New Site from Git

1. Click the "New site from Git" button on your Netlify dashboard
2. Choose "GitHub" as your Git provider
3. Authorize Netlify to access your GitHub account
4. Select your repository from the list

## Step 4: Configure Build Settings

Configure the following build settings:

- **Branch to deploy**: `main` (or whatever your main branch is called)
- **Build command**: `npm run build`
- **Publish directory**: `build`

These settings should match what's in your `netlify.toml` file.

## Step 5: Deploy Your Site

1. Click the "Deploy site" button
2. Netlify will start building and deploying your site
3. Wait for the build process to complete

## Step 6: Configure Your Domain (Optional)

1. Once your site is deployed, go to "Site settings" > "Domain management"
2. You can use the default Netlify subdomain or set up a custom domain

## Step 7: Check Your Functions

1. Go to the "Functions" tab in your Netlify dashboard
2. Verify that your `optimize-prompt` function appears in the list
3. If you encounter any issues, check the function logs

## Step 8: Continuous Deployment

Netlify has continuous deployment set up by default:

1. Any changes pushed to your GitHub repository will trigger a new build
2. Netlify will automatically deploy the updated site

## Troubleshooting

If you encounter issues during deployment:

1. Check the build logs in the Netlify dashboard
2. Verify that your dependencies are correctly specified in `package.json`
3. Make sure your build commands are correct in `netlify.toml`
4. Try running the build process locally with `npm run build` to identify issues

## Local Development with Netlify Functions

To test your Netlify functions locally:

1. Install the Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Run the development server:
```bash
netlify dev
```

This will start both your React app and Netlify functions locally.