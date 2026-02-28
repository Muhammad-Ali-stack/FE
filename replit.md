# ConfForum - Conference Management Frontend

## Overview
A React-based frontend application for managing conferences. It supports multiple user roles including Admin, Author, Organizer, and Reviewer.

## Tech Stack
- **Framework**: React 18 (Create React App)
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios (proxied to backend at localhost:3012)
- **UI Components**: Headless UI, Heroicons
- **Charts**: Chart.js + react-chartjs-2
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## Project Structure
- `src/pages/` - Page components organized by role (Admin, Author, Organizer, Reviewer, Auth)
- `src/components/` - Shared UI components (Header, Footer, Sidebars, Layout, etc.)
- `src/context/` - React context providers (Auth)
- `src/routes/` - Route guard components for role-based access
- `public/` - Static assets

## Running the App
The app runs on port 5000 with host 0.0.0.0.
Workflow command: `HOST=0.0.0.0 PORT=5000 DANGEROUSLY_DISABLE_HOST_CHECK=true npm start`

## Backend Proxy
The app proxies API requests to `http://localhost:3012` (configured in package.json).

## Deployment
Configured as a static site deployment:
- Build: `npm run build`
- Public dir: `build`
