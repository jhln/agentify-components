# Agentify Framework

A lightweight framework to make your components smarter.

## Installation

```bash
npm install @anvos/agentify-components
```

## Usage

```jsx
import { agentifySearchBar } from '@anvos/agentify-components';

const MySearchBar = (props) => {
  // Your regular search bar component
  return (
    <input 
      type="search" 
      onChange={(e) => props.onSearch(e.target.value)} 
      placeholder="Search..."
    />
  );
};

// Turn it into a smart, agent-aware component
const AgentifiedSearchBar = agentifySearchBar(MySearchBar);

// Use it in your app
function App() {
  return <AgentifiedSearchBar />;
}
```

## Features

- Makes UI components agent-aware
- Connects to MCP (Mission Control Protocol) for enhanced behavior
- Lightweight and easy to integrate

## Documentation

See the [setup guide](docs/setup.md) for detailed instructions.

## License

MIT 