"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainSearchModel = void 0;
const cache_manager_1 = require("./cache-manager");
const tld_database_1 = require("./tld-database");
class DomainSearchModel {
    constructor() {
        this.cacheManager = new cache_manager_1.CacheManager();
        this.tldDatabase = new tld_database_1.TldDatabase();
    }
    /**
     * Search for domains based on keywords and criteria
     * @param keywords Keywords for domain search
     * @param maxTldLength Maximum length of TLDs to include
     * @param includeDomainHacks Whether to include domain hacks
     * @param checkAvailability Whether to check domain availability
     * @returns Domain search results
     */
    async search(keywords, maxTldLength = 3, includeDomainHacks = true, checkAvailability = true) {
        // TODO: Implement actual domain search logic
        // For now, returning mock data
        const mockResults = [
            {
                domain: `${keywords.join('')}.com`,
                tld: 'com',
                sld: keywords.join(''),
                available: false,
                price: {
                    registration: 10,
                    renewal: 10,
                    currency: 'USD'
                },
                relevance: 95,
                isDomainHack: false
            },
            {
                domain: `${keywords.join('')}.ai`,
                tld: 'ai',
                sld: keywords.join(''),
                available: true,
                price: {
                    registration: 100,
                    renewal: 100,
                    currency: 'USD'
                },
                relevance: 90,
                isDomainHack: false
            }
        ];
        const mockDomainHacks = includeDomainHacks ? [
            {
                domain: 'examp.le',
                tld: 'le',
                sld: 'examp',
                available: false,
                price: {
                    registration: 50,
                    renewal: 50,
                    currency: 'USD'
                },
                matchQuality: 85,
                wordCompletion: 'examp.le'
            }
        ] : [];
        return {
            query: {
                keywords,
                options: {
                    maxTldLength,
                    includeDomainHacks,
                    checkAvailability
                }
            },
            results: mockResults,
            domainHacks: mockDomainHacks,
            stats: {
                totalResults: mockResults.length + mockDomainHacks.length,
                availableResults: mockResults.filter(r => r.available).length + mockDomainHacks.filter(r => r.available).length,
                unavailableResults: mockResults.filter(r => !r.available).length + mockDomainHacks.filter(r => !r.available).length,
                notChecked: 0
            }
        };
    }
    /**
     * Find domain hacks for a word or phrase
     * @param word The word or phrase to find domain hacks for
     * @param maxResults Maximum number of results to return
     * @param checkAvailability Whether to check domain availability
     * @returns Domain hack results
     */
    async findDomainHacks(word, maxResults = 10, checkAvailability = true) {
        // Get TLDs from the database
        const tlds = await this.tldDatabase.getAllTlds();
        // Find possible domain hacks
        const domainHacks = [];
        // TODO: Implement actual domain hack finding logic
        // For now, using a simple example
        if (word === 'example') {
            domainHacks.push({
                domain: 'examp.le',
                tld: 'le',
                sld: 'examp',
                available: false,
                price: {
                    registration: 50,
                    renewal: 50,
                    currency: 'USD'
                },
                matchQuality: 85,
                wordCompletion: 'examp.le'
            });
        }
        else if (word === 'artemis') {
            domainHacks.push({
                domain: 'artem.is',
                tld: 'is',
                sld: 'artem',
                available: false,
                price: {
                    registration: 50,
                    renewal: 50,
                    currency: 'USD'
                },
                matchQuality: 95,
                wordCompletion: 'artem.is'
            });
        }
        return {
            word,
            results: domainHacks.slice(0, maxResults),
            stats: {
                totalResults: domainHacks.length,
                availableResults: domainHacks.filter(r => r.available).length,
                unavailableResults: domainHacks.filter(r => !r.available).length,
                notChecked: 0
            }
        };
    }
}
exports.DomainSearchModel = DomainSearchModel;
