import { 
  DnsLookupRequest, 
  DnsLookupResponse 
} from '../types';
import { DnsLookupModel } from '../models/dns-lookup-model';

// Create an instance of the DNS lookup model
const dnsLookupModel = new DnsLookupModel();

/**
 * Handler for the DNS lookup NS tool
 * Fetches NS records for a domain from the specified provider
 */
export const dnsLookupNs = async (params: DnsLookupRequest): Promise<DnsLookupResponse> => {
  try {
    const { domain, provider = 'all', useCache = true } = params;
    
    // Validate domain
    if (!domain || typeof domain !== 'string') {
      throw new Error('Domain is required and must be a string');
    }
    
    // Validate provider
    if (provider !== 'all' && provider !== 'google' && provider !== 'cloudflare' && provider !== 'opendns') {
      throw new Error('Provider must be one of: all, google, cloudflare, opendns');
    }
    
    // Call the model to perform the lookup
    const result = await dnsLookupModel.lookupNs(domain, provider, useCache);
    
    return result;
  } catch (error) {
    console.error('DNS lookup failed:', error);
    throw error;
  }
};