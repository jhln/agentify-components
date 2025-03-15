import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { handleApiCall, handleNavigation, handleDefault } from './handlers.js';

async function main() {
  // Create server instance
  const server = new McpServer({
    name: "mcp-server",
    version: "1.0.0",
  });


// Register button_0117235c-428e-4cec-b215-ddb8e2bfa8c7 tool
server.tool(
  "LoginButton",
  "Submits login form via API | Label: Login Button",
  {

  },
  async (params) => {
    console.log("Executing LoginButton with params:", params);
    

    const config = {"name":"LoginButton","type":"button","behavior":{"type":"api","endpoint":"/api/login","method":"POST"},"label":"Login Button","selector":"#login-btn","description":"Submits login form via API"};
    
    const result = await handleApiCall(config, params);
    // Placeholder for tool implementation
    return {
      content: [
        {
          type: "text",
          text: "Tool execution placeholder for LoginButton"
        }
      ]
    };
  }
);


// Register button_b3a72ae8-6a16-4fe7-94f5-a04d50bc016a tool
server.tool(
  "LoginButton2",
  "Submits login form via API | Label: Login Button",
  {

  },
  async (params) => {
    console.log("Executing LoginButton2 with params:", params);
    

    const config = {"name":"LoginButton2","type":"button","behavior":{"type":"api","endpoint":"/api/login","method":"POST"},"label":"Login Button","description":"Submits login form via API"};
    
    const result = await handleApiCall(config, params);
    // Placeholder for tool implementation
    return {
      content: [
        {
          type: "text",
          text: "Tool execution placeholder for LoginButton2"
        }
      ]
    };
  }
);


// Register button_86560759-de7c-4c11-b267-12904ba8504b tool
server.tool(
  "HomeButton",
  "Navigates to the home page | Label: Home Button",
  {

  },
  async (params) => {
    console.log("Executing HomeButton with params:", params);
    
      const config = {"name":"HomeButton","type":"button","behavior":{"type":"navigation","url":"/home"},"label":"Home Button","description":"Navigates to the home page"};
      const result = await handleNavigation(config, params);
    // Placeholder for tool implementation
    return {
      content: [
        {
          type: "text",
          text: "Tool execution placeholder for HomeButton"
        }
      ]
    };
  }
);

  // Start the server
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});