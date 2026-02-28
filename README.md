# Jenna's Recipes - Mock Client

Welcome to **Jenna's Recipes**, a beautifully crafted, AI-powered mock client application. This project serves as a modern, interactive frontend for discovering delicious recipes, leveraging cutting-edge AI features alongside traditional search, and providing a seamless mock e-commerce experience for kitchen supplies.

## Overview

This project was built using a modern React stack and designed to showcase dynamic functionality, from fetching data globally to generating personalized recipes on the fly using Google Gemini's advanced language model.

### Key Features
- **AI Recipe Generator**: Uses the Google Gemini API to analyze user-inputted ingredients and generate custom, step-by-step recipes instantly.
- **Recipe Search Integration**: Fetches traditional recipes from the Spoonacular API, providing a vast database of existing culinary inspiration alongside AI suggestions.
- **Mock Storefront**: A fully-functional frontend shopping experience, complete with an interactive shopping cart (persisted to Local Storage) and category filtering.
- **Dynamic Routing**: Built with `react-router-dom` to provide seamless, single-page application navigation between the Home, Recipes, and Store pages without reloading.
- **Responsive Navigation**: A mobile-friendly Navbar that cleanly adapts to a Drawer layout on smaller screens. 

### Technology Stack
- **Framework**: React 19 + TypeScript 
- **Build Tool**: Vite (configured for rapid HMR and optimized builds)
- **Styling**: Material UI (MUI) v7 paired with custom theming and Emotion for CSS-in-JS.
- **AI Integration**: `@google/generative-ai` SDK
- **State Management**: React Context API (custom `CartProvider`)
- **Deployment Ready**: Out-of-the-box configuration ready for instant deployment on Vercel.

## Getting Started

To run this project locally:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory and add the necessary API keys:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_SPOONACULAR_KEY=your_spoonacular_api_key
   ```
   *(You can get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey))*

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

## Development & CI/CD
This repository includes a GitHub Action (`basic-checks.yml`) that automatically runs ESLint and the TypeScript compiler against every push and pull request to the `main` branch, ensuring a stable, type-safe codebase.
