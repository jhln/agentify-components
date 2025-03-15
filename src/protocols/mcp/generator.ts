import { MCPTool } from './models';
import fs from 'fs';
import path from 'path';
import { z } from "zod";
  
  // MCP Generator: Produces a server file with tool definitions
  function mcpServerGenerator(tools: MCPTool[]) {
    const toolDefinitions = tools.map(tool => {
      // Convert the JSON schema to a simplified zod schema representation
      // This is a basic conversion - complex schemas would need more handling
      const zodSchema = Object.entries(tool.inputSchema.properties || {}).map(([key, prop]: [string, any]) => {
        let zodType = 'z.string()';
        if (prop.type === 'number') zodType = 'z.number()';
        if (prop.type === 'boolean') zodType = 'z.boolean()';
        
        return `    ${key}: ${zodType}.describe("${prop.description || ''}")`;
      }).join(',\n');

      return `
// Register ${tool.name} tool
server.tool(
  "${tool.name}",
  "${tool.description}",
  {
${zodSchema}
  },
  async (params) => {
    console.log("Executing ${tool.name} with params:", params);
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
  



  export function buildMCPFolder(tools: MCPTool[], buildPath: string) {
    const serverCode = mcpServerGenerator(tools);
    const packageJson = packageJsonGenerator();
    const tsconfig = tsconfigGenerator();
    const readme = readmeGenerator();
    const dockerFile = dockerFileGenerator();
    // Generate the other files in the folder
    const folderPath = path.join(buildPath);
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(path.join(folderPath, 'index.ts'), serverCode);
    fs.writeFileSync(path.join(folderPath, 'package.json'), packageJson);
    fs.writeFileSync(path.join(folderPath, 'tsconfig.json'), tsconfig);
    fs.writeFileSync(path.join(folderPath, 'README.md'), readme);
    fs.writeFileSync(path.join(folderPath, 'Dockerfile'), dockerFile);
  }
  