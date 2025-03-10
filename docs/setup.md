# Setup Guide for Agentify Framework

This guide will help you set up and integrate the Agentify framework into your projects.

## Installation

Install the package using npm:

```bash
npm install @yourframework/agentify
```

Or using yarn:

```bash
yarn add @yourframework/agentify
```

## Basic Usage

### 1. Import the Needed HOCs

```jsx
import { agentifySearchBar } from '@yourframework/agentify';
```

### 2. Wrap Your Components

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

// Create the agentified version
const SmartSearchBar = agentifySearchBar(MySearchBar);
```

### 3. Use in Your Application

```jsx
function App() {
  const handleSearch = (query) => {
    // Handle the search
    console.log(`Searching for: ${query}`);
  };

  return (
    <div>
      <SmartSearchBar onSearch={handleSearch} />
    </div>
  );
}
```

## Advanced Configuration

### Generating MCP Configuration

To generate configuration for the MCP (Mission Control Protocol) server:

```jsx
import { getConfig } from '@yourframework/agentify';

// Later in your code
const mcpConfig = getConfig();
console.log(mcpConfig);
```

## Troubleshooting

### Common Issues

- **Component not registering**: Ensure you're using the HOC correctly and the component is rendered at least once
- **React hooks errors**: The HOCs use React hooks, so ensure you're using React 16.8+ and following the rules of hooks

For more help, please [open an issue](https://github.com/yourname/agentify/issues) on our GitHub repository. 