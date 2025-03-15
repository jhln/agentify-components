import { MCPTool } from './models';
import fs from 'fs';
import path from 'path';
import { z } from "zod";
  
  // MCP Generator: Produces a server file with tool definitions
  function mcpServerGenerator(tools: MCPTool[]) {
    const toolDefinitions = tools.map(tool => {
      // Convert the JSON schema to a simplified zod schema representation
      // This is a basic conversion - complex schemas would need more handling

      // Is there a better way to do this?


      const zodSchema = Object.entries(tool.inputSchema.properties || {}).map(([key, prop]: [string, any]) => {
        let zodType = 'z.string()';
        if (prop.type === 'number') zodType = 'z.number()';
        if (prop.type === 'boolean') zodType = 'z.boolean()';
        if (prop.type === 'array') zodType = 'z.array(z.string())';
        if (prop.type === 'object') zodType = 'z.object({})';
        if (prop.type === 'string') zodType = 'z.string()';
        if (prop.type === 'integer') zodType = 'z.number()';
        if (prop.type === 'float') zodType = 'z.number()';
        if (prop.type === 'date') zodType = 'z.date()';
        if (prop.type === 'datetime') zodType = 'z.date()';
        if (prop.type === 'time') zodType = 'z.date()';
        
        
        return `    ${key}: ${zodType}.describe("${prop.description || ''}")`;
      }).join(',\n');

      return `
// Register ${tool.id} tool
server.tool(
  "${tool.name}",
  "${tool.description}",
  {
${zodSchema}
  },
  async (params) => {
    console.log("Executing ${tool.name} with params:", params);
    ${tool.execute}
    // Placeholder for tool implementation
    return {
      content: [
        {
          type: "text",
          text: "Tool execution placeholder for ${tool.name}"
        }
      ]
    };
  }
);`;
    }).join('\n\n');

    return `
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { handleApiCall, handleNavigation, handleDefault } from './handlers.js';

async function main() {
  // Create server instance
  const server = new McpServer({
    name: "mcp-server",
    version: "1.0.0",
  });

${toolDefinitions}

  // Start the server
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
    `.trim();
  }

  function packageJsonGenerator() {
    return `
    {
  "name": "mcp-server-name",
  "version": "1.0.0",
  "description": "MCP server",
  "license": "MIT",
  "author": "Anvos",
  "homepage": "",
  "bugs": "",
  "type": "module",
  "bin": {
    "mcp-server-name": "dist/index.js"
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsc && shx chmod +x dist/*.js",
    "prepare": "npm run build",
    "watch": "tsc --watch"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "1.0.1",
    "@types/node": "^22",
    "@types/node-fetch": "^2.6.12",
    "node-fetch": "^3.3.2",
    "universal-user-agent": "^7.0.2",
    "zod": "^3.22.4",
    "zod-to-json-schema": "^3.23.5"
  },
  "devDependencies": {
   "@types/node": "^22",
    "shx": "^0.3.4",
    "typescript": "^5.6.2"
  }
}
    `.trim();
  }


  function tsconfigGenerator() {
    return `
    {
    "extends": "../../tsconfig.json",
    "compilerOptions": {
      "outDir": "./dist",
      "rootDir": "."
    },
    "include": [
      "./**/*.ts"
    ]
  }
  
    `.trim();
  }

  function readmeGenerator() {
    return `
    # MCP Server

    This is a MCP server for the project.

    Make sure to change the name of the server in the package.json file.

    For reference on how other MCP servers look like, check out the [MCP Server Examples](https://github.com/modelcontextprotocol/servers).
    `;
  }

  function dockerFileGenerator() {
    return `
    FROM node:22.12-alpine AS builder
    # CHANGE THIS TO THE CORRECT PATH

    COPY src/postgres /app   
    COPY tsconfig.json /tsconfig.json

    WORKDIR /app

    RUN --mount=type=cache,target=/root/.npm npm install

    RUN --mount=type=cache,target=/root/.npm-production npm ci --ignore-scripts --omit-dev

    FROM node:22-alpine AS release

    COPY --from=builder /app/dist /app/dist
    COPY --from=builder /app/package.json /app/package.json
    COPY --from=builder /app/package-lock.json /app/package-lock.json

    ENV NODE_ENV=production

    WORKDIR /app

    RUN npm ci --ignore-scripts --omit-dev

    ENTRYPOINT ["node", "dist/index.js"]
    `;
  }


  function handlersGenerator() {
    return `
    // Handlers
    // API call handler implementation
export async function handleApiCall(config: any, params: any) {
  const { 
    endpoint, 
    method = 'GET', 
    headers = { 'Content-Type': 'application/json' } 
  } = config;
  
  if (!endpoint) {
    throw new Error('API behavior requires an endpoint');
  }
  
  try {
    const response = await fetch(endpoint, {
      method,
      headers,
      body: method !== 'GET' && params ? JSON.stringify(params) : undefined
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Navigation handler implementation
export async function handleNavigation(config: any, params: any) {
  const { url } = config;
  const { type, selector } = config;
  
  if (!url) {
    throw new Error('Navigation behavior requires a URL');
  }
  
  try {
    return { 
      url, 
      params,
      type,
      selector 
    };
  } catch (error) {
   
    throw error;
  }
}

// Default handler implementation
export async function handleDefault(behaviorType: string, config: any, params: any) {
  const { type, name } = config;
  
  
  return { 
    params, 
    message: "Executed tool __ with default handler",
    componentType: type,
    behavior: behaviorType
  };
} 
    `;
  }
  



  export function buildMCPFolder(tools: MCPTool[] | null, buildPath: string) {
    if (!tools) {
      console.error('No tools provided to buildMCPFolder');
      return;
    }
    const serverCode = mcpServerGenerator(tools);
    const packageJson = packageJsonGenerator();
    const tsconfig = tsconfigGenerator();
    const readme = readmeGenerator();
    const dockerFile = dockerFileGenerator();
    const handlers = handlersGenerator();
    // Generate the other files in the folder
    const folderPath = path.join(buildPath);
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(path.join(folderPath, 'index.ts'), serverCode);
    fs.writeFileSync(path.join(folderPath, 'package.json'), packageJson);
    fs.writeFileSync(path.join(folderPath, 'tsconfig.json'), tsconfig);
    fs.writeFileSync(path.join(folderPath, 'README.md'), readme);
    fs.writeFileSync(path.join(folderPath, 'Dockerfile'), dockerFile);
    fs.writeFileSync(path.join(folderPath, 'handlers.ts'), handlers);
  }
  