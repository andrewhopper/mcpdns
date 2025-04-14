import { DnsLookupResponse } from '../types';
export declare class DnsLookupModel {
    private providerManager;
    private cacheManager;
    constructor();
    /**
     * Look up NS records for a domain
     * @param domain The domain to look up
     * @param provider The DNS provider to use
     * @param useCache Whether to use cached results
     * @returns DNS lookup response with NS records
     */
    lookupNs(domain: string, provider?: string, useCache?: boolean): Promise<DnsLookupResponse>;
}
