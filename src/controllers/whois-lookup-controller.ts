import { 
  WhoisLookupRequest, 
  WhoisLookupResponse 
} from '../types';
import { WhoisLookupModel } from '../models/whois-lookup-model';

// Create an instance of the WHOIS lookup model
const whoisLookupModel = new WhoisLookupModel();

/**
 * Handler for the WHOIS lookup tool
 * Fetches WHOIS information for a domain
 */
export const whoisLookup = async (params: WhoisLookupRequest): Promise<WhoisLookupResponse> => {
  try {
    const { domain, useCache = true, includeRaw = false } = params;
    
    // Validate domain
    if (!domain || typeof domain !== 'string') {
      throw new Error('Domain is required and must be a string');
    }
    
    // Call the model to perform the lookup
    const result = await whoisLookupModel.lookup(domain, useCache, includeRaw);
    
    return result;
  } catch (error) {
    console.error('WHOIS lookup failed:', error);
    throw error;
  }
};