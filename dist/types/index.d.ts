export interface DnsLookupRequest {
    domain: string;
    provider?: 'google' | 'cloudflare' | 'opendns' | 'all';
    useCache?: boolean;
}
export interface DnsRecord {
    name: string;
    ttl: number;
    value: string;
}
export interface DnsProviderResult {
    provider: string;
    responseTime: number;
    records: DnsRecord[];
}
export interface DnsLookupResponse {
    domain: string;
    recordType: string;
    provider: string;
    fromCache: boolean;
    timestamp: string;
    results: DnsProviderResult[];
}
export interface WhoisLookupRequest {
    domain: string;
    useCache?: boolean;
    includeRaw?: boolean;
}
export interface WhoisRegistrar {
    name: string;
    url: string;
    ianaId: string;
}
export interface WhoisDates {
    created: string;
    updated: string;
    expires: string;
}
export interface WhoisLookupResponse {
    domain: string;
    fromCache: boolean;
    timestamp: string;
    registrar: WhoisRegistrar;
    dates: WhoisDates;
    nameservers: string[];
    privacyProtected: boolean;
    raw?: string;
}
export interface DomainSearchRequest {
    keywords: string[];
    maxTldLength?: number;
    includeDomainHacks?: boolean;
    checkAvailability?: boolean;
}
export interface DomainPrice {
    registration: number;
    renewal: number;
    currency: string;
}
export interface DomainResult {
    domain: string;
    tld: string;
    sld: string;
    available?: boolean;
    price?: DomainPrice;
    relevance: number;
    isDomainHack: boolean;
}
export interface DomainHackResult {
    domain: string;
    tld: string;
    sld: string;
    available?: boolean;
    price?: DomainPrice;
    matchQuality: number;
    wordCompletion: string;
}
export interface DomainSearchStats {
    totalResults: number;
    availableResults: number;
    unavableResults: number;
    notChecked: number;
}
export interface DomainSearchResponse {
    query: {
        keywords: string[];
        options: {
            maxTldLength?: number;
            includeDomainHacks: boolean;
            checkAvailability: boolean;
        };
    };
    results: DomainResult[];
    domainHacks: DomainHackResult[];
    stats: DomainSearchStats;
}
export interface DomainHackRequest {
    word: string;
    maxResults?: number;
    checkAvailability?: boolean;
}
export interface DomainHackResponse {
    word: string;
    results: DomainHackResult[];
    stats: DomainSearchStats;
}
export * from './network-tools';
