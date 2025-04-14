# SPEC-013-dnssec-setup: DNSSEC Setup Tool Specification

## SPEC-013-dnssec-setup:overview-001

The DNSSEC Setup tool provides functionality to generate and configure DNSSEC (Domain Name System Security Extensions) for a domain. This includes key generation, record creation, and providing the necessary information for registrar configuration. This specification outlines the implementation details, options, and usage of the DNSSEC setup feature within the MCPDNS Network Tools suite.

## SPEC-013-dnssec-setup:requirements-001

### Functional Requirements

1. Generate DNSSEC key pairs (ZSK and KSK)
2. Create necessary DNSSEC records (DNSKEY, RRSIG, NSEC/NSEC3)
3. Generate DS records for registrar submission
4. Support for different DNSSEC algorithms
5. Configurable key sizes and parameters
6. Support for TTL configuration
7. Return structured setup results with necessary records and information

### Technical Requirements

1. Implementation must be non-blocking and asynchronous
2. Must handle errors gracefully
3. Must validate input parameters
4. Should implement proper DNSSEC record generation according to RFCs
5. Should support secure key generation and storage
6. Should handle different DNSSEC algorithms and digest types

## SPEC-013-dnssec-setup:interface-001

### Type Definitions

```typescript
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

// DNSSEC Configuration
export interface DnsSecConfig {
  algorithm: DnsSecAlgorithm;    // DNSSEC algorithm to use
  keySize?: number;              // Key size in bits (for RSA)
  flags?: number;                // DNSKEY flags
  ttl?: number;                  // TTL for DNSSEC records in seconds
}

// DNSSEC Setup Response
export interface DnsSecSetupResponse {
  success: boolean;              // Whether the setup was successful
  dsRecords?: string[];          // DS records for registrar submission
  keyRecords?: string[];         // DNSKEY records for DNS configuration
  error?: string;                // Error message if setup failed
}
```

### Service Method

```typescript
setupDnsSec(domain: string, config: DnsSecConfig): Promise<DnsSecSetupResponse>;
```

## SPEC-013-dnssec-setup:behavior-001

### Input Validation

- The `domain` parameter must be a valid domain name
- The `algorithm` property in the config must be one of the defined DnsSecAlgorithm enum values
- The `keySize` property, if provided, must be a positive integer appropriate for the selected algorithm
- The `flags` property, if provided, must be a valid DNSKEY flags value
- The `ttl` property, if provided, must be a positive integer

### Processing

1. Validate all input parameters
2. Generate DNSSEC key pairs:
   - Key Signing Key (KSK) with SEP flag set
   - Zone Signing Key (ZSK) for regular signing
3. Create DNSKEY records from the generated keys
4. Generate DS records from the KSK for registrar submission
5. Construct a DnsSecSetupResponse object with the generated records
6. Return the structured DNSSEC setup information

### Error Handling

- Invalid domain names should throw a descriptive error
- Invalid configuration parameters should throw appropriate errors
- Key generation failures should be handled with clear error messages
- Other unexpected errors should be propagated with context

## SPEC-013-dnssec-setup:examples-001

### Basic DNSSEC Setup

```typescript
// Set up DNSSEC for example.com using RSA/SHA-256
const result = await networkTools.setupDnsSec('example.com', {
  algorithm: DnsSecAlgorithm.RSA_SHA256
});

if (result.success) {
  console.log('DNSSEC setup successful');
  console.log('DS Records for registrar:');
  result.dsRecords.forEach(record => console.log(record));
  console.log('DNSKEY Records for DNS:');
  result.keyRecords.forEach(record => console.log(record));
} else {
  console.error('DNSSEC setup failed:', result.error);
}
```

### Custom Key Size and TTL

```typescript
// Set up DNSSEC with custom key size and TTL
const result = await networkTools.setupDnsSec('example.org', {
  algorithm: DnsSecAlgorithm.RSA_SHA256,
  keySize: 2048,
  ttl: 3600
});
console.log(result);
```

### Using ECDSA Algorithm

```typescript
// Set up DNSSEC using ECDSA P-256
const result = await networkTools.setupDnsSec('example.net', {
  algorithm: DnsSecAlgorithm.ECDSA_P256_SHA256
});
console.log(result);
```

## SPEC-013-dnssec-setup:implementation-notes-001

- The implementation should use robust cryptographic libraries for key generation
- For cross-platform compatibility, use libraries that work across different operating systems
- Implement proper key generation according to DNSSEC best practices
- Support all common DNSSEC algorithms with appropriate default key sizes
- Consider implementing secure key storage options
- Generate both KSK (Key Signing Key) and ZSK (Zone Signing Key) by default
- Format DS and DNSKEY records according to standard zone file syntax
- Support multiple digest types for DS records (SHA-1, SHA-256, SHA-384)
- Consider implementing NSEC3 support for opt-out and privacy
- Use appropriate logging for debugging DNSSEC setup issues

## SPEC-013-dnssec-setup:security-considerations-001

- Validate and sanitize all input parameters
- Use secure random number generation for key creation
- Implement proper key storage with appropriate permissions
- Consider the security implications of different algorithms and key sizes
- Recommend modern algorithms (RSA/SHA-256, ECDSA, ED25519) over legacy ones
- Provide guidance on secure key management practices
- Consider implementing key rollover procedures
- Be cautious about logging sensitive key material
- Implement proper error handling to avoid leaking sensitive information

## SPEC-013-dnssec-setup:algorithm-recommendations-001

The tool should provide appropriate defaults and recommendations for DNSSEC algorithms:

1. **RSA/SHA-256**: Most widely supported, recommended key sizes:
   - KSK: 2048 bits (minimum)
   - ZSK: 1024 bits (minimum)

2. **ECDSA P-256/SHA-256**: More efficient than RSA, fixed key sizes:
   - KSK: 256 bits
   - ZSK: 256 bits

3. **ED25519**: Modern and efficient, fixed key sizes:
   - KSK: 256 bits
   - ZSK: 256 bits

4. **RSA/SHA-1**: Legacy algorithm, not recommended for new deployments

The implementation should discourage the use of weaker algorithms and smaller key sizes while providing flexibility for specific requirements.

## SPEC-013-dnssec-setup:registrar-integration-001

The tool should provide clear instructions for registrar integration:

1. Generate DS records in multiple formats:
   - Standard format: `example.com. IN DS 12345 8 2 A1B2C3D4E5...`
   - Key tag, algorithm, digest type, and digest as separate fields
   - Formats specific to common registrars

2. Provide guidance on submitting DS records to the parent zone:
   - General instructions for registrar submission
   - Specific instructions for common registrars if possible

3. Include verification steps to ensure proper delegation:
   - Instructions to verify DS record publication
   - Commands to check DNSSEC validation

## SPEC-013-dnssec-setup:future-enhancements-001

- Integration with DNS providers for automatic record deployment
- Key rollover planning and execution
- NSEC3 configuration with custom parameters
- Backup and recovery procedures for DNSSEC keys
- Monitoring and alerting for DNSSEC-related issues
- Multi-signer DNSSEC support
- DNSSEC signing as a service
- Integration with HSMs (Hardware Security Modules) for key storage
- Automated key rollover procedures
- DNSSEC policy management