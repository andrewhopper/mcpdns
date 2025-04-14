import { WhoisLookupResponse } from '../types';
export declare class WhoisLookupModel {
    private cacheManager;
    constructor();
    /**
     * Look up WHOIS information for a domain
     * @param domain The domain to look up
     * @param useCache Whether to use cached results
     * @param includeRaw Whether to include raw WHOIS output
     * @returns WHOIS lookup response
     */
    lookup(domain: string, useCache?: boolean, includeRaw?: boolean): Promise<WhoisLookupResponse>;
}
