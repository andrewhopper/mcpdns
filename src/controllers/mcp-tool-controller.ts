import { FastMCP } from 'fastmcp';
import { dnsLookupNs } from './dns-lookup-controller';
import { whoisLookup } from './whois-lookup-controller';
import { domainSearch, domainHack } from './domain-search-controller';
import { z } from 'zod';

export const registerTools = (mcpServer: FastMCP): void => {
  // Define schemas using zod
  const DnsLookupSchema = z.object({
    domain: z.string().describe('The domain to look up NS records for'),
    provider: z.enum(['google', 'cloudflare', 'opendns', 'all']).default('all')
      .describe('The DNS provider to use'),
    useCache: z.boolean().default(true).describe('Whether to use cached results if available')
  });

  const WhoisLookupSchema = z.object({
    domain: z.string().describe('The domain to look up WHOIS information for'),
    useCache: z.boolean().default(true).describe('Whether to use cached results if available'),
    includeRaw: z.boolean().default(false).describe('Whether to include raw WHOIS output')
  });

  const DomainSearchSchema = z.object({
    keywords: z.array(z.string()).describe('Keywords to use for domain search'),
    maxTldLength: z.number().default(3).describe('Maximum length of TLDs to include'),
    includeDomainHacks: z.boolean().default(true).describe('Whether to include domain hacks in results'),
    checkAvailability: z.boolean().default(true).describe('Whether to check domain availability')
  });

  const DomainHackSchema = z.object({
    word: z.string().describe('The word or phrase to find domain hacks for'),
    maxResults: z.number().default(10).describe('Maximum number of results to return'),
    checkAvailability: z.boolean().default(true).describe('Whether to check domain availability')
  });

  // Register DNS lookup tool
  mcpServer.addTool({
    name: 'dns_lookup_ns',
    description: 'Look up NS records for a domain',
    parameters: DnsLookupSchema,
    execute: async (args, context) => {
      const result = await dnsLookupNs(args as any);
      return JSON.stringify(result);
    }
  });

  // Register WHOIS lookup tool
  mcpServer.addTool({
    name: 'whois_lookup',
    description: 'Look up WHOIS information for a domain',
    parameters: WhoisLookupSchema,
    execute: async (args, context) => {
      const result = await whoisLookup(args as any);
      return JSON.stringify(result);
    }
  });

  // Register domain search tool
  mcpServer.addTool({
    name: 'domain_search',
    description: 'Search for domain names based on keywords and criteria',
    parameters: DomainSearchSchema,
    execute: async (args, context) => {
      const result = await domainSearch(args as any);
      return JSON.stringify(result);
    }
  });

  // Register domain hack tool
  mcpServer.addTool({
    name: 'domain_hack',
    description: 'Find domain hacks for a word or phrase',
    parameters: DomainHackSchema,
    execute: async (args, context) => {
      const result = await domainHack(args as any);
      return JSON.stringify(result);
    }
  });
};