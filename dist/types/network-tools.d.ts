export declare enum DnsRecordType {
    A = "A",
    AAAA = "AAAA",
    CNAME = "CNAME",
    MX = "MX",
    NS = "NS",
    PTR = "PTR",
    SOA = "SOA",
    SRV = "SRV",
    TXT = "TXT",
    CAA = "CAA",
    DNSKEY = "DNSKEY",
    DS = "DS",
    NAPTR = "NAPTR",
    NSEC = "NSEC",
    RRSIG = "RRSIG",
    ANY = "ANY"
}
export declare enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS"
}
export declare enum DnsSecAlgorithm {
    RSA_SHA1 = "RSA/SHA-1",
    RSA_SHA256 = "RSA/SHA-256",
    RSA_SHA512 = "RSA/SHA-512",
    ECDSA_P256_SHA256 = "ECDSA P-256/SHA-256",
    ECDSA_P384_SHA384 = "ECDSA P-384/SHA-384",
    ED25519 = "ED25519",
    ED448 = "ED448"
}
export declare enum TechnologyCategory {
    CMS = "cms",
    ANALYTICS = "analytics",
    JAVASCRIPT_FRAMEWORK = "javascript_framework",
    ADVERTISING = "advertising",
    ECOMMERCE = "ecommerce",
    PAYMENT = "payment",
    MARKETING = "marketing",
    HOSTING = "hosting",
    TAG_MANAGER = "tag_manager",
    CDN = "cdn",
    SECURITY = "security",
    FONT = "font",
    OTHER = "other"
}
export interface NsLookupOptions {
    servers?: string | string[];
    type?: DnsRecordType;
    timeout?: number;
}
export interface DigOptions {
    server?: string;
    type?: DnsRecordType;
    short?: boolean;
    timeout?: number;
}
export interface PingOptions {
    count?: number;
    timeout?: number;
    interval?: number;
}
export interface TracerouteOptions {
    maxHops?: number;
    timeout?: number;
    protocol?: 'icmp' | 'udp' | 'tcp';
}
export interface TelnetOptions {
    port: number;
    timeout?: number;
}
export interface HttpRequestOptions {
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: string | object;
    timeout?: number;
    followRedirects?: boolean;
    maxRedirects?: number;
    proxy?: string;
    auth?: {
        username: string;
        password: string;
    };
}
export interface WebSocketOptions {
    headers?: Record<string, string>;
    protocols?: string[];
    timeout?: number;
    auth?: {
        username: string;
        password: string;
    };
}
export interface WhoisOptions {
    server?: string;
    timeout?: number;
}
export interface IpInfoOptions {
    source?: 'whois' | 'rdap' | 'ipinfo' | 'maxmind' | 'ipapi';
    timeout?: number;
}
export interface SslCertificateOptions {
    port?: number;
    timeout?: number;
    showFullChain?: boolean;
}
export interface MtrOptions {
    count?: number;
    timeout?: number;
    maxHops?: number;
}
export interface DnsSecOptions {
    server?: string;
    timeout?: number;
    algorithm?: DnsSecAlgorithm;
}
export interface DomainExpirationOptions {
    checkPrivateWhois?: boolean;
    timeout?: number;
}
export interface DomainAvailabilityOptions {
    tlds?: string[];
    timeout?: number;
}
export interface DomainRegistrationOptions {
    registrar: string;
    registrantInfo: {
        firstName: string;
        lastName: string;
        organization?: string;
        email: string;
        phone: string;
        address: {
            street: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
        };
    };
    nameServers?: string[];
    period?: number;
    privacy?: boolean;
    autoRenew?: boolean;
}
export interface DnsSecConfig {
    algorithm: DnsSecAlgorithm;
    keySize?: number;
    flags?: number;
    ttl?: number;
}
export interface TechnologyDetectionOptions {
    categories?: TechnologyCategory[];
    includeVersions?: boolean;
    timeout?: number;
    userAgent?: string;
    deepScan?: boolean;
}
export interface PageAnalysisOptions {
    checkMetaTags?: boolean;
    checkImages?: boolean;
    checkLinks?: boolean;
    checkHeaders?: boolean;
    checkSchema?: boolean;
    checkAccessibility?: boolean;
    checkSeo?: boolean;
    timeout?: number;
    userAgent?: string;
}
export interface PagePerformanceOptions {
    mobile?: boolean;
    connection?: 'slow3G' | '4G' | 'cable' | 'wifi';
    saveHar?: boolean;
    saveScreenshot?: boolean;
    timeout?: number;
    userAgent?: string;
    runs?: number;
    device?: 'desktop' | 'mobile' | 'tablet';
}
export interface PageSizeOptions {
    includeResources?: boolean;
    includeResourceBreakdown?: boolean;
    timeout?: number;
    userAgent?: string;
}
export interface PageSnapshotOptions {
    device: 'desktop' | 'mobile' | 'tablet';
    fullPage?: boolean;
    format?: 'png' | 'jpeg' | 'pdf';
    quality?: number;
    viewport?: {
        width: number;
        height: number;
    };
    userAgent?: string;
    waitForSelector?: string;
    timeout?: number;
    emulateMedia?: 'screen' | 'print' | 'none';
    colorScheme?: 'dark' | 'light' | 'no-preference';
}
export interface IpInfoResponse {
    ip: string;
    organization?: string;
    asn?: string;
    country?: string;
    region?: string;
    city?: string;
    geolocation?: {
        latitude: number;
        longitude: number;
    };
    isp?: string;
    abuse?: {
        email?: string;
        phone?: string;
    };
}
export interface SslCertificateResponse {
    valid: boolean;
    expires: Date;
    issuer: string;
    subject: string;
    validFrom: Date;
    validTo: Date;
    fingerprint: string;
    serialNumber: string;
    alternativeNames?: string[];
}
export interface DnsSecCheckResponse {
    enabled: boolean;
    valid: boolean;
    algorithm?: DnsSecAlgorithm;
    keyTag?: number;
    digestType?: string;
    digest?: string;
    signatureExpiration?: Date;
    details?: string;
}
export interface DnsSecSetupResponse {
    success: boolean;
    dsRecords?: string[];
    keyRecords?: string[];
    error?: string;
}
export interface DomainExpirationResponse {
    domain: string;
    expirationDate: Date;
    daysUntilExpiration: number;
    registrar?: string;
    autoRenew?: boolean;
    privacyEnabled?: boolean;
}
export interface DomainAvailabilityResponse {
    domain: string;
    available: boolean;
    suggestions?: string[];
}
export interface DomainRegistrationResponse {
    success: boolean;
    domain: string;
    expirationDate?: Date;
    transactionId?: string;
    authCode?: string;
    nameServers?: string[];
    error?: string;
}
export interface HttpResponse {
    statusCode: number;
    headers: Record<string, string>;
    body: string;
}
export interface WebSocketClient {
    connect: () => void;
    send: (data: string) => void;
    onMessage: (callback: (data: string) => void) => void;
    onClose: (callback: () => void) => void;
    close: () => void;
}
export interface TechnologyDetails {
    name: string;
    category: TechnologyCategory | string;
    version?: string;
    confidence: number;
    website?: string;
    description?: string;
    icon?: string;
    cpe?: string;
}
export interface TechnologyDetectionResponse {
    url: string;
    technologies: TechnologyDetails[];
    hasWordpress: boolean;
    hasGoogleAnalytics: boolean;
    hasGoogleTagManager: boolean;
    hasFacebook: boolean;
    hasReact: boolean;
    hasVue: boolean;
    hasAngular: boolean;
    hasJQuery: boolean;
    hasBootstrap: boolean;
    ecommercePlatform?: string;
    javascript: {
        libraries: string[];
        frameworks: string[];
    };
    analytics: string[];
    advertising: string[];
    cms?: string;
}
export interface MetaTagAnalysis {
    title?: string;
    description?: string;
    keywords?: string[];
    robots?: string;
    viewport?: string;
    ogTags: Record<string, string>;
    twitterTags: Record<string, string>;
    canonicalUrl?: string;
    otherTags: Record<string, string>;
    hasValidTags: boolean;
    issues: string[];
    recommendations: string[];
}
export interface SeoAnalysis {
    title: {
        value?: string;
        length: number;
        isOptimalLength: boolean;
    };
    description: {
        value?: string;
        length: number;
        isOptimalLength: boolean;
    };
    headings: {
        h1Count: number;
        h2Count: number;
        h3Count: number;
        hasProperStructure: boolean;
    };
    images: {
        count: number;
        withoutAlt: number;
    };
    links: {
        internal: number;
        external: number;
        broken: number;
    };
    wordCount: number;
    hasCanonicalTag: boolean;
    hasSitemap: boolean;
    hasRobotsTxt: boolean;
    mobileCompatible: boolean;
    usesHttps: boolean;
    loadTime: number;
    issues: string[];
    recommendations: string[];
    score: number;
}
export interface PageAnalysisResponse {
    url: string;
    title?: string;
    metaTags?: MetaTagAnalysis;
    linkCount: number;
    externalLinks: number;
    internalLinks: number;
    brokenLinks: number;
    imageCount: number;
    imagesWithoutAlt: number;
    headingStructure: {
        h1: number;
        h2: number;
        h3: number;
        h4: number;
        h5: number;
        h6: number;
        isProperlyStructured: boolean;
    };
    languages: string[];
    textToHtmlRatio: number;
    wordCount: number;
    schemaMarkup: {
        present: boolean;
        types: string[];
        valid: boolean;
    };
    seo?: SeoAnalysis;
    accessibility: {
        issues: string[];
        recommendations: string[];
        score: number;
    };
}
export interface WebVitalsMetrics {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    firstInputDelay?: number;
    cumulativeLayoutShift: number;
    timeToInteractive?: number;
    totalBlockingTime?: number;
    speedIndex: number;
}
export interface ResourceTiming {
    url: string;
    type: string;
    size: number;
    duration: number;
    startTime: number;
}
export interface PagePerformanceResponse {
    url: string;
    loadTime: number;
    domContentLoaded: number;
    firstPaint: number;
    fullyLoaded: number;
    downloadSize: number;
    requestCount: number;
    webVitals: WebVitalsMetrics;
    resourceTimings: ResourceTiming[];
    performanceScore: number;
    harFile?: string;
    screenshot?: string;
    issues: string[];
    recommendations: string[];
}
export interface PageSizeResource {
    url: string;
    type: string;
    size: number;
    compressed: boolean;
    compressedSize?: number;
    cacheable: boolean;
}
export interface PageSizeResponse {
    url: string;
    totalSize: number;
    htmlSize: number;
    cssSize: number;
    javascriptSize: number;
    imageSize: number;
    fontSize: number;
    otherSize: number;
    resourceCount: number;
    resources?: PageSizeResource[];
    resourceBreakdown?: {
        html: number;
        css: number;
        javascript: number;
        images: number;
        fonts: number;
        other: number;
    };
    compressedSize?: number;
    compressionRatio?: number;
}
export interface PageSnapshotResponse {
    url: string;
    device: 'desktop' | 'mobile' | 'tablet';
    timestamp: Date;
    imagePath: string;
    width: number;
    height: number;
    format: string;
    sizeInBytes: number;
    title?: string;
    viewport: {
        width: number;
        height: number;
    };
    userAgent?: string;
    colorScheme?: 'dark' | 'light' | 'no-preference';
}
export interface NetworkToolsService {
    nslookup(domain: string, options?: NsLookupOptions): Promise<string>;
    dig(domain: string, options?: DigOptions): Promise<string>;
    ping(host: string, options?: PingOptions): Promise<string>;
    traceroute(host: string, options?: TracerouteOptions): Promise<string>;
    telnet(host: string, options: TelnetOptions): Promise<boolean>;
    httpRequest(url: string, options?: HttpRequestOptions): Promise<HttpResponse>;
    webSocket(url: string, options?: WebSocketOptions): Promise<WebSocketClient>;
    whois(domain: string, options?: WhoisOptions): Promise<string>;
    ipInfo(ip: string, options?: IpInfoOptions): Promise<IpInfoResponse>;
    checkSslCertificate(host: string, options?: SslCertificateOptions): Promise<SslCertificateResponse>;
    mtr(host: string, options?: MtrOptions): Promise<string>;
    checkDnsSec(domain: string, options?: DnsSecOptions): Promise<DnsSecCheckResponse>;
    setupDnsSec(domain: string, config: DnsSecConfig): Promise<DnsSecSetupResponse>;
    checkDomainExpiration(domain: string, options?: DomainExpirationOptions): Promise<DomainExpirationResponse>;
    checkDomainAvailability(domain: string, options?: DomainAvailabilityOptions): Promise<DomainAvailabilityResponse>;
    registerDomain(domain: string, options: DomainRegistrationOptions): Promise<DomainRegistrationResponse>;
    detectTechnologies(url: string, options?: TechnologyDetectionOptions): Promise<TechnologyDetectionResponse>;
    analyzePage(url: string, options?: PageAnalysisOptions): Promise<PageAnalysisResponse>;
    measurePerformance(url: string, options?: PagePerformanceOptions): Promise<PagePerformanceResponse>;
    measurePageSize(url: string, options?: PageSizeOptions): Promise<PageSizeResponse>;
    capturePageSnapshot(url: string, options: PageSnapshotOptions): Promise<PageSnapshotResponse>;
}
