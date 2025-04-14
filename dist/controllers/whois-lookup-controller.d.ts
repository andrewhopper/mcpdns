import { WhoisLookupRequest, WhoisLookupResponse } from '../types';
/**
 * Handler for the WHOIS lookup tool
 * Fetches WHOIS information for a domain
 */
export declare const whoisLookup: (params: WhoisLookupRequest) => Promise<WhoisLookupResponse>;
