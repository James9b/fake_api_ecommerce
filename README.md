# Fake Store React Application

A high-performance React application displaying product data from the [Fake Store API](https://fakestoreapi.com/). Features authentication, CRUD operations, efficient caching, and a modern dark-themed UI.

## Features

- **Authentication**: Simple login with session storage persistence
- **Product Listing**: Grid view with pagination (10 per page)
- **Search & Filter**: Filter products by category and search by title
- **Product Details**: Modal view with full description and ratings
- **CRUD Operations**: Edit and delete products with instant UI updates
- **Smart Caching**: React Query with automatic window focus revalidation
- **Responsive Design**: Works on mobile, tablet, and desktop

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Query (TanStack Query)** - Data fetching & caching
- **React Router** - Client-side routing
- **Vanilla CSS** - Custom styling

## Installation

```bash
npm install

npm run dev

npm run build

npm run preview
```

## Login Credentials

```
Username: user
Password: password
```

## Project Structure

```
src/
├── api/           
├── components/    
├── context/       
├── hooks/         
├── pages/         
└── styles/        
```

## Key Features Explained

### State Management & Caching
Uses React Query for intelligent caching. Data persists during navigation and automatically updates the cache after mutations.

### Window Focus Revalidation
Products automatically refresh when the browser tab regains focus, ensuring users always see the latest data.

### Optimistic Updates
After editing or deleting a product, the UI updates instantly without waiting for a full list re-fetch.

## Deployment

Build the production bundle and deploy to any static hosting:

```bash
npm run build
```

The `dist/` folder can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## License

MIT
