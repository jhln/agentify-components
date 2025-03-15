import { getAgentConfig } from '../../utils/metadata';
import { AgentComponent } from '../models';
import { MCPConfigOptions, MCPTool } from './models';

import { v4 as uuidv4 } from 'uuid';

// MCP Transformer: Produces a tool definition for MCP protocol
export function mcpToolTransformer(component: AgentComponent): MCPTool {
  const config = getAgentConfig(component);
  
  // Generate a proper ID if not provided
  const toolId = config["id"] || `${config["type"]}_${uuidv4()}`;
  
  // Create a more descriptive tool description that includes metadata
  const enhancedDescription = `${config["description"] || `Tool for ${config["type"]}`}${
    config["label"] ? ` | Label: ${config["label"]}` : ''
  }`;

  // Extract properties from inputSchema if available
  const properties = config["inputSchema"]?.properties || {};
  const requiredFields = config["inputSchema"]?.required || [];
  
  // Create specialized execute function based on behavior type
  const executeFunction = createSpecializedExecutor(config);

  return {
    id: toolId,
    name: config.name,
    description: enhancedDescription,
    inputSchema: {
      type: config.inputSchema?.type || 'object',
      properties,
      required: requiredFields
    },
    execute: executeFunction
  };
}


function createSpecializedExecutor(config: any) {
  const behaviorType = config.behavior?.type;
  switch (behaviorType) {
    case 'api': {
      const endpoint = config.behavior!.endpoint;
      if (!endpoint) throw new Error('API behavior requires a endpoint');
// return a string here instead but turn it into code that can be executed

    return `

    const config = ${JSON.stringify(config)};
    
    const result = await handleApiCall(config, params);`;
      
    }

    case 'navigation': {
      const url = config.behavior!.url;
      if (!url) throw new Error('Navigation behavior requires a URL');
      return `
      const config = ${JSON.stringify(config)};
      const result = await handleNavigation(config, params);`;
  
    }

    default: {
      const type = behaviorType ?? 'unknown';
      return `const result = await handleDefault(config, params);`;
    }
  }
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