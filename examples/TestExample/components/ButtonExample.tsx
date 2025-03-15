/**
 * Example file demonstrating how to use the @AgentConfig decorator
 * This shows both class component and functional component implementations
 */

import React from 'react';
import { AgentConfig } from '@anvos/agentify-components';
import {  AgentComponent } from '@anvos/agentify-components';


// Example 1: Functional Component with agentConfig (extra setup of exporting agentConfig attached to the Component)
// Since decorators only work directly with classes in TypeScript,
// for functional components, you need to export manually
//




// First define the component
export const LoginButton: AgentComponent = () => {
  return <button id="login-btn">Login</button>;
};

LoginButton.agentConfig = {
  type: 'button',
  behavior: { type: 'api', endpoint: '/api/login', method: 'POST' },
  label: 'Login Button',
  // selector: '#login-btn',
  description: 'Submits login form via API'
};





//
// Example 2: Class Component with decorator
//
@AgentConfig({
  type: 'button',
  behavior: { type: 'navigation', href: '/home' },
  label: 'Home Button',
  // selector: '#home-btn',
  description: 'Navigates to the home page'
})
class HomeButton extends React.Component {
  render() {
    return <button id="home-btn">Home</button>;
  }
}


// Export class component
export { HomeButton }; 







