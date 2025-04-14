# SPEC-dns-mcp-ip-info-009: IP Information Tool Specification

## SPEC-dns-mcp-ip-info-009:overview-001

The IP Information tool provides functionality to retrieve detailed information about IP addresses, including geolocation, organization, ASN, and other network-related details. This specification outlines the implementation details, options, and usage of the IP information feature within the MCPDNS Network Tools suite.

## SPEC-dns-mcp-ip-info-009:requirements-001

### Functional Requirements

1. Retrieve detailed information about IPv4 and IPv6 addresses
2. Support for multiple data sources (WHOIS, RDAP, third-party APIs)
3. Provide geolocation information (country, region, city, coordinates)
4. Identify organization and ASN information
5. Provide ISP and network details
6. Support for configurable timeout settings
7. Return structured IP information in a consistent format

### Technical Requirements

1. Implementation must be non-blocking and asynchronous
2. Must handle network errors gracefully
3. Should support both IPv4 and IPv6 addresses
4. Must validate input parameters
5. Should implement caching to reduce repeated queries
6. Should handle rate limiting from data sources

## SPEC-dns-mcp-ip-info-009:interface-001

### Type Definitions

```typescript
// IP Info Options
export interface IpInfoOptions {
  source?: 'whois' | 'rdap' | 'ipinfo' | 'maxmind' | 'ipapi';  // Data source
  timeout?: number;                                            // Query timeout in milliseconds
}

// IP Info Response
export interface IpInfoResponse {
  ip: string;                    // The IP address
  organization?: string;         // Organization name
  asn?: string;                  // Autonomous System Number
  country?: string;              // Country code
  region?: string;               // Region/state
  city?: string;                 // City
  geolocation?: {                // Geographic coordinates
    latitude: number;
    longitude: number;
  };
  isp?: string;                  // Internet Service Provider
  abuse?: {                      // Abuse contact information
    email?: string;
    phone?: string;
  };
}
```

### Service Method

```typescript
ipInfo(ip: string, options?: IpInfoOptions): Promise<IpInfoResponse>;
```

## SPEC-dns-mcp-ip-info-009:behavior-001

### Input Validation

- The `ip` parameter must be a valid IPv4 or IPv6 address
- The `source` option, if provided, must be one of the defined sources
- The `timeout` option, if provided, must be a positive number

### Processing

1. Validate all input parameters
2. Determine the appropriate data source to query:
   - Use the specified source if provided
   - Otherwise, use a default source or a combination of sources
3. Query the data source(s) for information about the IP address
4. Process and normalize the response data
5. Construct an IpInfoResponse object with the IP information
6. Return the structured IP information

### Error Handling

- Network connectivity issues should throw an appropriate error
- Invalid IP addresses should throw a descriptive error
- Timeout errors should be clearly indicated
- Data source errors should be propagated with context
- Rate limiting responses should be handled appropriately
- Missing information should result in undefined fields rather than errors

## SPEC-dns-mcp-ip-info-009:examples-001

### Basic Usage

```typescript
// Get information about an IP address
const info = await networkTools.ipInfo('8.8.8.8');
console.log(`IP: ${info.ip}`);
console.log(`Organization: ${info.organization}`);
console.log(`Country: ${info.country}`);
console.log(`City: ${info.city}`);
if (info.geolocation) {
  console.log(`Coordinates: ${info.geolocation.latitude}, ${info.geolocation.longitude}`);
}
```

### Specific Data Source

```typescript
// Get information using a specific data source
const info = await networkTools.ipInfo('1.1.1.1', {
  source: 'ipinfo'
});
console.log(info);
```

### Custom Timeout

```typescript
// Get information with a 5-second timeout
const info = await networkTools.ipInfo('2001:4860:4860::8888', {
  timeout: 5000
});
console.log(info);
```

## SPEC-dns-mcp-ip-info-009:implementation-notes-001

- The implementation should support multiple data sources:
  - WHOIS/RDAP databases
  - MaxMind GeoIP database
  - ipinfo.io API
  - ip-api.com
  - Other geolocation services
- Consider implementing a local database for basic IP information:
  - MaxMind GeoLite2 for offline geolocation
  - ASN database for network information
- Implement proper caching to reduce repeated queries:
  - Cache results with appropriate TTL
  - Consider persistent caching for frequently queried IPs
- Handle different data formats from various sources:
  - Normalize country codes (use ISO 3166-1 alpha-2)
  - Standardize organization names
  - Convert coordinates to consistent format
- Implement proper error handling for various scenarios:
  - Network connectivity issues
  - Rate limiting
  - Invalid or reserved IP addresses
  - Missing information
- Consider implementing fallback mechanisms:
  - Try alternative sources if primary source fails
  - Combine data from multiple sources for more complete information
- Use appropriate logging for debugging IP information queries

## SPEC-dns-mcp-ip-info-009:security-considerations-001

- Be aware that IP information queries may be used for reconnaissance
- Implement rate limiting to prevent abuse
- Consider adding authentication requirements for IP information operations
- Be cautious about storing or logging IP information
- Be aware of the privacy implications of IP geolocation
- Consider the implications of GDPR and similar regulations on IP data
- Validate and sanitize all user inputs
- Be transparent about data sources and their accuracy

## SPEC-dns-mcp-ip-info-009:data-sources-001

The implementation should consider the following data sources:

1. **WHOIS/RDAP**:
   - Regional Internet Registries (RIRs) databases
   - ARIN, RIPE, APNIC, LACNIC, AFRINIC
   - Provides authoritative network allocation information

2. **Commercial APIs**:
   - ipinfo.io
   - IP-API.com
   - IPStack
   - IPGeolocation.io
   - Provides comprehensive geolocation and network information

3. **Local Databases**:
   - MaxMind GeoIP/GeoLite2
   - IP2Location
   - Provides offline lookup capabilities
   - Requires regular updates

4. **Public APIs**:
   - ipify.org
   - freegeoip.app
   - Provides basic information with fewer restrictions

The implementation should document the accuracy and limitations of each data source.

## SPEC-dns-mcp-ip-info-009:future-enhancements-001

- Support for batch IP lookups
- Historical IP information tracking
- IP reputation and threat intelligence integration
- VPN and proxy detection
- Tor exit node detection
- Network range and CIDR information
- Reverse DNS integration
- Weather information based on geolocation
- Time zone information
- Currency and language information for geolocation