/**
 * Agentify Framework - Main Entry Point
 * A lightweight framework to make your components smarter with agent metadata.
 */

// Export the higher-order components
export { agentifySearchBar } from './hoc/agentifySearchBar';
export { agentifyForm } from './hoc/agentifyForm';
export { agentifyButton } from './hoc/agentifyButton';

// Export the registry utilities
export { 
  registerAgentifiedComponent,
  getRegisteredComponents,
  generateMCPConfig,
  writeMCPConfig,
  clearRegistry
} from './utils/registry'; 