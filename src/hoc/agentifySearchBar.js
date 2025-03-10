import React from 'react';
import { registerComponent } from '../utils/registry';

/**
 * Higher-order component that wraps a search bar and adds "agentified" behavior
 * 
 * @param {React.Component} WrappedComponent - The component to wrap
 * @returns {React.Component} - The enhanced component
 */
export function agentifySearchBar(WrappedComponent) {
  return function AgentifiedSearchBar(props) {
    // Register the component in the registry
    React.useEffect(() => {
      registerComponent('SearchBar', { 
        type: 'input', 
        behavior: 'search',
        capabilities: ['text-search', 'query-enhancement']
      });
    }, []);

    // Add enhanced behavior (e.g., intelligent search handling)
    const handleSearch = (value) => {
      console.log(`Searching: ${value}`);
      
      // Here you would eventually add intelligent behavior:
      // - Query enhancement
      // - Search suggestions
      // - Action inference
      
      // For now, pass through to the original handler if it exists
      if (props.onSearch) {
        props.onSearch(value);
      }
    };

    // Pass the enhanced handler to the wrapped component
    return <WrappedComponent {...props} onSearch={handleSearch} />;
  };
} 