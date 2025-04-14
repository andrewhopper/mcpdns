import { DnsLookupRequest, DnsLookupResponse } from '../types';
/**
 * Handler for the DNS lookup NS tool
 * Fetches NS records for a domain from the specified provider
 */
export declare const dnsLookupNs: (params: DnsLookupRequest) => Promise<DnsLookupResponse>;
