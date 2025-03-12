# Agentify Framework

A lightweight framework to make your components smarter by attaching semantic metadata for AI agents and automation tools.

## Installation

```bash
npm install @anvos/agentify-components
```

## Features

- **Semantic Components**: Add rich metadata to UI components making them "agent-aware"
- **Multiple Component Types**: Support for search bars, forms, and buttons
- **Configurable Behaviors**: Define navigation, API, and UI interaction behaviors
- **MCP Integration**: Generate configuration for Mission Control Protocol
- **Validation**: Automatic validation of component configurations

## Usage Examples

### Search Bar Components

```jsx
import { agentifySearchBar } from '@anvos/agentify-components';

// Your original search component
const MySearchBar = (props) => {
  return (
    <input 
      type="search" 
      onChange={(e) => props.onSearch(e.target.value)}
      placeholder="Search..." 
    />
  );
};

// Navigation-based search
const NavigationSearchBar = agentifySearchBar({
  behavior: {
    type: 'navigation',
    page: '/search-results',
    queryParam: 'q'
  }
})(MySearchBar);

// API-based search
const ApiSearchBar = agentifySearchBar({
  behavior: {
    type: 'api',
    endpoint: '/api/search',
    method: 'GET',
    queryParam: 'query'
  }
})(MySearchBar);
```

### Form Components

```jsx
import { agentifyForm } from '@anvos/agentify-components';

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
```

### Button Components

```jsx
import { agentifyButton } from '@anvos/agentify-components';

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

### Generating MCP Configuration

```jsx
import { generateMCPConfig } from '@anvos/agentify-components';

// Get the configuration as JSON
const mcpConfig = generateMCPConfig();
```

## Documentation

- [Setup Guide](docs/setup.md) - Detailed instructions and configuration options
- [Product Requirements Document](docs/product-requirements.md) - Full project specification and roadmap

## License

MIT 