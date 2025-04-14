import { DomainSearchRequest, DomainSearchResponse, DomainHackRequest, DomainHackResponse } from '../types';
/**
 * Handler for the domain search tool
 * Searches for domains based on keywords and criteria
 */
export declare const domainSearch: (params: DomainSearchRequest) => Promise<DomainSearchResponse>;
/**
 * Handler for the domain hack tool
 * Finds domain hacks for a word or phrase
 */
export declare const domainHack: (params: DomainHackRequest) => Promise<DomainHackResponse>;
