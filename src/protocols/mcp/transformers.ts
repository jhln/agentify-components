import { getAgentConfig } from '../../utils/metadata';
import { AgentComponent } from '../models';
import { MCPConfigOptions, MCPTool } from './models';

import { v4 as uuidv4 } from 'uuid';

// MCP Transformer: Produces a tool definition for MCP protocol
export function mcpToolTransformer(component: AgentComponent): MCPTool {

  // Get the agent specific config

  const config = getAgentConfig(component);


  // Transform the config into the MCP tool with all available metadata
  
  // Create execute function with closure over the full config object
  const createExecuteFunction = () => {
    // Store a reference to the config for use in the execute function
    const configRef = { ...config };


    
    return async (params: any) => {
      const behavior = configRef.behavior;
      
      switch (behavior.type) {
        case 'api':
          // Handle API call behavior
          if (behavior.endpoint) {
            try {
              const response = await fetch(behavior.endpoint, {
                method: behavior.method || 'GET',
                headers: behavior.headers || { 'Content-Type': 'application/json' },
                body: behavior.method !== 'GET' && params ? JSON.stringify(params) : undefined
              });
              return await response.json();
            } catch (error) {
              console.error(`Error executing API call: ${error}`);
              throw error;
            }
          }
          break;
          
        case 'navigation':
          // Handle navigation behavior
          if (behavior.url) {
            try {
              // This would typically be handled by a navigation system
              return { 
                url: behavior.url, 
                params,
                type: configRef.type,
                selector: configRef.selector 
              };
            } catch (error) {
              console.error(`Error executing navigation: ${error}`);
              throw error;
            }
          }
          break;
          
        default:
          // Default behavior for unknown types
          console.warn(`Behavior type '${behavior.type}' not implemented`);
          return { 
            params, 
            message: `Executed ${configRef.name} with default handler`,
            componentType: configRef.type,
            behavior: behavior.type
          };
      }
    };
  };



  // Generate a proper ID if not provided
  const toolId = config["id"] || `${config["type"]}_${uuidv4()}`;
  
  // Create a more descriptive tool description that includes metadata
  const enhancedDescription = `${config["description"] || `Tool for ${config["type"]}`}${
    config["label"] ? ` | Label: ${config["label"]}` : ''
  }`;

  // Extract properties from inputSchema if available
  const properties = config["inputSchema"]?.properties || {};
  const requiredFields = config["inputSchema"]?.required || [];

  
  // Create a metadata object that can be used for debugging or introspection
  const metadata = {
    toolType: config.type,
    behaviorType: config.behavior.type,
    componentSelector: config.selector,
    componentLabel: config.label
  };
  
  // Add metadata as a comment in the description for better debugging
  // const descriptionWithMetadata = `${enhancedDescription}`;

  return {
    id: toolId,
    name: config.name,
    description: enhancedDescription,
    inputSchema: {
      type: config.inputSchema?.type || 'object',
      properties,
      required: requiredFields
    },
    // Implement the execute function with closure over config
    execute: createExecuteFunction()
  };
}

// EXAMPLES

// {
//     name: "github_create_issue",
//     description: "Create a GitHub issue",
//     inputSchema: {
//       type: "object",
//       properties: {
//         title: { type: "string" },
//         body: { type: "string" },
//         labels: { type: "array", items: { type: "string" } }
//       }
//     }
//   }


//   {
//     name: "execute_command",
//     description: "Run a shell command",
//     inputSchema: {
//       type: "object",
//       properties: {
//         command: { type: "string" },
//         args: { type: "array", items: { type: "string" } }
//       }
//     }
//   }