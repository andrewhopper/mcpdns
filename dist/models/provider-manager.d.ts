import { DnsProviderResult } from '../types';
export declare class ProviderManager {
    private providers;
    constructor();
    /**
     * Look up NS records for a domain across all or specific providers
     * @param domain The domain to look up
     * @param provider The provider to use (or 'all' for all providers)
     * @returns DNS provider results
     */
    lookupNs(domain: string, provider?: string): Promise<DnsProviderResult[]>;
    /**
     * Look up NS records for a domain with a specific provider
     * @param domain The domain to look up
     * @param providerName The name of the provider
     * @returns DNS provider result
     */
    private lookupNsWithProvider;
    /**
     * Parse dig output to extract DNS records
     * @param output The output from dig command
     * @returns Array of DNS records
     */
    private parseDnsOutput;
}
