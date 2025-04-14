import { FastMCP } from 'fastmcp';
import { dnsLookupNs } from './dns-lookup-controller';
import { whoisLookup } from './whois-lookup-controller';
import { domainSearch, domainHack } from './domain-search-controller';

export const registerTools = (mcpServer: FastMCP): void => {
  // Register DNS lookup tool
  mcpServer.registerTool('dns_lookup_ns', {
    description: 'Look up NS records for a domain',
    parameters: {
      domain: { type: 'string', description: 'The domain to look up NS records for' },
      provider: { type: 'string', description: 'The DNS provider to use (google, cloudflare, opendns, or all)', default: 'all' },
      useCache: { type: 'boolean', description: 'Whether to use cached results if available', default: true }
    },
    handler: dnsLookupNs
  });

  // Register WHOIS lookup tool
  mcpServer.registerTool('whois_lookup', {
    description: 'Look up WHOIS information for a domain',
    parameters: {
      domain: { type: 'string', description: 'The domain to look up WHOIS information for' },
      useCache: { type: 'boolean', description: 'Whether to use cached results if available', default: true },
      includeRaw: { type: 'boolean', description: 'Whether to include raw WHOIS output', default: false }
    },
    handler: whoisLookup
  });

  // Register domain search tool
  mcpServer.registerTool('domain_search', {
    description: 'Search for domain names based on keywords and criteria',
    parameters: {
      keywords: { type: 'array', items: { type: 'string' }, description: 'Keywords to use for domain search' },
      maxTldLength: { type: 'number', description: 'Maximum length of TLDs to include', default: 3 },
      includeDomainHacks: { type: 'boolean', description: 'Whether to include domain hacks in results', default: true },
      checkAvailability: { type: 'boolean', description: 'Whether to check domain availability', default: true }
    },
    handler: domainSearch
  });

  // Register domain hack tool
  mcpServer.registerTool('domain_hack', {
    description: 'Find domain hacks for a word or phrase',
    parameters: {
      word: { type: 'string', description: 'The word or phrase to find domain hacks for' },
      maxResults: { type: 'number', description: 'Maximum number of results to return', default: 10 },
      checkAvailability: { type: 'boolean', description: 'Whether to check domain availability', default: true }
    },
    handler: domainHack
  });
};