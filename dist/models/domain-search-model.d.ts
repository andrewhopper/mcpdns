import { DomainSearchResponse, DomainHackResponse } from '../types';
export declare class DomainSearchModel {
    private cacheManager;
    private tldDatabase;
    constructor();
    /**
     * Search for domains based on keywords and criteria
     * @param keywords Keywords for domain search
     * @param maxTldLength Maximum length of TLDs to include
     * @param includeDomainHacks Whether to include domain hacks
     * @param checkAvailability Whether to check domain availability
     * @returns Domain search results
     */
    search(keywords: string[], maxTldLength?: number, includeDomainHacks?: boolean, checkAvailability?: boolean): Promise<DomainSearchResponse>;
    /**
     * Find domain hacks for a word or phrase
     * @param word The word or phrase to find domain hacks for
     * @param maxResults Maximum number of results to return
     * @param checkAvailability Whether to check domain availability
     * @returns Domain hack results
     */
    findDomainHacks(word: string, maxResults?: number, checkAvailability?: boolean): Promise<DomainHackResponse>;
}
