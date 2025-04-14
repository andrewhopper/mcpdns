import { DnsLookupResponse, WhoisLookupResponse } from '../types';
export declare class CacheManager {
    private dnsCache;
    private whoisCache;
    private readonly DNS_CACHE_TTL;
    private readonly WHOIS_CACHE_TTL;
    constructor();
    /**
     * Get DNS lookup result from cache
     * @param domain The domain
     * @param recordType The DNS record type
     * @param provider The DNS provider
     * @returns Cached DNS lookup response or null if not found
     */
    getDnsLookup(domain: string, recordType: string, provider: string): DnsLookupResponse | null;
    /**
     * Cache DNS lookup result
     * @param domain The domain
     * @param recordType The DNS record type
     * @param provider The DNS provider
     * @param response The DNS lookup response
     */
    cacheDnsLookup(domain: string, recordType: string, provider: string, response: DnsLookupResponse): void;
    /**
     * Get WHOIS lookup result from cache
     * @param domain The domain
     * @returns Cached WHOIS lookup response or null if not found
     */
    getWhoisLookup(domain: string): WhoisLookupResponse | null;
    /**
     * Cache WHOIS lookup result
     * @param domain The domain
     * @param response The WHOIS lookup response
     */
    cacheWhoisLookup(domain: string, response: WhoisLookupResponse): void;
    /**
     * Clear all caches
     */
    clearCache(): void;
    /**
     * Generate a cache key for DNS lookup
     * @param domain The domain
     * @param recordType The DNS record type
     * @param provider The DNS provider
     * @returns Cache key string
     */
    private generateDnsCacheKey;
    /**
     * Generate a cache key for WHOIS lookup
     * @param domain The domain
     * @returns Cache key string
     */
    private generateWhoisCacheKey;
}
