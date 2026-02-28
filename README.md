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
## System Architecture & Design Choices
 
This client application was architected with performance, maintainability, and user experience in mind. Here is a breakdown of the key design decisions:

### 1. Client-Side Cart Storage (Local Storage)
To provide a persistent shopping experience without requiring a backend database or user authentication for the mock client, the shopping cart state is seamlessly synchronized with the browser's `localStorage`. 
- **Implementation**: The custom `CartProvider` leverages a React `useEffect` hook to stringify and write the cart array to local storage whenever it changes. 
- **Benefit**: Users can close the browser or refresh the page, and their cart contents will hydrate immediately upon their next visit, creating a frictionless e-commerce experience.

### 2. Parallel API Data Fetching
The `RecipesPage` is designed to provide immediate value through two different data sources: Google Gemini (for generative recipes) and Spoonacular (for traditional database recipes).
- **Implementation**: When a user searches, both requests are dispatched simultaneously using `Promise.all()`. 
- **Benefit**: This parallel execution ensures the user isn't waiting for one API to resolve before the other begins fetching, drastically reducing the total time to interactive load. Mui Skeletons are used to indicate loading state asynchronously.

### 3. Separation of Concerns (React Context)
To adhere to React Fast Refresh compatibility rules and maintain a clean architecture, the global state is strictly divided.
- **Implementation**: The application uses a custom `cart.context.ts` (for the Context object), `useCart.ts` (for the consumer hook), and `CartProvider.tsx` (for the stateful provider component).
- **Benefit**: This separation prevents Hot Module Replacement (HMR) failures during local development and keeps component files focused solely on UI rendering.

### 4. Component-Based Theming (Material UI)
Rather than raw CSS or scattered inline styles, the application uses a unified design system.
- **Implementation**: A centralized `theme.ts` dictates the primary/secondary color palettes, typography overrides (Outfit & Playfair Display fonts), and component shapes.
- **Benefit**: Ensures a perfectly consistent visual language across the entire application and allows for global design changes by modifying a single configuration file.
