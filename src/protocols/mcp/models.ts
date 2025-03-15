
import { AgentComponentConfigOptions } from "../models";
// MCP-specific configuration interface
interface MCPConfigOptions extends AgentComponentConfigOptions {
  //  ADD MCP SPECIFIC CONFIG OPTIONS HERE
}



 type MCPTool = {
    id: string;
    name: string;
    description: string;
    inputSchema: {
      type: string;
      properties: Record<string, { type: string }>;
      required?: string[];
    };
    execute?:   string;

};



  export type { MCPConfigOptions, MCPTool };