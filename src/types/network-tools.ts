// Network Tools Types

// DNS Record Types
export enum DnsRecordType {
  A = 'A',
  AAAA = 'AAAA',
  CNAME = 'CNAME',
  MX = 'MX',
  NS = 'NS',
  PTR = 'PTR',
  SOA = 'SOA',
  SRV = 'SRV',
  TXT = 'TXT',
  CAA = 'CAA',
  DNSKEY = 'DNSKEY',
  DS = 'DS',
  NAPTR = 'NAPTR',
  NSEC = 'NSEC',
  RRSIG = 'RRSIG',
  ANY = 'ANY'
}

// HTTP Method Types
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS'
}

// DNSSEC Algorithm Types
export enum DnsSecAlgorithm {
  RSA_SHA1 = 'RSA/SHA-1',
  RSA_SHA256 = 'RSA/SHA-256',
  RSA_SHA512 = 'RSA/SHA-512',
  ECDSA_P256_SHA256 = 'ECDSA P-256/SHA-256',
  ECDSA_P384_SHA384 = 'ECDSA P-384/SHA-384',
  ED25519 = 'ED25519',
  ED448 = 'ED448'
}

// Website Technology Category Types
export enum TechnologyCategory {
  CMS = 'cms',
  ANALYTICS = 'analytics',
  JAVASCRIPT_FRAMEWORK = 'javascript_framework',
  ADVERTISING = 'advertising',
  ECOMMERCE = 'ecommerce',
  PAYMENT = 'payment',
  MARKETING = 'marketing',
  HOSTING = 'hosting',
  TAG_MANAGER = 'tag_manager',
  CDN = 'cdn',
  SECURITY = 'security',
  FONT = 'font',
  OTHER = 'other'
}

// NsLookup Options
export interface NsLookupOptions {
  servers?: string | string[];
  type?: DnsRecordType;
  timeout?: number;
}

// Dig Options
export interface DigOptions {
  server?: string;
  type?: DnsRecordType;
  short?: boolean;
  timeout?: number;
}

// Ping Options
export interface PingOptions {
  count?: number;
  timeout?: number;
  interval?: number;
}

// Traceroute Options
export interface TracerouteOptions {
  maxHops?: number;
  timeout?: number;
  protocol?: 'icmp' | 'udp' | 'tcp';
}

// Telnet Options
export interface TelnetOptions {
  port: number;
  timeout?: number;
}

// HTTP Request Options
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

// WebSocket Options
export interface WebSocketOptions {
  headers?: Record<string, string>;
  protocols?: string[];
  timeout?: number;
  auth?: {
    username: string;
    password: string;
  };
}

// Whois Options
export interface WhoisOptions {
  server?: string;
  timeout?: number;
}

// IP Info Options
export interface IpInfoOptions {
  source?: 'whois' | 'rdap' | 'ipinfo' | 'maxmind' | 'ipapi';
  timeout?: number;
}

// SSL Certificate Options
export interface SslCertificateOptions {
  port?: number;
  timeout?: number;
  showFullChain?: boolean;
}

// MTR Options
export interface MtrOptions {
  count?: number;
  timeout?: number;
  maxHops?: number;
}

// DNSSEC Options
export interface DnsSecOptions {
  server?: string;
  timeout?: number;
  algorithm?: DnsSecAlgorithm;
}

// Domain Expiration Options
export interface DomainExpirationOptions {
  checkPrivateWhois?: boolean;
  timeout?: number;
}

// Domain Availability Options
export interface DomainAvailabilityOptions {
  tlds?: string[];
  timeout?: number;
}

// Domain Registration Options
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
  period?: number; // in years
  privacy?: boolean;
  autoRenew?: boolean;
}

// DNSSEC Configuration
export interface DnsSecConfig {
  algorithm: DnsSecAlgorithm;
  keySize?: number;
  flags?: number;
  ttl?: number;
}

// Technology Detection Options
export interface TechnologyDetectionOptions {
  categories?: TechnologyCategory[];
  includeVersions?: boolean;
  timeout?: number;
  userAgent?: string;
  deepScan?: boolean;
}

// Page Analysis Options
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

// Page Performance Options
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

// Page Size Measurement Options
export interface PageSizeOptions {
  includeResources?: boolean;
  includeResourceBreakdown?: boolean;
  timeout?: number;
  userAgent?: string;
}

// Page Snapshot Options
export interface PageSnapshotOptions {
  device: 'desktop' | 'mobile' | 'tablet';
  fullPage?: boolean;
  format?: 'png' | 'jpeg' | 'pdf';
  quality?: number; // 0-100 for jpeg
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

// Response Types

// IP Info Response
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

// SSL Certificate Response
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

// DNSSEC Check Response
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

// DNSSEC Setup Response
export interface DnsSecSetupResponse {
  success: boolean;
  dsRecords?: string[];
  keyRecords?: string[];
  error?: string;
}

// Domain Expiration Response
export interface DomainExpirationResponse {
  domain: string;
  expirationDate: Date;
  daysUntilExpiration: number;
  registrar?: string;
  autoRenew?: boolean;
  privacyEnabled?: boolean;
}

// Domain Availability Response
export interface DomainAvailabilityResponse {
  domain: string;
  available: boolean;
  suggestions?: string[];
}

// Domain Registration Response
export interface DomainRegistrationResponse {
  success: boolean;
  domain: string;
  expirationDate?: Date;
  transactionId?: string;
  authCode?: string;
  nameServers?: string[];
  error?: string;
}

// HTTP Response
export interface HttpResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

// WebSocket Client
export interface WebSocketClient {
  connect: () => void;
  send: (data: string) => void;
  onMessage: (callback: (data: string) => void) => void;
  onClose: (callback: () => void) => void;
  close: () => void;
}

// Technology Detection - detected technology details
export interface TechnologyDetails {
  name: string;
  category: TechnologyCategory | string;
  version?: string;
  confidence: number;
  website?: string;
  description?: string;
  icon?: string;
  cpe?: string; // Common Platform Enumeration identifier
}

// Technology Detection Response
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

// Meta Tag Analysis
export interface MetaTagAnalysis {
  title?: string;
  description?: string;
  keywords?: string[];
  robots?: string;
  viewport?: string;
  ogTags: Record<string, string>; // Open Graph tags
  twitterTags: Record<string, string>;
  canonicalUrl?: string;
  otherTags: Record<string, string>;
  hasValidTags: boolean;
  issues: string[];
  recommendations: string[];
}

// SEO Analysis
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
  score: number; // 0-100
}

// Page Analysis Response
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
    score: number; // 0-100
  };
}

// Web Vitals Performance Metrics
export interface WebVitalsMetrics {
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay?: number;
  cumulativeLayoutShift: number;
  timeToInteractive?: number;
  totalBlockingTime?: number;
  speedIndex: number;
}

// Resource Timing
export interface ResourceTiming {
  url: string;
  type: string;
  size: number;
  duration: number;
  startTime: number;
}

// Page Performance Response
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
  performanceScore: number; // 0-100
  harFile?: string; // Path to HAR file if saved
  screenshot?: string; // Path to screenshot if saved
  issues: string[];
  recommendations: string[];
}

// Page Size Analysis Resource
export interface PageSizeResource {
  url: string;
  type: string;
  size: number;
  compressed: boolean;
  compressedSize?: number;
  cacheable: boolean;
}

// Page Size Response
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

// Page Snapshot Response
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

// Service Interface
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
  
  // Website technology detection
  detectTechnologies(url: string, options?: TechnologyDetectionOptions): Promise<TechnologyDetectionResponse>;
  
  // Page analysis
  analyzePage(url: string, options?: PageAnalysisOptions): Promise<PageAnalysisResponse>;
  
  // Page performance measurement
  measurePerformance(url: string, options?: PagePerformanceOptions): Promise<PagePerformanceResponse>;
  
  // Page size measurement
  measurePageSize(url: string, options?: PageSizeOptions): Promise<PageSizeResponse>;
  
  // Page snapshot
  capturePageSnapshot(url: string, options: PageSnapshotOptions): Promise<PageSnapshotResponse>;
}