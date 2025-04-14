# SPEC-dns-mcp-ip-info-001: IP Information Tool Specification

## SPEC-dns-mcp-ip-info-001:overview-001

The IP Information tool provides functionality to retrieve detailed information about IP addresses, including geolocation, organization, ASN, and other metadata. This specification outlines the implementation details, options, and usage of the IP information feature within the MCPDNS Network Tools suite.

## SPEC-dns-mcp-ip-info-001:requirements-001

### Functional Requirements

1. Retrieve detailed information about IPv4 and IPv6 addresses
2. Support for multiple data sources (WHOIS, RDAP, third-party services)
3. Provide geolocation information (country, region, city)
4. Provide network information (ASN, organization, ISP)
5. Provide abuse contact information when available
6. Configurable timeout settings
7. Return structured IP information in a consistent format

### Technical Requirements

1. Implementation must be non-blocking and asynchronous
2. Must handle network errors gracefully
3. Should support both IPv4 and IPv6 addresses
4. Must validate input parameters
5. Should handle different data source response formats
6. Should implement fallback mechanisms when primary sources fail

## SPEC-dns-mcp-ip-info-001:interface-001

### Type Definitions

```typescript
// IP Info Options
export interface IpInfoOptions {
  source?: 'whois' | 'rdap' | 'ipinfo' | 'maxmind' | 'ipapi';  // Data source to use
  timeout?: number;                                            // Query timeout in milliseconds
}

// IP Info Response
export interface IpInfoResponse {
  ip: string;                  // The IP address
  organization?: string;       // Organization name
  asn?: string;                // Autonomous System Number
  country?: string;            // Country code
  region?: string;             // Region/state
  city?: string;               // City
  geolocation?: {              // Geographic coordinates
    latitude: number;
    longitude: number;
  };
  isp?: string;                // Internet Service Provider
  abuse?: {                    // Abuse contact information
    email?: string;
    phone?: string;
  };
}
```

### Service Method

```typescript
ipInfo(ip: string, options?: IpInfoOptions): Promise<IpInfoResponse>;
```

## SPEC-dns-mcp-ip-info-001:behavior-001

### Input Validation

- The `ip` parameter must be a valid IPv4 or IPv6 address
- The `source` option must be one of the defined sources
- The `timeout` option, if provided, must be a positive number

### Processing

1. Validate all input parameters
2. Determine the data source to use:
   - Use the specified source if provided
   - Otherwise, use the default source (implementation-defined)
3. Query the selected data source for IP information
4. Process and normalize the response data
5. Construct an IpInfoResponse object with the available information
6. Return the structured IP information

### Error Handling

- Network connectivity issues should throw an appropriate error
- Invalid IP addresses should throw a descriptive error
- Timeout errors should be clearly indicated
- Data source errors should be handled appropriately
- If the primary data source fails, attempt to use fallback sources if available

## SPEC-dns-mcp-ip-info-001:examples-001

### Basic IP Information Lookup

```typescript
// Look up information for Google's DNS server
const info = await networkTools.ipInfo('8.8.8.8');
console.log(`Organization: ${info.organization}`);
console.log(`Location: ${info.city}, ${info.region}, ${info.country}`);
console.log(`ASN: ${info.asn}`);
```

### Specifying a Data Source

```typescript
// Look up information using the RDAP source
const info = await networkTools.ipInfo('2001:4860:4860::8888', {
  source: 'rdap'
});
console.log(info);
```

### Custom Timeout

```typescript
// Look up information with a 5-second timeout
const info = await networkTools.ipInfo('1.1.1.1', {
  timeout: 5000
});
console.log(info);
```

### Error Handling

```typescript
try {
  const info = await networkTools.ipInfo('192.168.1.1'); // Private IP
  console.log(info);
} catch (error) {
  console.error('IP info lookup failed:', error.message);
}
```

## SPEC-dns-mcp-ip-info-001:implementation-notes-001

- The implementation should support multiple data sources:
  - WHOIS: Regional Internet Registries (RIRs) WHOIS servers
  - RDAP: Registration Data Access Protocol servers
  - ipinfo.io: Commercial IP geolocation service
  - MaxMind GeoIP: Commercial or free geolocation database
  - ip-api.com: Free IP geolocation API
- Consider implementing a local database for basic IP information to reduce external API calls
- Implement proper caching of IP information to improve performance and reduce API usage
- Handle rate limiting by third-party services appropriately
- Consider implementing a provider selection strategy based on:
  - Availability
  - Rate limits
  - Data quality
  - Response time
- Normalize responses from different providers into a consistent format
- Use appropriate logging for debugging IP information lookup issues

## SPEC-dns-mcp-ip-info-001:security-considerations-001

- Validate and sanitize all input parameters
- Be aware that IP information lookups may be used for information gathering
- Implement rate limiting to prevent abuse
- Consider adding authentication requirements for IP information operations
- Be cautious about storing or logging sensitive information
- Consider the privacy implications of IP geolocation
- Be aware of the accuracy limitations of geolocation data
- Ensure compliance with data protection regulations when storing IP information

## SPEC-dns-mcp-ip-info-001:data-sources-001

### WHOIS

- Pros: Authoritative source, comprehensive network information
- Cons: Unstructured data, parsing challenges, rate limiting

### RDAP

- Pros: Structured JSON responses, authoritative source, standardized
- Cons: Not all IP ranges covered, potential rate limiting

### ipinfo.io

- Pros: Easy to use, structured data, additional data points
- Cons: Commercial service with usage limits, requires API key

### MaxMind GeoIP

- Pros: Local database option, no API calls needed, fast lookups
- Cons: Database requires updates, less accurate than API services

### ip-api.com

- Pros: Free tier available, structured data, comprehensive information
- Cons: Rate limiting, commercial use requires paid plan

## SPEC-dns-mcp-ip-info-001:future-enhancements-001

- Integration with threat intelligence platforms to provide security information
- Historical IP information tracking
- Reverse DNS integration
- Network range information (CIDR blocks)
- Routing path visualization
- VPN/proxy/tor exit node detection
- Time zone information based on geolocation
- Custom data source configuration
- Confidence scores for geolocation accuracy