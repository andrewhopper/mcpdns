"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastmcp_1 = require("fastmcp");
const mcp_tool_controller_1 = require("./controllers/mcp-tool-controller");
async function main() {
    try {
        // Initialize the FastMCP server
        const mcpServer = new fastmcp_1.FastMCP({
            name: 'mcpdns',
            description: 'DNS & Domain Troubleshooting MCP Server',
            version: '1.0.0',
            port: process.env.PORT ? parseInt(process.env.PORT) : 3000
        });
        // Register MCP tools
        (0, mcp_tool_controller_1.registerTools)(mcpServer);
        // Start the server
        await mcpServer.start();
        console.log(`MCP Server started on port ${mcpServer.port}`);
    }
    catch (error) {
        console.error('Failed to start MCP server:', error);
        process.exit(1);
    }
}
main();
