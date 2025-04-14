# SPEC-dns-mcp-whois-001: WHOIS Lookup Tool Specification

## SPEC-dns-mcp-whois-001:overview-001

The WHOIS Lookup tool provides functionality to query WHOIS servers for information about domain names, IP addresses, and autonomous system numbers (ASNs). This specification outlines the implementation details, options, and usage of the WHOIS lookup feature within the MCPDNS Network Tools suite.

## SPEC-dns-mcp-whois-001:requirements-001

### Functional Requirements

1. Query WHOIS information for domain names
2. Query WHOIS information for IP addresses
3. Query WHOIS information for ASNs
4. Support for specifying custom WHOIS servers
5. Configurable timeout settings
6. Return formatted WHOIS information as a string

### Technical Requirements

1. Implementation must be non-blocking and asynchronous
2. Must handle network errors gracefully
3. Should support both IPv4 and IPv6 addresses
4. Must validate input parameters
5. Should handle different WHOIS server response formats
6. Should follow WHOIS server redirects when necessary

## SPEC-dns-mcp-whois-001:interface-001

### Type Definitions

```typescript
// Whois Options
export interface WhoisOptions {
  server?: string;    // Custom WHOIS server to query
  timeout?: number;   // Query timeout in milliseconds
}
```

### Service Method

```typescript
whois(domain: string, options?: WhoisOptions): Promise<string>;
```

## SPEC-dns-mcp-whois-001:behavior-001

### Input Validation

- The `domain` parameter must be a valid domain name, IP address, or ASN
- The `server` option, if provided, must be a valid hostname or IP address
- The `timeout` option, if provided, must be a positive number

### Processing

1. Validate all input parameters
2. Determine the appropriate WHOIS server to query:
   - Use the specified server if provided
   - For domains, determine the appropriate TLD WHOIS server
   - For IP addresses, use the appropriate RIR WHOIS server
   - For ASNs, use the appropriate RIR WHOIS server
3. Connect to the WHOIS server and send the query
4. Handle any referrals or redirects to other WHOIS servers
5. Process and format the WHOIS response
6. Return the formatted WHOIS information as a string

### Error Handling

- Network connectivity issues should throw an appropriate error
- Invalid domain names, IP addresses, or ASNs should throw a descriptive error
- Timeout errors should be clearly indicated
- WHOIS server errors should be handled appropriately
- Rate limiting by WHOIS servers should be handled gracefully

## SPEC-dns-mcp-whois-001:examples-001

### Basic Domain WHOIS Lookup

```typescript
// Look up WHOIS information for example.com
const whoisInfo = await networkTools.whois('example.com');
console.log(whoisInfo);
```

### IP Address WHOIS Lookup

```typescript
// Look up WHOIS information for an IP address
const whoisInfo = await networkTools.whois('8.8.8.8');
console.log(whoisInfo);
```

### Custom WHOIS Server and Timeout

```typescript
// Look up WHOIS information using a specific server with a 10-second timeout
const whoisInfo = await networkTools.whois('example.org', {
  server: 'whois.pir.org',
  timeout: 10000
});
console.log(whoisInfo);
```

### Error Handling

```typescript
try {
  const whoisInfo = await networkTools.whois('example.invalid');
  console.log(whoisInfo);
} catch (error) {
  console.error('WHOIS lookup failed:', error.message);
}
```

## SPEC-dns-mcp-whois-001:implementation-notes-001

- The implementation should use a robust WHOIS client library
- For cross-platform compatibility, use a library that works across different operating systems
- Maintain a database or configuration of TLD WHOIS servers for domain lookups
- Maintain a list of RIR WHOIS servers for IP and ASN lookups
- Implement proper handling of WHOIS server redirects and referrals
- Consider implementing caching of WHOIS responses to reduce load on WHOIS servers
- Be aware of rate limiting by WHOIS servers and implement appropriate throttling
- Handle different WHOIS server response formats and encodings
- Consider implementing parsing of WHOIS responses into structured data
- Use appropriate logging for debugging WHOIS query issues

## SPEC-dns-mcp-whois-001:security-considerations-001

- Validate and sanitize all input parameters
- Be aware that WHOIS lookups may be used for information gathering
- Implement rate limiting to prevent abuse
- Consider adding authentication requirements for WHOIS operations
- Be cautious about storing or logging sensitive information from WHOIS responses
- Be aware of privacy implications of WHOIS data, especially with GDPR and similar regulations
- Consider implementing redaction of personal information from WHOIS responses

## SPEC-dns-mcp-whois-001:limitations-001

- WHOIS protocol is being phased out in favor of RDAP for many registries
- Many domain registrars now redact personal information due to privacy regulations
- WHOIS servers may have different rate limiting policies
- WHOIS responses are not standardized and may vary in format
- Some WHOIS servers may require specific query formats
- WHOIS data may be incomplete or outdated
- Some TLDs may not have public WHOIS servers

## SPEC-dns-mcp-whois-001:future-enhancements-001

- Integration with RDAP (Registration Data Access Protocol) as a modern alternative to WHOIS
- Structured parsing of WHOIS responses into JSON format
- Historical WHOIS data tracking and comparison
- Privacy-aware WHOIS querying with automatic redaction
- Integration with domain monitoring and alerting systems
- Support for internationalized domain names (IDNs) in WHOIS queries
- Enhanced caching and rate limiting strategies