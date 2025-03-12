# Setup Guide for Agentify Framework

This guide will help you set up and integrate the Agentify framework into your projects.

## Installation

Install the package using npm:

```bash
npm install @anvos/agentify-components
```

Or using yarn:

```bash
yarn add @anvos/agentify-components
```

## Basic Usage

### 1. Import the Needed HOCs

```jsx
import { 
  agentifySearchBar, 
  agentifyForm, 
  agentifyButton 
} from '@anvos/agentify-components';
```

### 2. Configure and Wrap Your Components

#### Search Bar Components

```jsx
// Your original component
const MySearchBar = (props) => {
  return (
    <input 
      type="search" 
      onChange={(e) => props.onSearch(e.target.value)} 
    />
  );
};

// Navigation-based search
const NavigationSearchBar = agentifySearchBar({
  behavior: {
    type: 'navigation',
    page: '/search-results',
    queryParam: 'q'
  },
  description: 'Main site search'
})(MySearchBar);

// API-based search
const ApiSearchBar = agentifySearchBar({
  behavior: {
    type: 'api',
    endpoint: '/api/search',
    method: 'GET',
    queryParam: 'query'
  },
  description: 'API search component'
})(MySearchBar);
```

#### Form Components

```jsx
// Your original form component
const MyForm = (props) => {
  // Form implementation
  // ...
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};

// Login form
const LoginForm = agentifyForm({
  behavior: {
    type: 'api',
    endpoint: '/api/login',
    method: 'POST'
  },
  fields: [
    { name: 'username', type: 'text', required: true },
    { name: 'password', type: 'password', required: true }
  ],
  purpose: 'login'
})(MyForm);

// Signup form
const SignupForm = agentifyForm({
  behavior: {
    type: 'navigation',
    action: '/register',
    method: 'POST'
  },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' }
  ],
  purpose: 'signup'
})(MyForm);
```

#### Button Components

```jsx
// Your original button component
const MyButton = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.children}
    </button>
  );
};

// Navigation button
const DashboardButton = agentifyButton({
  behavior: {
    type: 'navigation',
    href: '/dashboard'
  },
  label: 'Go to Dashboard'
})(MyButton);

// API button
const RefreshButton = agentifyButton({
  behavior: {
    type: 'api',
    endpoint: '/api/refresh-data',
    method: 'GET'
  },
  label: 'Refresh Data'
})(MyButton);

// UI button
const ModalButton = agentifyButton({
  behavior: {
    type: 'ui',
    action: 'toggle-modal',
    target: '#myModal'
  },
  label: 'Open Modal'
})(MyButton);
```

### 3. Use in Your Application

```jsx
function App() {
  const handleSearch = (query) => {
    // Handle the search
    console.log(`Searching for: ${query}`);
  };

  const handleFormSubmit = (values) => {
    // Handle form submission
    console.log('Form submitted:', values);
  };

  return (
    <div>
      <NavigationSearchBar onSearch={handleSearch} />
      <LoginForm onSubmit={handleFormSubmit} />
      <DashboardButton />
    </div>
  );
}
```

## Generating MCP Configuration

To generate configuration for the MCP (Mission Control Protocol) server:

```jsx
import { generateMCPConfig } from '@anvos/agentify-components';

// Generate JSON configuration for MCP
const mcpConfig = generateMCPConfig();
console.log(mcpConfig);
```

### Writing to a File During Build

The framework is designed to be used during the build process to generate an MCP server configuration file:

```javascript
// In your build script
const fs = require('fs');
const { writeMCPConfig } = require('@anvos/agentify-components');

writeMCPConfig('mcp-config.json', fs.writeFile);
```

## Component Configuration Options

### Search Bar Options

```javascript
{
  // Required
  behavior: {
    // Required - 'navigation' or 'api'
    type: 'navigation', 
    
    // For navigation type
    page: '/search-results', // The page to navigate to
    queryParam: 'q', // The query parameter name
    
    // For API type
    endpoint: '/api/search', // The API endpoint
    method: 'GET', // The HTTP method
    queryParam: 'query' // The query parameter name
  },
  
  // Optional
  selector: '#search-bar', // CSS selector for the component
  description: 'Main search bar' // Human-readable description
}
```

### Form Options

```javascript
{
  // Required
  behavior: {
    // Required - 'navigation' or 'api'
    type: 'api',
    
    // For navigation type
    action: '/submit-form', // The form action
    method: 'POST', // The HTTP method
    
    // For API type
    endpoint: '/api/submit', // The API endpoint
    method: 'POST' // The HTTP method
  },
  
  // Required
  fields: [
    { 
      name: 'username', // Field name
      type: 'text', // Field type
      required: true // Is the field required?
    },
    // More fields...
  ],
  
  // Optional
  purpose: 'login', // The purpose of the form
  selector: '#login-form', // CSS selector
  description: 'User login form' // Human-readable description
}
```

### Button Options

```javascript
{
  // Required
  behavior: {
    // Required - 'navigation', 'api', or 'ui'
    type: 'navigation',
    
    // For navigation type
    href: '/dashboard', // The URL to navigate to
    
    // For API type
    endpoint: '/api/action', // The API endpoint
    method: 'POST', // The HTTP method
    
    // For UI type
    action: 'toggle-modal', // The UI action to perform
    target: '#modal-id' // The target element
  },
  
  // Required
  label: 'Go to Dashboard', // Button label
  
  // Optional
  selector: '#dashboard-btn', // CSS selector
  description: 'Dashboard navigation button' // Human-readable description
}
```

## Troubleshooting

### Common Issues

- **Validation errors**: Check your configuration objects to ensure they have all required fields
- **Component not registering**: Ensure your components are being rendered at least once
- **React hooks errors**: The HOCs use React hooks, so ensure you're using React 16.8+ and following the rules of hooks

For more help, please [open an issue](https://github.com/yourname/agentify/issues) on our GitHub repository. 