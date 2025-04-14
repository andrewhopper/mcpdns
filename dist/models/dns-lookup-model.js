"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DnsLookupModel = void 0;
const provider_manager_1 = require("./provider-manager");
const cache_manager_1 = require("./cache-manager");
class DnsLookupModel {
    constructor() {
        this.providerManager = new provider_manager_1.ProviderManager();
        this.cacheManager = new cache_manager_1.CacheManager();
    }
    /**
     * Look up NS records for a domain
     * @param domain The domain to look up
     * @param provider The DNS provider to use
     * @param useCache Whether to use cached results
     * @returns DNS lookup response with NS records
     */
    async lookupNs(domain, provider = 'all', useCache = true) {
        // Check cache first if enabled
        if (useCache) {
            const cachedResult = this.cacheManager.getDnsLookup(domain, 'NS', provider);
            if (cachedResult) {
                return cachedResult;
            }
        }
        // Perform the DNS lookup
        const results = await this.providerManager.lookupNs(domain, provider);
        // Format the response
        const response = {
            domain,
            recordType: 'NS',
            provider,
            fromCache: false,
            timestamp: new Date().toISOString(),
            results
        };
        // Cache the result if enabled
        if (useCache) {
            this.cacheManager.cacheDnsLookup(domain, 'NS', provider, response);
        }
        return response;
    }
}
exports.DnsLookupModel = DnsLookupModel;
