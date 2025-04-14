import { DnsLookupResponse, WhoisLookupResponse } from '../types';

export class CacheManager {
  private dnsCache: Map<string, { response: DnsLookupResponse, timestamp: number }>;
  private whoisCache: Map<string, { response: WhoisLookupResponse, timestamp: number }>;
  private readonly DNS_CACHE_TTL = 3600000; // 1 hour in milliseconds
  private readonly WHOIS_CACHE_TTL = 86400000; // 24 hours in milliseconds

  constructor() {
    this.dnsCache = new Map();
    this.whoisCache = new Map();
  }

  /**
   * Get DNS lookup result from cache
   * @param domain The domain
   * @param recordType The DNS record type
   * @param provider The DNS provider
   * @returns Cached DNS lookup response or null if not found
   */
  getDnsLookup(domain: string, recordType: string, provider: string): DnsLookupResponse | null {
    const cacheKey = this.generateDnsCacheKey(domain, recordType, provider);
    const cached = this.dnsCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.DNS_CACHE_TTL) {
      // Return a copy of the cached response with updated fromCache flag
      return {
        ...cached.response,
        fromCache: true
      };
    }

    return null;
  }

  /**
   * Cache DNS lookup result
   * @param domain The domain
   * @param recordType The DNS record type
   * @param provider The DNS provider
   * @param response The DNS lookup response
   */
  cacheDnsLookup(domain: string, recordType: string, provider: string, response: DnsLookupResponse): void {
    const cacheKey = this.generateDnsCacheKey(domain, recordType, provider);
    this.dnsCache.set(cacheKey, {
      response: { ...response },
      timestamp: Date.now()
    });
  }

  /**
   * Get WHOIS lookup result from cache
   * @param domain The domain
   * @returns Cached WHOIS lookup response or null if not found
   */
  getWhoisLookup(domain: string): WhoisLookupResponse | null {
    const cacheKey = this.generateWhoisCacheKey(domain);
    const cached = this.whoisCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.WHOIS_CACHE_TTL) {
      // Return a copy of the cached response with updated fromCache flag
      return {
        ...cached.response,
        fromCache: true
      };
    }

    return null;
  }

  /**
   * Cache WHOIS lookup result
   * @param domain The domain
   * @param response The WHOIS lookup response
   */
  cacheWhoisLookup(domain: string, response: WhoisLookupResponse): void {
    const cacheKey = this.generateWhoisCacheKey(domain);
    this.whoisCache.set(cacheKey, {
      response: { ...response },
      timestamp: Date.now()
    });
  }

  /**
   * Clear all caches
   */
  clearCache(): void {
    this.dnsCache.clear();
    this.whoisCache.clear();
  }

  /**
   * Generate a cache key for DNS lookup
   * @param domain The domain
   * @param recordType The DNS record type
   * @param provider The DNS provider
   * @returns Cache key string
   */
  private generateDnsCacheKey(domain: string, recordType: string, provider: string): string {
    return `dns:${domain}:${recordType}:${provider}`;
  }

  /**
   * Generate a cache key for WHOIS lookup
   * @param domain The domain
   * @returns Cache key string
   */
  private generateWhoisCacheKey(domain: string): string {
    return `whois:${domain}`;
  }
}