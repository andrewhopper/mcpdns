import { FastMCP } from 'fastmcp';
import { registerTools } from './controllers/mcp-tool-controller';

async function main() {
  try {
    // Initialize the FastMCP server
    const mcpServer = new FastMCP({
      name: 'mcpdns',
      version: '1.0.0'
    });

    // Register MCP tools
    registerTools(mcpServer);

    // Start the server
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    await mcpServer.start({
      transportType: "sse",
      sse: {
        endpoint: "/mcp",
        port: port
      }
    });
    console.log(`MCP Server started on port ${port}`);
  } catch (error) {
    console.error('Failed to start MCP server:', error);
    process.exit(1);
  }
}

main();