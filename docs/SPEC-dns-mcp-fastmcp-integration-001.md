---
id: SPEC-dns-mcp-fastmcp-integration-001
created: 2025-04-12
---

# FastMCP Framework Integration

## 1. Introduction

This document details how the DNS MCP Server integrates with the fastmcp framework to provide DNS and WHOIS lookup tools within an IDE. The fastmcp framework simplifies the creation of Model Context Protocol (MCP) servers by providing a standardized structure and communication protocol.

## 2. FastMCP Architecture Integration

The DNS MCP Server leverages the fastmcp framework to handle communication with the IDE client. The following diagram illustrates the integration architecture:

```mermaid
graph TD
    subgraph "IDE"
        IDE[User in IDE]
        MCP_Client[MCP Client]
    end
    
    subgraph "fastmcp Framework"
        Server[FastMCP Server]
        Router[Tool Router]
        Schema[Schema Validator]
        Auth[Authentication]
    end
    
    subgraph "DNS MCP Implementation"
        subgraph "Controllers"
            C1[DNS Lookup Controller]
            C2[WHOIS Lookup Controller]
        end
        
        subgraph "Models"
            M1[DNS Lookup Model]
            M2[WHOIS Lookup Model]
            M3[Provider Manager]
            M4[Cache Manager]
        end
        
        subgraph "Services"
            S1[DNS Service]
            S2[WHOIS Service]
            S3[Cache Service]
        end
    end
    
    IDE --> MCP_Client
    MCP_Client --> Server
    
    Server --> Router
    Router --> Schema
    Router --> Auth
    
    Router --> C1
    Router --> C2
    
    C1 --> M1
    C2 --> M2
    M1 --> M3
    M1 --> M4
    M2 --> M4
    
    M1 --> S1
    M2 --> S2
    M4 --> S3
    
    M3 --> DNS1[Google DNS]
    M3 --> DNS2[OpenDNS]
    M3 --> DNS3[Cloudflare DNS]
```

## 3. Server Configuration

### 3.1 Installation and Setup

```javascript
// Example server setup using fastmcp
import { createServer } from 'fastmcp';
import { dnsLookupTool, whoisLookupTool } from './tools';

const server = createServer({
  name: 'dns-mcp-server',
  description: 'DNS and WHOIS lookup tools for IDE integration',
  version: '1.0.0',
  tools: [dnsLookupTool, whoisLookupTool]
});

server.start({ port: process.env.PORT || 3000 });
```

### 3.2 Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `port` | Port number for the server | 3000 |
| `host` | Host address to bind to | 0.0.0.0 |
| `cors` | CORS configuration | Enabled for all origins |
| `auth` | Authentication configuration | None |
| `timeout` | Request timeout in milliseconds | 30000 |
| `logLevel` | Logging verbosity | 'info' |

### 3.3 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No |
| `HOST` | Server host | No |
| `LOG_LEVEL` | Logging level | No |
| `GOOGLE_DNS_API_KEY` | API key for Google DNS (if needed) | No |
| `OPENDNS_API_KEY` | API key for OpenDNS (if needed) | No |
| `CLOUDFLARE_API_KEY` | API key for Cloudflare (if needed) | No |
| `WHOIS_API_KEY` | API key for WHOIS service | No |
| `CACHE_ENABLED` | Enable caching (true/false) | No |
| `CACHE_TTL` | Default cache TTL in seconds | No |

## 4. Tool Definitions

### 4.1 DNS Lookup Tool

```javascript
// Example DNS lookup tool definition
const dnsLookupTool = {
  name: 'dns_lookup',
  description: 'Look up DNS records for a domain',
  inputSchema: {
    type: 'object',
    properties: {
      domain: {
        type: 'string',
        description: 'Domain name to look up'
      },
      recordType: {
        type: 'string',
        enum: ['NS'],
        description: 'Record type to look up',
        default: 'NS'
      },
      provider: {
        type: 'string',
        enum: ['google', 'opendns', 'cloudflare', 'all'],
        description: 'DNS provider to use',
        default: 'google'
      },
      useCache: {
        type: 'boolean',
        description: 'Whether to use cached results if available',
        default: false
      }
    },
    required: ['domain']
  },
  outputSchema: {
    type: 'object',
    properties: {
      domain: { type: 'string' },
      recordType: { type: 'string' },
      provider: { type: 'string' },
      fromCache: { type: 'boolean' },
      results: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            provider: { type: 'string' },
            records: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  ttl: { type: 'number' },
                  value: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  },
  handler: async (params) => {
    // Implementation handled by DNS Lookup Controller
  }
};
```

### 4.2 WHOIS Lookup Tool

```javascript
// Example WHOIS lookup tool definition
const whoisLookupTool = {
  name: 'whois_lookup',
  description: 'Look up WHOIS information for a domain',
  inputSchema: {
    type: 'object',
    properties: {
      domain: {
        type: 'string',
        description: 'Domain name to look up'
      },
      useCache: {
        type: 'boolean',
        description: 'Whether to use cached results if available',
        default: false
      }
    },
    required: ['domain']
  },
  outputSchema: {
    type: 'object',
    properties: {
      domain: { type: 'string' },
      fromCache: { type: 'boolean' },
      registrar: { type: 'string' },
      creationDate: { type: 'string', format: 'date-time' },
      expirationDate: { type: 'string', format: 'date-time' },
      nameservers: {
        type: 'array',
        items: { type: 'string' }
      }
    }
  },
  handler: async (params) => {
    // Implementation handled by WHOIS Lookup Controller
  }
};
```

## 5. Request/Response Flow

### 5.1 Request Processing

1. The IDE client sends a request to the fastmcp server
2. The server validates the request against the tool's input schema
3. The request is routed to the appropriate tool handler
4. The tool handler delegates to the corresponding controller
5. The controller processes the request using the appropriate models
6. The result is formatted according to the tool's output schema
7. The response is sent back to the IDE client

### 5.2 Error Handling

The fastmcp framework provides standardized error handling:

```javascript
try {
  // Process request
} catch (error) {
  return {
    error: {
      code: error.code || 'INTERNAL_ERROR',
      message: error.message,
      details: error.details || {}
    }
  };
}
```

Common error codes:

| Error Code | Description |
|------------|-------------|
| `INVALID_INPUT` | Input validation failed |
| `DOMAIN_NOT_FOUND` | Domain does not exist |
| `PROVIDER_ERROR` | DNS provider returned an error |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `TIMEOUT` | Request timed out |
| `INTERNAL_ERROR` | Unexpected server error |

## 6. Authentication and Security

### 6.1 Authentication Methods

The fastmcp framework supports multiple authentication methods:

- API key authentication
- JWT token authentication
- OAuth 2.0
- No authentication (for local development)

### 6.2 Authorization

Tool-level authorization can be implemented using middleware:

```javascript
const authMiddleware = (req, res, next) => {
  // Check authorization
  if (!isAuthorized(req.user, req.tool)) {
    return res.status(403).json({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Not authorized to use this tool'
      }
    });
  }
  next();
};

server.use(authMiddleware);
```

### 6.3 Rate Limiting

Rate limiting can be configured to prevent abuse:

```javascript
const rateLimitMiddleware = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later'
    }
  }
});

server.use(rateLimitMiddleware);
```

## 7. IDE Integration

### 7.1 Server Discovery

The IDE discovers the MCP server through:

- Manual configuration
- Service discovery
- Environment variables
- Configuration files

### 7.2 Tool Registration

Tools are automatically registered with the IDE when the server starts:

```javascript
server.on('start', () => {
  console.log(`DNS MCP Server running at http://${host}:${port}`);
  console.log('Registered tools:');
  server.tools.forEach(tool => {
    console.log(`- ${tool.name}: ${tool.description}`);
  });
});
```

### 7.3 Command-line Interface

The IDE can expose the MCP tools through a command-line interface:

```
> dns lookup example.com --record-type=NS --provider=google
```

### 7.4 Future UI Integration

The server will provide metadata for UI integration:

```javascript
const dnsLookupTool = {
  // ... other properties
  uiMetadata: {
    icon: 'dns',
    category: 'Network Tools',
    priority: 1,
    formLayout: [
      { field: 'domain', component: 'text-input', label: 'Domain' },
      { field: 'recordType', component: 'select', label: 'Record Type' },
      { field: 'provider', component: 'select', label: 'Provider' },
      { field: 'useCache', component: 'checkbox', label: 'Use Cache' }
    ]
  }
};
```

## 8. Development and Testing

### 8.1 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/dns-mcp-server.git
cd dns-mcp-server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the server in development mode
npm run dev
```

### 8.2 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run end-to-end tests
npm run test:e2e
```

### 8.3 Mocking External Services

For testing, external services can be mocked:

```javascript
// Mock DNS provider
const mockGoogleDNS = {
  lookup: jest.fn().mockResolvedValue({
    records: [
      { name: 'example.com', ttl: 3600, value: 'ns1.example.com' },
      { name: 'example.com', ttl: 3600, value: 'ns2.example.com' }
    ]
  })
};

// Use in tests
jest.mock('../services/providers/google', () => mockGoogleDNS);
```

## 9. Deployment

### 9.1 Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
```

### 9.2 Environment-specific Configuration

Configuration can be customized for different environments:

```javascript
const config = {
  development: {
    logLevel: 'debug',
    timeout: 60000
  },
  production: {
    logLevel: 'info',
    timeout: 30000
  },
  test: {
    logLevel: 'error',
    timeout: 5000
  }
}[process.env.NODE_ENV || 'development'];

const server = createServer({
  // ... other options
  ...config
});
```

## 10. Monitoring and Logging

### 10.1 Logging

The fastmcp framework provides built-in logging:

```javascript
server.on('request', (req) => {
  server.logger.info({
    tool: req.tool,
    params: req.params,
    user: req.user?.id
  }, 'Received request');
});

server.on('response', (req, res) => {
  server.logger.info({
    tool: req.tool,
    duration: res.duration,
    status: res.error ? 'error' : 'success'
  }, 'Sent response');
});

server.on('error', (error, req) => {
  server.logger.error({
    tool: req?.tool,
    params: req?.params,
    error: {
      message: error.message,
      stack: error.stack
    }
  }, 'Server error');
});
```

### 10.2 Metrics

Metrics can be collected for monitoring:

```javascript
const metrics = {
  requests: new Counter('dns_mcp_requests_total', 'Total number of requests'),
  errors: new Counter('dns_mcp_errors_total', 'Total number of errors'),
  duration: new Histogram('dns_mcp_request_duration_seconds', 'Request duration in seconds')
};

server.on('request', (req) => {
  metrics.requests.inc({ tool: req.tool });
});

server.on('response', (req, res) => {
  metrics.duration.observe({ tool: req.tool }, res.duration / 1000);
  if (res.error) {
    metrics.errors.inc({ tool: req.tool, code: res.error.code });
  }
});
```

## 11. Conclusion

The integration with the fastmcp framework provides a solid foundation for the DNS MCP Server, handling the communication protocol, request validation, and error handling. This allows the DNS MCP Server implementation to focus on the core functionality of DNS and WHOIS lookups.