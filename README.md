# Stock Symbol Search Application

This is a React-based web application that allows users to search for stock symbols and add them to a watchlist. The application leverages the Alpha Vantage API for fetching stock symbols and incorporates user authentication, protected routes, and a responsive design.

## Table of Contents

- [Stock Symbol Search Application](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#stock-symbol-search-application)
  - [Table of Contents](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#table-of-contents)
  - [Features](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#features)
  - [Installation](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#installation)
  - [Usage](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#usage)
    - [Search for Stock Symbols](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#search-for-stock-symbols)
    - [User Authentication](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#user-authentication)
    - [Dashboard](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#dashboard)
  - [Project Structure](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#project-structure)
  - [Components](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#components)
    - [App.tsx](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#apptsx)
    - [SearchBar.tsx](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#searchbartsx)
    - [SearchResult.tsx](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#searchresulttsx)
    - [ProtectedRoute.tsx](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#protectedroutetsx)
    - [Navbar.tsx](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#navbartsx)
    - [Sidebar.tsx](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#sidebartsx)
    - [Dashboard.tsx](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#dashboardtsx)
    - [ContextProvider.tsx](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#contextprovidertsx)
  - [API Integration](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#api-integration)
    - [Example API Call](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#example-api-call)
  - [State Management](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#state-management)
  - [Styling](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#styling)
  - [Contributing](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#contributing)
  - [License](notion://www.notion.so/Blendnet-AI-677ed5daf53548aba75ec19910c5c4de#license)

## Features

- **User Authentication**: Secure login and signup functionality.
- **Protected Routes**: Ensure that certain pages are accessible only to authenticated users.
- **Stock Symbol Search**: Search for stock symbols using the Alpha Vantage API.
- **Watchlist Management**: Add symbols to a personal watchlist.
- **Responsive Design**: Optimized for various screen sizes.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/stock-symbol-search.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Run the server:

   ```bash
   python manage.py runserver
   ```

4. For frontend:

   ```bash
   cd frontend
   ```
   
5. Install all the dependencies:

   ```bash
   npm install
   ```

6. Run the frontend:

   ```bash
   npm run dev
   ```

The application should now be running on `http://localhost:3000`.

## Usage

### Search for Stock Symbols

1. Enter the stock symbol keyword in the search bar.
2. Click the search icon or press enter.
3. The search results will display below the search bar.
4. Click on a search result to add it to your watchlist.

### User Authentication

- Navigate to `/login` to log in.
- Navigate to `/signup` to create a new account.

### Dashboard

- Navigate to `/dashboard` to view the main dashboard.
- This page is protected and requires authentication.

## Project Structure

```python
"""
Project Structure:
.
├── public
│   ├── index.html              # The main HTML file for the application.
│   └── ...                     # Other static files.
├── src
│   ├── api
│   │   └── index.ts            # API configuration and calls.
│   ├── assets
│   │   └── background.jpg      # Background image for the dashboard.
│   ├── components
│   │   ├── Home.tsx            # Home component.
│   │   ├── Navbar.tsx          # Navigation bar component.
│   │   ├── ProtectedRoute.tsx  # Component to protect routes.
│   │   ├── SearchBar.tsx       # Search bar component for stock symbols.
│   │   ├── SearchResult.tsx    # Component to display search results.
│   │   ├── Sidebar.tsx         # Sidebar component.
│   │   └── NotFound.tsx        # 404 Not Found component.
│   ├── contexts
│   │   └── ContextProvider.tsx # Context provider for authentication state.
│   ├── pages
│   │   ├── Dashboard.tsx       # Dashboard page.
│   │   ├── Login.tsx           # Login page.
│   │   └── Signup.tsx          # Signup page.
│   ├── App.tsx                 # Main application component.
│   ├── index.tsx               # Entry point for the React application.
│   └── main.tsx                # Main setup file.
├── .gitignore                  # Specifies files/directories to ignore in version control.
├── package.json                # Lists dependencies and scripts for the project.
├── README.md                   # Contains information about the project.
└── tsconfig.json               # TypeScript configuration file.
"""

# public/
# ├── index.html
# The main HTML file for the application.

# src/
# ├── api/
# │   └── index.ts
# API configuration and calls.

# ├── assets/
# │   └── background.jpg
# Background image for the dashboard.

# ├── components/
# │   ├── Home.tsx
# Home component.

# │   ├── Navbar.tsx
# Navigation bar component.

# │   ├── ProtectedRoute.tsx
# Component to protect routes and ensure only authenticated users can access them.

# │   ├── SearchBar.tsx
# Component with a search bar for users to search stock symbols.

# │   ├── SearchResult.tsx
# Component to display individual search results.

# │   ├── Sidebar.tsx
# Sidebar component.

# │   └── NotFound.tsx
# Component to display a 404 Not Found page.

# ├── contexts/
# │   └── ContextProvider.tsx
# Context provider for managing authentication state.

# ├── pages/
# │   ├── Dashboard.tsx
# Main dashboard page displayed after login.

# │   ├── Login.tsx
# Login page.

# │   └── Signup.tsx
# Signup page.

# ├── App.tsx
# The main application component that sets up routing and layout.

# ├── index.tsx
# Entry point for the React application.

# └── main.tsx
# Main setup file.

# .gitignore
# Specifies which files and directories to ignore in version control.

# package.json
# Lists dependencies and scripts for the project.

# README.md
# Contains information about the project.

# tsconfig.json
# TypeScript configuration file.
"""
```

## **Contributing**

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the repository.
2. Create a new branch (**`git checkout -b feature-branch`**).
3. Commit your changes (**`git commit -m 'Add new feature'`**).
4. Push to the branch (**`git push origin feature-branch`**).
5. Open a pull request.

## **License**

This project is licensed under the MIT License. See the LICENSE file for more details.
