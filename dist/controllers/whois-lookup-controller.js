"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whoisLookup = void 0;
const whois_lookup_model_1 = require("../models/whois-lookup-model");
// Create an instance of the WHOIS lookup model
const whoisLookupModel = new whois_lookup_model_1.WhoisLookupModel();
/**
 * Handler for the WHOIS lookup tool
 * Fetches WHOIS information for a domain
 */
const whoisLookup = async (params) => {
    try {
        const { domain, useCache = true, includeRaw = false } = params;
        // Validate domain
        if (!domain || typeof domain !== 'string') {
            throw new Error('Domain is required and must be a string');
        }
        // Call the model to perform the lookup
        const result = await whoisLookupModel.lookup(domain, useCache, includeRaw);
        return result;
    }
    catch (error) {
        console.error('WHOIS lookup failed:', error);
        throw error;
    }
};
exports.whoisLookup = whoisLookup;
