# mcpdns: DNS & Domain Troubleshooting MCP Server

`mcpdns` is a specialized Model Context Protocol (MCP) server designed to streamline DNS configuration and domain verification tasks directly within your Integrated Development Environment (IDE). Built using the `fastmcp` framework, it provides a suite of tools to help developers, DevOps engineers, and system administrators quickly diagnose and confirm domain setups without constant context switching.

The primary goal is to simplify common workflows, such as verifying domain configuration when pointing it to services like Replit, Lovable, Vercel, or other hosting platforms.

## System Architecture

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
            C3[Domain Search Controller]
            C4[MCP Tool Controller]
        end
        
        subgraph "Models"
            M1[DNS Lookup Model]
            M2[WHOIS Lookup Model]
            M3[Provider Manager]
            M4[Cache Manager]
            M5[Domain Search Model]
            M6[TLD Database]
        end
        
        subgraph "Services"
            S1[DNS Service]
            S2[WHOIS Service]
            S3[Cache Service]
            S4[Domain Suggestion Service]
            S5[Domain Availability Service]
            S6[Domain Ranking Service]
        end
    end
    
    IDE --> MCP_Client
    MCP_Client --> Server
    
    Server --> Router
    Router --> Schema
    Router --> Auth
    
    Router --> C4
    C4 --> C1
    C4 --> C2
    C4 --> C3
    
    C1 --> M1
    C2 --> M2
    C3 --> M5
    M1 --> M3
    M1 --> M4
    M2 --> M4
    M5 --> M6
    M5 --> M4
    
    M1 --> S1
    M2 --> S2
    M4 --> S3
    M5 --> S4
    M5 --> S5
    M5 --> S6
    
    M3 --> DNS1[Google DNS]
    M3 --> DNS2[OpenDNS]
    M3 --> DNS3[Cloudflare DNS]
```

## MCP Tools Provided

The mcpdns server provides the following tools through the Model Context Protocol:

| Tool Name | Description | Key Parameters |
|-----------|-------------|----------------|
| `dns_lookup_ns` | Look up NS records for a domain | `domain`, `provider`, `useCache` |
| `whois_lookup` | Look up WHOIS information for a domain | `domain`, `useCache`, `includeRaw` |
| `domain_search` | Search for domain names based on keywords and criteria | `keywords`, `maxTldLength`, `includeDomainHacks`, `checkAvailability` |
| `domain_hack` | Find domain hacks for a word or phrase | `word`, `maxResults`, `checkAvailability` |

### DNS Lookup Tool

The DNS lookup tool allows you to query for NS records for a domain, with options to specify which DNS provider to use and whether to use cached results.

**Example Input:**
```json
{
  "domain": "example.com",
  "provider": "all",
  "useCache": false
}
```

**Example Output:**
```json
{
  "domain": "example.com",
  "recordType": "NS",
  "provider": "all",
  "fromCache": false,
  "timestamp": "2025-04-12T20:00:00.000Z",
  "results": [
    {
      "provider": "google",
      "responseTime": 125,
      "records": [
        {
          "name": "example.com",
          "ttl": 86400,
          "value": "a.iana-servers.net"
        },
        {
          "name": "example.com",
          "ttl": 86400,
          "value": "b.iana-servers.net"
        }
      ]
    },
    // Results from other providers...
  ]
}
```

### WHOIS Lookup Tool

The WHOIS lookup tool retrieves domain registration information, including registrar details, creation/expiration dates, and nameservers.

**Example Input:**
```json
{
  "domain": "example.com",
  "useCache": false,
  "includeRaw": false
}
```

**Example Output:**
```json
{
  "domain": "example.com",
  "fromCache": false,
  "timestamp": "2025-04-12T20:00:00.000Z",
  "registrar": {
    "name": "ICANN",
    "url": "https://www.icann.org",
    "ianaId": "376"
  },
  "dates": {
    "created": "1995-08-14T04:00:00Z",
    "updated": "2023-08-14T07:01:33Z",
    "expires": "2025-08-13T04:00:00Z"
  },
  "nameservers": [
    "a.iana-servers.net",
    "b.iana-servers.net"
  ],
  "privacyProtected": false
}
```

### Domain Search Tool

The domain search tool helps find available domain names based on keywords, with options to filter by TLD characteristics and check availability.

**Example Input:**
```json
{
  "keywords": ["andrew", "hopper", "ai"],
  "maxTldLength": 3,
  "includeDomainHacks": true,
  "checkAvailability": true
}
```

**Example Output:**
```json
{
  "query": {
    "keywords": ["andrew", "hopper", "ai"],
    "options": {
      "maxTldLength": 3,
      "includeDomainHacks": true,
      "checkAvailability": true
    }
  },
  "results": [
    {
      "domain": "andrewhopper.ai",
      "tld": "ai",
      "sld": "andrewhopper",
      "available": false,
      "price": {
        "registration": 100,
        "renewal": 100,
        "currency": "USD"
      },
      "relevance": 95,
      "isDomainHack": false
    },
    // More domain suggestions...
  ],
  "domainHacks": [
    // Domain hack suggestions...
  ],
  "stats": {
    "totalResults": 50,
    "availableResults": 20,
    "unavailableResults": 30,
    "notChecked": 0
  }
}
```

### Domain Hack Tool

The domain hack tool finds creative domain names where the TLD forms part of the name (e.g., "artem.is").

**Example Input:**
```json
{
  "word": "artemis",
  "checkAvailability": true
}
```

**Example Output:**
```json
{
  "word": "artemis",
  "results": [
    {
      "domain": "artem.is",
      "tld": "is",
      "sld": "artem",
      "available": false,
      "price": {
        "registration": 50,
        "renewal": 50,
        "currency": "USD"
      },
      "matchQuality": 95,
      "wordCompletion": "artem.is"
    },
    // More domain hack suggestions...
  ],
  "stats": {
    "totalResults": 5,
    "availableResults": 2,
    "unavailableResults": 3,
    "notChecked": 0
  }
}
```

## Key Features & Tools

`mcpdns` offers a range of granular tools and a high-level verification workflow:

### Foundational Tools

*   **DNS Record Lookups:**
    *   Query for various record types: `NS`, `A`, `AAAA`, `CNAME`, `TXT`.
    *   Specify DNS providers (Google, Cloudflare, OpenDNS) or query all simultaneously to compare results and check propagation.
    *   View Time-To-Live (TTL) for records.
*   **WHOIS Lookups:**
    *   Retrieve essential domain registration data: Registrar, creation/expiration dates, nameservers.
    *   Identifies privacy-protected domains.
    *   Optionally view raw WHOIS data.
*   **Network Ping:**
    *   Check basic network reachability to a domain's resolved IP address.
*   **HTTP Redirect Checks:**
    *   Verify if a domain (and its variants like `www`) correctly redirects to the intended canonical URL.
*   **SSL Certificate Validation:**
    *   Check the validity of a domain's SSL certificate, including chain, dates, and hostname matching.
*   **Caching:**
    *   Optional caching for DNS and WHOIS results to speed up repeated queries and reduce external load.
    *   Supports cache bypass and invalidation.

### Service Verification Workflow

*   **Template-Based Verification:** Define templates for common services (e.g., Replit, Lovable, Vercel) specifying the required DNS records (type, value), redirect behavior, and other checks.
*   **Consolidated Check:** Use a single command (e.g., `verify example.com for Replit`) to run all checks defined in the service template.
*   **Clear Reporting:** Get a summary report indicating pass/fail status for each check in the template, highlighting any issues.

## Docker Deployment

The mcpdns server can be easily deployed using Docker. The containerized version includes all necessary DNS utilities (nslookup, whois) and runs on a random port to avoid conflicts with other services.

### Prerequisites

- Docker
- Docker Compose (optional, but recommended)

### Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/andrewhopper/mcpdns.git
   cd mcpdns
   ```

2. Build and start the container:
   ```bash
   docker-compose up -d
   ```

3. Find the assigned port:
   ```bash
   docker-compose ps
   ```

4. Connect your IDE to the MCP server using the displayed port.

### Container Configuration

The Docker container includes:

- Node.js runtime for the mcpdns server
- DNS utilities (nslookup, dig, whois)
- Automatic port assignment to avoid conflicts

You can customize the container by modifying the `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  mcpdns:
    build: .
    container_name: mcpdns
    ports:
      - "3000"  # Exposes port 3000 on a random host port
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      NODE_ENV: development
      PORT: 3000
    restart: unless-stopped
```

### Manual Docker Commands

If you prefer not to use Docker Compose:

1. Build the image:
   ```bash
   docker build -t mcpdns .
   ```

2. Run the container:
   ```bash
   docker run -d -p 3000 --name mcpdns mcpdns
   ```

3. Find the assigned port:
   ```bash
   docker port mcpdns
   ```

## Integration

*   **MCP Server:** Built using the `fastmcp` framework for standardized communication.
*   **IDE Integration:** Designed to be used within IDEs that support the Model Context Protocol, providing tools via command palettes or potentially dedicated UI panels in the future.

## Documentation

For more detailed information on architecture, specific tool implementation, and API schemas, please refer to the documents within the `/docs` and `/.ai` directories.

## Author

*   **Andrew Hopper**
    *   X: [x.com/andrewhopper](https://x.com/andrewhopper)
    *   LinkedIn: [linkedin.com/in/andrewhopper](https://linkedin.com/in/andrewhopper)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Copyright (c) 2025 Andrew Hopper

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
