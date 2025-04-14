# SPEC-011-mtr: MTR (My Traceroute) Tool Specification

## SPEC-011-mtr:overview-001

The MTR (My Traceroute) tool provides functionality to combine the features of traceroute and ping in a single network diagnostic tool. It traces the route packets take to a network host while continuously monitoring and displaying the quality of each hop. This specification outlines the implementation details, options, and usage of the MTR feature within the MCPDNS Network Tools suite.

## SPEC-011-mtr:requirements-001

### Functional Requirements

1. Trace the network path to a specified host by IP address or domain name
2. Continuously monitor each hop in the route with statistical information
3. Display packet loss, latency, and jitter for each hop
4. Support for configurable number of ping cycles
5. Support for configurable maximum number of hops
6. Configurable timeout settings
7. Return formatted results in a consistent manner

### Technical Requirements

1. Implementation must be non-blocking and asynchronous
2. Must handle network errors gracefully
3. Should support both IPv4 and IPv6 addresses
4. Must validate input parameters
5. Should provide output similar to standard MTR utilities

## SPEC-011-mtr:interface-001

### Type Definitions

```typescript
// MTR Options
export interface MtrOptions {
  count?: number;     // Number of ping cycles to perform
  timeout?: number;   // Timeout in milliseconds for each probe
  maxHops?: number;   // Maximum number of hops to trace
}
```

### Service Method

```typescript
mtr(host: string, options?: MtrOptions): Promise<string>;
```

## SPEC-011-mtr:behavior-001

### Input Validation

- The `host` parameter must be a valid hostname or IP address
- The `count` option, if provided, must be a positive integer
- The `timeout` option, if provided, must be a positive number
- The `maxHops` option, if provided, must be a positive integer

### Processing

1. Validate all input parameters
2. Resolve the hostname to an IP address if a domain name is provided
3. Discover the route to the destination using incrementing TTL values
4. For each hop in the route:
   - Send multiple ping packets to measure packet loss and latency
   - Calculate statistical information (min/avg/max/stddev)
   - Track packet loss percentage
5. Compile the route information with timing and loss statistics
6. Return the formatted result as a string

### Error Handling

- Network connectivity issues should throw an appropriate error
- Invalid hostnames or IP addresses should throw a descriptive error
- Timeout errors should be clearly indicated
- Permission errors (e.g., when raw sockets require elevated privileges) should be handled
- Unreachable hops should be indicated with appropriate markers

## SPEC-011-mtr:examples-001

### Basic MTR Usage

```typescript
// Run MTR to example.com with default settings
const result = await networkTools.mtr('example.com');
console.log(result);
```

### Custom Count and Timeout

```typescript
// Run MTR to Google's DNS server with 10 ping cycles and a 2-second timeout
const result = await networkTools.mtr('8.8.8.8', {
  count: 10,
  timeout: 2000
});
console.log(result);
```

### Custom Maximum Hops

```typescript
// Run MTR with maximum 15 hops
const result = await networkTools.mtr('192.168.1.1', {
  maxHops: 15
});
console.log(result);
```

## SPEC-011-mtr:implementation-notes-001

- The implementation should use platform-appropriate methods to send probe packets
- For cross-platform compatibility, consider using an MTR library that works across different operating systems
- Be aware of permission requirements for raw sockets on different platforms
- On systems where raw sockets require elevated privileges, consider alternative implementations:
  - Using child processes to execute the system mtr command
  - Implementing a custom solution combining traceroute and ping functionality
- Format the output to include:
  - Hop number
  - Router IP address (and hostname if available)
  - Packet loss percentage
  - Statistical information (sent/received packets)
  - Latency statistics (min/avg/max/stddev)
- Consider implementing DNS resolution for each hop's IP address
- Ensure proper error handling for various network conditions
- Consider implementing a progress callback for long-running MTR operations

## SPEC-011-mtr:security-considerations-001

- Be aware that MTR functionality may be used for network reconnaissance
- Implement rate limiting to prevent abuse
- Consider adding authentication requirements for MTR operations
- Be cautious about allowing arbitrary hosts to be traced in public-facing applications
- Validate and sanitize all user inputs to prevent command injection when using child processes
- Some networks may block MTR probes as a security measure, so handle these cases gracefully

## SPEC-011-mtr:differences-from-traceroute-001

The MTR tool differs from the standard traceroute tool in the following ways:

1. Continuously monitors each hop rather than sending a fixed number of probes
2. Provides statistical information about packet loss and latency variation
3. Shows real-time updates of network conditions (in interactive mode)
4. Combines the functionality of traceroute and ping in a single tool
5. Generally provides more comprehensive network path analysis
6. Better suited for identifying intermittent network issues
7. Provides a more detailed view of network performance

## SPEC-011-mtr:output-format-001

The MTR output should include the following information for each hop:

1. Hop number
2. Hostname (if available)
3. IP address
4. Packet loss percentage
5. Number of packets sent
6. Number of packets received
7. Minimum round-trip time
8. Average round-trip time
9. Maximum round-trip time
10. Standard deviation of round-trip times

Example output format:
```
Host                                Loss%   Snt   Last   Avg  Best  Wrst StDev
1. router.local                      0.0%    10    0.3   0.4   0.3   0.7   0.1
2. 192.168.100.1                     0.0%    10    1.2   1.5   1.0   2.3   0.4
3. isp-gateway.example.com           0.0%    10    5.1   5.8   4.9   8.2   1.0
4. backbone-router.example.com      10.0%    10   15.3  14.2  10.1  20.5   3.2
5. destination.example.com           0.0%    10   22.1  21.8  20.5  25.3   1.5
```

## SPEC-011-mtr:future-enhancements-001

- Interactive mode with real-time updates
- Graphical representation of network path and statistics
- Export options for different formats (JSON, CSV, XML)
- Path change detection and alerting
- Integration with geolocation data to show geographical path
- Support for different probe protocols (ICMP, UDP, TCP)
- Parallel probing for faster results
- Historical data comparison
- Network performance scoring