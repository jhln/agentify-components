/**
 * Simple example application showing the Agentify framework in action
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { 
  agentifySearchBar,
  agentifyForm,
  agentifyButton,
  generateMCPConfig
} from '../../src/index';

// ------ Basic Component Implementations ------

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

// A basic form component
const SimpleForm = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.onSubmit) {
      props.onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="simple-form">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

// A basic button component
const SimpleButton = (props) => {
  return (
    <button
      className="simple-button"
      onClick={props.onClick}
    >
      {props.children || props.label || 'Button'}
    </button>
  );
};

// ------ Agentify the components ------

// Navigation search bar
const NavigationSearchBar = agentifySearchBar({
  behavior: {
    type: 'navigation',
    page: '/search-results',
    queryParam: 'q'
  },
  selector: '#main-search',
  description: 'Main site search bar'
})(SimpleSearchBar);

// API-based search bar
const ApiSearchBar = agentifySearchBar({
  behavior: {
    type: 'api',
    endpoint: '/api/search',
    method: 'GET',
    queryParam: 'query'
  },
  description: 'API-based search bar'
})(SimpleSearchBar);

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
  purpose: 'login',
  description: 'User login form'
})(SimpleForm);

// Navigation button
const DashboardButton = agentifyButton({
  behavior: {
    type: 'navigation',
    href: '/dashboard'
  },
  label: 'Go to Dashboard',
  description: 'Button to navigate to dashboard'
})(SimpleButton);

// API button
const RefreshButton = agentifyButton({
  behavior: {
    type: 'api',
    endpoint: '/api/refresh',
    method: 'GET'
  },
  label: 'Refresh Data',
  description: 'Button to refresh data from API'
})(SimpleButton);

// UI button
const ModalButton = agentifyButton({
  behavior: {
    type: 'ui',
    action: 'toggle-modal',
    target: '#settings-modal'
  },
  label: 'Open Settings',
  description: 'Button to open settings modal'
})(SimpleButton);

// ------ Main App Component ------

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [notifications, setNotifications] = useState([]);
  
  // Handle search
  const handleSearch = (query) => {
    console.log(`App received search query: ${query}`);
    setSearchResults([
      `Result 1 for "${query}"`,
      `Result 2 for "${query}"`,
      `Result 3 for "${query}"`
    ]);
  };
  
  // Handle form submission
  const handleLogin = (data) => {
    console.log('Login data:', data);
    setNotifications([...notifications, `Logged in as ${data.username}`]);
  };
  
  // Handle button clicks
  const handleDashboardClick = () => {
    setCurrentView('dashboard');
    setNotifications([...notifications, 'Navigated to dashboard']);
  };
  
  const handleRefreshClick = () => {
    setNotifications([...notifications, 'Data refreshed']);
  };
  
  const handleModalClick = () => {
    setNotifications([...notifications, 'Settings modal toggled']);
  };
  
  return (
    <div className="app">
      <header>
        <h1>Agentify Example - Component Demo</h1>
        <div className="view-controls">
          <button onClick={() => setCurrentView('home')}>Home</button>
          <button onClick={() => setCurrentView('search')}>Search</button>
          <button onClick={() => setCurrentView('login')}>Login</button>
          <button onClick={() => setCurrentView('buttons')}>Buttons</button>
          <button onClick={() => setCurrentView('config')}>Config</button>
        </div>
      </header>
      
      <main>
        {currentView === 'home' && (
          <div className="home-view">
            <h2>Welcome to the Agentify Demo</h2>
            <p>This demo shows how to use agentified components to enhance your UI with metadata for AI agents.</p>
            <p>Use the navigation above to explore different component types.</p>
          </div>
        )}
        
        {currentView === 'search' && (
          <div className="search-view">
            <h2>Agentified Search Bars</h2>
            
            <section>
              <h3>Navigation Search</h3>
              <p>This search bar would navigate to a search results page</p>
              <NavigationSearchBar onSearch={handleSearch} />
            </section>
            
            <section>
              <h3>API Search</h3>
              <p>This search bar would call an API endpoint</p>
              <ApiSearchBar onSearch={handleSearch} />
            </section>
            
            {searchResults.length > 0 && (
              <div className="results">
                <h3>Search Results</h3>
                {searchResults.map((result, idx) => (
                  <div key={idx} className="result-item">{result}</div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {currentView === 'login' && (
          <div className="login-view">
            <h2>Agentified Form</h2>
            <p>This form has been agentified with metadata about its purpose and fields</p>
            <LoginForm onSubmit={handleLogin} />
          </div>
        )}
        
        {currentView === 'buttons' && (
          <div className="buttons-view">
            <h2>Agentified Buttons</h2>
            
            <section>
              <h3>Navigation Button</h3>
              <p>This button would navigate to another page</p>
              <DashboardButton onClick={handleDashboardClick}>Go to Dashboard</DashboardButton>
            </section>
            
            <section>
              <h3>API Button</h3>
              <p>This button would call an API endpoint</p>
              <RefreshButton onClick={handleRefreshClick} />
            </section>
            
            <section>
              <h3>UI Button</h3>
              <p>This button would perform a UI action</p>
              <ModalButton onClick={handleModalClick} />
            </section>
          </div>
        )}
        
        {currentView === 'config' && (
          <div className="config-view">
            <h2>MCP Configuration</h2>
            <p>This is the configuration that would be sent to the MCP server:</p>
            <pre className="config-json">{generateMCPConfig()}</pre>
          </div>
        )}
      </main>
      
      <aside className="notifications">
        <h3>Activity Log</h3>
        <ul>
          {notifications.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

// Mount the app
ReactDOM.render(<App />, document.getElementById('root')); 