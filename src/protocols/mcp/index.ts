import { buildMCPFolder } from "./generator";
import { mcpToolTransformer } from "./transformers";
import { getAgentConfig } from "../../utils/metadata";
import { AgentComponent } from "../models";


export function generateMCPServer(components: any[], buildPath: string) {
    const tools = components
      .filter(comp => {
        // Get the component config
        const config = getAgentConfig(comp);
        
        // Log component and its config for debugging
        console.log(`Processing component:`, 
          typeof comp === 'function' ? comp.name : comp.constructor.name);
        console.log(`Component config:`, config);
        
        // Only include components with valid configs
        if (!config) {
          console.warn(`Skipping component with missing config: ${
            typeof comp === 'function' ? comp.name : comp.constructor.name
          }`);
          return false;
        }
        
        return true;
      })
      .map(comp => {
        return mcpToolTransformer(comp);
      });

    console.log(`Generated ${tools.length} MCP tools from ${components.length} components`);
    
    return buildMCPFolder(tools, buildPath);
}


export type {AgentComponent}
