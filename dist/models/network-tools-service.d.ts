import { NetworkToolsService, NsLookupOptions, DigOptions, PingOptions, TracerouteOptions, TelnetOptions, HttpRequestOptions, WebSocketOptions, WhoisOptions, IpInfoOptions, SslCertificateOptions, MtrOptions, DnsSecOptions, DnsSecConfig, DomainExpirationOptions, DomainAvailabilityOptions, DomainRegistrationOptions, HttpResponse, WebSocketClient, IpInfoResponse, SslCertificateResponse, DnsSecCheckResponse, DnsSecSetupResponse, DomainExpirationResponse, DomainAvailabilityResponse, DomainRegistrationResponse } from '../types';
/**
 * Implementation of NetworkToolsService that wraps system utilities
 * for DNS and network troubleshooting
 */
export declare class NetworkToolsServiceImpl implements NetworkToolsService {
    /**
     * Execute nslookup command
     * @param domain Domain name to lookup
     * @param options NsLookup options
     * @returns Promise with command output
     */
    nslookup(domain: string, options?: NsLookupOptions): Promise<string>;
    /**
     * Execute dig command
     * @param domain Domain name to lookup
     * @param options Dig options
     * @returns Promise with command output
     */
    dig(domain: string, options?: DigOptions): Promise<string>;
    /**
     * Execute ping command
     * @param host Host to ping
     * @param options Ping options
     * @returns Promise with command output
     */
    ping(host: string, options?: PingOptions): Promise<string>;
    /**
     * Execute traceroute command
     * @param host Host to trace
     * @param options Traceroute options
     * @returns Promise with command output
     */
    traceroute(host: string, options?: TracerouteOptions): Promise<string>;
    /**
     * Execute telnet command to check if a port is open
     * @param host Host to connect to
     * @param options Telnet options
     * @returns Promise with boolean indicating success
     */
    telnet(host: string, options: TelnetOptions): Promise<boolean>;
    /**
     * Make HTTP/HTTPS request
     * @param url URL to request
     * @param options HTTP request options
     * @returns Promise with HTTP response
     */
    httpRequest(url: string, options?: HttpRequestOptions): Promise<HttpResponse>;
    /**
     * Create WebSocket connection
     * @param url WebSocket URL
     * @param options WebSocket options
     * @returns Promise with WebSocket client
     */
    webSocket(url: string, options?: WebSocketOptions): Promise<WebSocketClient>;
    /**
     * Execute whois command
     * @param domain Domain name to lookup
     * @param options Whois options
     * @returns Promise with command output
     */
    whois(domain: string, options?: WhoisOptions): Promise<string>;
    /**
     * Get IP information
     * @param ip IP address to lookup
     * @param options IP info options
     * @returns Promise with IP info response
     */
    ipInfo(ip: string, options?: IpInfoOptions): Promise<IpInfoResponse>;
    /**
     * Check SSL certificate
     * @param host Host to check
     * @param options SSL certificate options
     * @returns Promise with SSL certificate response
     */
    checkSslCertificate(host: string, options?: SslCertificateOptions): Promise<SslCertificateResponse>;
    /**
     * Execute MTR command (My Traceroute)
     * @param host Host to trace
     * @param options MTR options
     * @returns Promise with command output
     */
    mtr(host: string, options?: MtrOptions): Promise<string>;
    /**
     * Check DNSSEC
     * @param domain Domain name to check
     * @param options DNSSEC options
     * @returns Promise with DNSSEC check response
     */
    checkDnsSec(domain: string, options?: DnsSecOptions): Promise<DnsSecCheckResponse>;
    /**
     * Setup DNSSEC
     * @param domain Domain name to setup DNSSEC for
     * @param config DNSSEC configuration
     * @returns Promise with DNSSEC setup response
     */
    setupDnsSec(domain: string, config: DnsSecConfig): Promise<DnsSecSetupResponse>;
    /**
     * Check domain expiration
     * @param domain Domain name to check
     * @param options Domain expiration options
     * @returns Promise with domain expiration response
     */
    checkDomainExpiration(domain: string, options?: DomainExpirationOptions): Promise<DomainExpirationResponse>;
    /**
     * Check domain availability
     * @param domain Domain name to check
     * @param options Domain availability options
     * @returns Promise with domain availability response
     */
    checkDomainAvailability(domain: string, options?: DomainAvailabilityOptions): Promise<DomainAvailabilityResponse>;
    /**
     * Register domain
     * @param domain Domain name to register
     * @param options Domain registration options
     * @returns Promise with domain registration response
     */
    registerDomain(domain: string, options: DomainRegistrationOptions): Promise<DomainRegistrationResponse>;
}
