"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dnsLookupNs = void 0;
const dns_lookup_model_1 = require("../models/dns-lookup-model");
// Create an instance of the DNS lookup model
const dnsLookupModel = new dns_lookup_model_1.DnsLookupModel();
/**
 * Handler for the DNS lookup NS tool
 * Fetches NS records for a domain from the specified provider
 */
const dnsLookupNs = async (params) => {
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
    }
    catch (error) {
        console.error('DNS lookup failed:', error);
        throw error;
    }
};
exports.dnsLookupNs = dnsLookupNs;
