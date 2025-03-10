/**
 * Simple example application showing the Agentify framework in action
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { agentifySearchBar, getConfig } from '../../src/index';

// A basic search bar component
const SimpleSearchBar = (props) => {
  return (
    <div className="search-container">
      <input
        type="search"
        onChange={(e) => props.onSearch(e.target.value)}
        placeholder="Search for something..."
        className="search-input"
      />
      <button className="search-button">Search</button>
    </div>
  );
};

// Enhance it with agentify
const AgentifiedSearchBar = agentifySearchBar(SimpleSearchBar);

// Render the agentified component
function App() {
  const [searchResults, setSearchResults] = React.useState([]);
  
  const handleSearch = (query) => {
    console.log(`App received search query: ${query}`);
    // Simulate search results
    setSearchResults([
      `Result 1 for "${query}"`,
      `Result 2 for "${query}"`,
      `Result 3 for "${query}"`
    ]);
  };
  
  return (
    <div className="app">
      <h1>Agentify Example - Smart Search</h1>
      <AgentifiedSearchBar onSearch={handleSearch} />
      
      <div className="results">
        {searchResults.map((result, idx) => (
          <div key={idx} className="result-item">{result}</div>
        ))}
      </div>
      
      <div className="debug">
        <h3>Component Registry Configuration:</h3>
        <pre>{getConfig()}</pre>
      </div>
    </div>
  );
}

// Mount the app
ReactDOM.render(<App />, document.getElementById('root')); 