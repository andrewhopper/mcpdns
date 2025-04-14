"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheManager = void 0;
class CacheManager {
    constructor() {
        this.DNS_CACHE_TTL = 3600000; // 1 hour in milliseconds
        this.WHOIS_CACHE_TTL = 86400000; // 24 hours in milliseconds
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
    getDnsLookup(domain, recordType, provider) {
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
    cacheDnsLookup(domain, recordType, provider, response) {
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
    getWhoisLookup(domain) {
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
    cacheWhoisLookup(domain, response) {
        const cacheKey = this.generateWhoisCacheKey(domain);
        this.whoisCache.set(cacheKey, {
            response: { ...response },
            timestamp: Date.now()
        });
    }
    /**
     * Clear all caches
     */
    clearCache() {
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
    generateDnsCacheKey(domain, recordType, provider) {
        return `dns:${domain}:${recordType}:${provider}`;
    }
    /**
     * Generate a cache key for WHOIS lookup
     * @param domain The domain
     * @returns Cache key string
     */
    generateWhoisCacheKey(domain) {
        return `whois:${domain}`;
    }
}
exports.CacheManager = CacheManager;
