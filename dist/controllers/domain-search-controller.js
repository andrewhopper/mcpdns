"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domainHack = exports.domainSearch = void 0;
const domain_search_model_1 = require("../models/domain-search-model");
// Create an instance of the domain search model
const domainSearchModel = new domain_search_model_1.DomainSearchModel();
/**
 * Handler for the domain search tool
 * Searches for domains based on keywords and criteria
 */
const domainSearch = async (params) => {
    try {
        const { keywords, maxTldLength = 3, includeDomainHacks = true, checkAvailability = true } = params;
        // Validate keywords
        if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
            throw new Error('Keywords are required and must be an array of strings');
        }
        // Call the model to perform the search
        const result = await domainSearchModel.search(keywords, maxTldLength, includeDomainHacks, checkAvailability);
        return result;
    }
    catch (error) {
        console.error('Domain search failed:', error);
        throw error;
    }
};
exports.domainSearch = domainSearch;
/**
 * Handler for the domain hack tool
 * Finds domain hacks for a word or phrase
 */
const domainHack = async (params) => {
    try {
        const { word, maxResults = 10, checkAvailability = true } = params;
        // Validate word
        if (!word || typeof word !== 'string') {
            throw new Error('Word is required and must be a string');
        }
        // Call the model to find domain hacks
        const result = await domainSearchModel.findDomainHacks(word, maxResults, checkAvailability);
        return result;
    }
    catch (error) {
        console.error('Domain hack search failed:', error);
        throw error;
    }
};
exports.domainHack = domainHack;
