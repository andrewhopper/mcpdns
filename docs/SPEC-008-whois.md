# SPEC-008-whois: WHOIS Lookup Tool Specification

## SPEC-008-whois:overview-001

The WHOIS Lookup tool provides functionality to query WHOIS servers for domain registration information. It retrieves details about domain ownership, registration dates, nameservers, and other domain-related information. This specification outlines the implementation details, options, and usage of the WHOIS lookup feature within the MCPDNS Network Tools suite.

## SPEC-008-whois:requirements-001

### Functional Requirements

1. Query WHOIS information for domain names
2. Support for specifying custom WHOIS servers
3. Support for configurable timeout settings
4. Return formatted WHOIS information as a string
5. Handle various WHOIS server response formats

### Technical Requirements

1. Implementation must be non-blocking and asynchronous
2. Must handle network errors gracefully
3. Should support both IPv4 and IPv6 WHOIS servers
4. Must validate input parameters
5. Should handle rate limiting and restrictions from WHOIS servers
6. Should support WHOIS referrals to authoritative servers

## SPEC-008-whois:interface-001

### Type Definitions

```typescript
// Whois Options
export interface WhoisOptions {
  server?: string;     // Custom WHOIS server to query
  timeout?: number;    // Query timeout in milliseconds
}
```

### Service Method

```typescript
whois(domain: string, options?: WhoisOptions): Promise<string>;
```

## SPEC-008-whois:behavior-001

### Input Validation

- The `domain` parameter must be a valid domain name
- The `server` option, if provided, must be a valid hostname or IP address
- The `timeout` option, if provided, must be a positive number

### Processing

1. Validate all input parameters
2. Determine the appropriate WHOIS server to query:
   - Use the specified server if provided
   - Otherwise, determine the appropriate server based on the TLD
3. Connect to the WHOIS server
4. Send the WHOIS query for the specified domain
5. Receive and process the response
6. Handle referrals to other WHOIS servers if necessary
7. Return the formatted WHOIS information as a string

### Error Handling

- Network connectivity issues should throw an appropriate error
- Invalid domain names should throw a descriptive error
- Timeout errors should be clearly indicated
- WHOIS server errors should be propagated with context
- Rate limiting responses should be handled appropriately

## SPEC-008-whois:examples-001

### Basic Usage

```typescript
// Query WHOIS information for example.com
const whoisInfo = await networkTools.whois('example.com');
console.log(whoisInfo);
```

### Custom WHOIS Server

```typescript
// Query WHOIS information using a specific WHOIS server
const whoisInfo = await networkTools.whois('example.org', {
  server: 'whois.pir.org'
});
console.log(whoisInfo);
```

### Custom Timeout

```typescript
// Query WHOIS with a 10-second timeout
const whoisInfo = await networkTools.whois('example.net', {
  timeout: 10000
});
console.log(whoisInfo);
```

## SPEC-008-whois:implementation-notes-001

- The implementation should maintain a database of WHOIS servers for different TLDs
- For cross-platform compatibility, use a networking library that works across different operating systems
- Handle different WHOIS server response formats:
  - Standard WHOIS format
  - RIPE database format
  - Referral responses
  - No match responses
- Implement proper handling of character encodings (some WHOIS servers use non-UTF-8 encodings)
- Consider implementing caching of WHOIS responses to reduce server load
- Implement proper handling of rate limiting:
  - Respect rate limits imposed by WHOIS servers
  - Implement backoff strategies when rate limited
  - Consider using a queue for multiple WHOIS requests
- Handle WHOIS server referrals:
  - Parse referral information from responses
  - Follow referrals to authoritative WHOIS servers
  - Implement a maximum referral depth to prevent loops
- Use appropriate logging for debugging WHOIS query issues

## SPEC-008-whois:security-considerations-001

- Be aware that WHOIS queries may be used for information gathering
- Implement rate limiting to prevent abuse
- Consider adding authentication requirements for WHOIS operations
- Be cautious about storing or logging sensitive WHOIS information
- Be aware of the privacy implications of WHOIS queries
- Consider the implications of GDPR and similar regulations on WHOIS data availability
- Validate and sanitize all user inputs

## SPEC-008-whois:privacy-considerations-001

The implementation should be aware of privacy considerations related to WHOIS data:

1. **GDPR and Privacy Laws**:
   - Many registrars now redact personal information in WHOIS data
   - Implementation should handle redacted/masked WHOIS responses

2. **RDAP Integration**:
   - Consider supporting RDAP (Registration Data Access Protocol) as a modern alternative to WHOIS
   - RDAP provides structured data and better handles privacy requirements

3. **Data Handling**:
   - Minimize storage of WHOIS data containing personal information
   - Implement appropriate data retention policies
   - Consider anonymizing stored WHOIS data

4. **User Notification**:
   - Inform users about the nature of WHOIS data and its public availability
   - Provide context about privacy protections in place

## SPEC-008-whois:future-enhancements-001

- Structured WHOIS data parsing to extract specific fields
- RDAP (Registration Data Access Protocol) support
- Historical WHOIS data tracking
- WHOIS data comparison and change detection
- Integration with domain monitoring services
- Support for bulk WHOIS queries
- Enhanced privacy-aware WHOIS handling
- Integration with domain availability checking
- WHOIS proxy services for anonymous queries
- Machine learning-based parsing for difficult WHOIS formats