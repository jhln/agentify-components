/**
 * Registry for agentified components
 * Stores metadata about components and generates configuration
 */

// Store for component metadata
const registry = {};

/**
 * Register a component in the registry
 * @param {string} name - Component identifier
 * @param {object} metadata - Component metadata
 */
export function registerComponent(name, metadata) {
  registry[name] = {
    ...metadata,
    registeredAt: new Date().toISOString()
  };
  
  console.log(`Component '${name}' registered with agentify.`);
  return registry[name];
}

/**
 * Get the complete registry
 * @returns {object} The registry object
 */
export function getRegistry() {
  return { ...registry };
}

/**
 * Generate configuration for MCP server
 * @returns {string} JSON configuration
 */
export function getConfig() {
  return JSON.stringify(registry, null, 2);
}

/**
 * Clear the registry
 */
export function clearRegistry() {
  Object.keys(registry).forEach(key => {
    delete registry[key];
  });
} 