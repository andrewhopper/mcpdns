# SPEC-dns-mcp-dig-001: DNS Dig Tool Specification

## SPEC-dns-mcp-dig-001:overview-001

The DNS Dig (Domain Information Groper) tool provides a more detailed DNS lookup functionality similar to the command-line dig utility. It offers comprehensive DNS query capabilities with formatted output and additional options compared to the basic nslookup tool. This specification outlines the implementation details, options, and usage of the dig feature within the MCPDNS Network Tools suite.

## SPEC-dns-mcp-dig-001:requirements-001

### Functional Requirements

1. Perform detailed DNS queries with comprehensive output
2. Support for all standard DNS record types
3. Ability to specify custom DNS servers
4. Option for short-format output
5. Configurable timeout settings
6. Return formatted results in a consistent manner

### Technical Requirements

1. Implementation must be non-blocking and asynchronous
2. Must handle network errors gracefully
3. Should support both IPv4 and IPv6 lookups
4. Must validate input parameters
5. Should provide output similar to the standard dig command-line utility

## SPEC-dns-mcp-dig-001:interface-001

### Type Definitions

```typescript
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

// Dig Options
export interface DigOptions {
  server?: string;        // Custom DNS server to query
  type?: DnsRecordType;   // Type of DNS record to query
  short?: boolean;        // Whether to use short output format
  timeout?: number;       // Query timeout in milliseconds
}
```

### Service Method

```typescript
dig(domain: string, options?: DigOptions): Promise<string>;
```

## SPEC-dns-mcp-dig-001:behavior-001

### Input Validation

- The `domain` parameter must be a valid domain name string
- The `server` option, if provided, must be a valid DNS server IP address
- The `type` option must be one of the defined DnsRecordType enum values
- The `short` option must be a boolean value
- The `timeout` option, if provided, must be a positive number

### Processing

1. Validate all input parameters
2. Construct the DNS query based on the provided options
3. Send the query to the specified DNS server or default system DNS
4. Wait for response with timeout handling
5. Parse the response data
6. Format the output based on the `short` option setting
7. Return the formatted result as a string

### Error Handling

- Network connectivity issues should return an appropriate error message
- Invalid domain names should return a descriptive error
- Timeout errors should be clearly indicated
- DNS server errors should be propagated with context

## SPEC-dns-mcp-dig-001:examples-001

### Basic Usage

```typescript
// Query A records for example.com
const result = await networkTools.dig('example.com', { type: DnsRecordType.A });
```

### Custom DNS Server with Short Output

```typescript
// Query MX records using Google's DNS server with short output format
const result = await networkTools.dig('example.com', {
  type: DnsRecordType.MX,
  server: '8.8.8.8',
  short: true
});
```

### Custom Timeout

```typescript
// Query TXT records with a 5-second timeout
const result = await networkTools.dig('example.com', {
  type: DnsRecordType.TXT,
  timeout: 5000
});
```

## SPEC-dns-mcp-dig-001:implementation-notes-001

- The implementation should aim to provide output similar to the standard dig command-line utility
- Consider using a DNS resolution library that supports detailed query information
- Include query statistics such as query time, when received, etc.
- Format the output to include sections similar to dig: QUESTION, ANSWER, AUTHORITY, and ADDITIONAL
- When `short` is true, only include the ANSWER section without headers and additional information
- Cache frequently requested DNS records to improve performance
- Ensure proper logging of DNS query operations for debugging purposes
- Consider implementing DNSSEC validation support

## SPEC-dns-mcp-dig-001:differences-from-nslookup-001

The dig tool differs from the nslookup tool in the following ways:

1. More detailed output format similar to the dig command-line utility
2. Includes query statistics and timing information
3. Provides sections for QUESTION, ANSWER, AUTHORITY, and ADDITIONAL records
4. Offers a short output format option
5. Only supports a single DNS server per query (vs. multiple servers in nslookup)
6. Generally provides more technical and comprehensive information suitable for DNS administrators and advanced users