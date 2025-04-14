import { 
  DnsLookupResponse, 
  DnsProviderResult 
} from '../types';
import { ProviderManager } from './provider-manager';
import { CacheManager } from './cache-manager';

export class DnsLookupModel {
  private providerManager: ProviderManager;
  private cacheManager: CacheManager;

  constructor() {
    this.providerManager = new ProviderManager();
    this.cacheManager = new CacheManager();
  }

  /**
   * Look up NS records for a domain
   * @param domain The domain to look up
   * @param provider The DNS provider to use
   * @param useCache Whether to use cached results
   * @returns DNS lookup response with NS records
   */
  async lookupNs(
    domain: string, 
    provider: string = 'all', 
    useCache: boolean = true
  ): Promise<DnsLookupResponse> {
    // Check cache first if enabled
    if (useCache) {
      const cachedResult = this.cacheManager.getDnsLookup(domain, 'NS', provider);
      if (cachedResult) {
        return cachedResult;
      }
    }

    // Perform the DNS lookup
    const results: DnsProviderResult[] = await this.providerManager.lookupNs(domain, provider);

    // Format the response
    const response: DnsLookupResponse = {
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