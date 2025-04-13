---
id: SPEC-dns-mcp-future-001
created: 2025-04-12
---

# Future Features

## 1. Introduction

This document outlines planned future features for the DNS MCP Server. These features are not part of the initial implementation but are documented here to provide a roadmap for future development. The features described in this document include additional DNS record type support, domain purchase functionality, email configuration verification, and DKIM/SPF verification.

## 2. Additional DNS Record Types

### 2.1 Feature Overview

The initial implementation of the DNS MCP Server supports only NS (Name Server) records. Future versions will expand support to include additional record types, starting with A, AAAA, and MX records.

### 2.2 Record Types to Support

#### 2.2.1 A Records

A records map a domain name to an IPv4 address.

```typescript
interface ARecord extends DNSRecord {
  type: 'A';
  value: string; // IPv4 address
}
```

Example response:

```json
{
  "domain": "example.com",
  "recordType": "A",
  "provider": "google",
  "fromCache": false,
  "timestamp": "2025-04-12T20:00:00.000Z",
  "results": [
    {
      "provider": "google",
      "responseTime": 85,
      "records": [
        {
          "name": "example.com",
          "ttl": 3600,
          "type": "A",
          "value": "93.184.216.34"
        }
      ]
    }
  ]
}
```

#### 2.2.2 AAAA Records

AAAA records map a domain name to an IPv6 address.

```typescript
interface AAAARecord extends DNSRecord {
  type: 'AAAA';
  value: string; // IPv6 address
}
```

Example response:

```json
{
  "domain": "example.com",
  "recordType": "AAAA",
  "provider": "google",
  "fromCache": false,
  "timestamp": "2025-04-12T20:00:00.000Z",
  "results": [
    {
      "provider": "google",
      "responseTime": 92,
      "records": [
        {
          "name": "example.com",
          "ttl": 3600,
          "type": "AAAA",
          "value": "2606:2800:220:1:248:1893:25c8:1946"
        }
      ]
    }
  ]
}
```

#### 2.2.3 MX Records

MX records specify the mail servers responsible for accepting email messages on behalf of a domain.

```typescript
interface MXRecord extends DNSRecord {
  type: 'MX';
  priority: number;
  value: string; // Mail server hostname
}
```

Example response:

```json
{
  "domain": "example.com",
  "recordType": "MX",
  "provider": "google",
  "fromCache": false,
  "timestamp": "2025-04-12T20:00:00.000Z",
  "results": [
    {
      "provider": "google",
      "responseTime": 110,
      "records": [
        {
          "name": "example.com",
          "ttl": 3600,
          "type": "MX",
          "priority": 10,
          "value": "mail.example.com"
        },
        {
          "name": "example.com",
          "ttl": 3600,
          "type": "MX",
          "priority": 20,
          "value": "backup-mail.example.com"
        }
      ]
    }
  ]
}
```

### 2.3 Implementation Approach

1. Extend the DNS lookup model to support additional record types
2. Update provider implementations to handle different record types
3. Add new MCP tools for each record type
4. Implement record-specific parsing and formatting
5. Update caching to handle different record types

### 2.4 User Interface Considerations

1. Add record type selection in the command interface
2. Provide record-specific formatting in the UI
3. Enable filtering and sorting by record type
4. Add record type icons for visual identification

## 3. Domain Purchase Functionality

### 3.1 Feature Overview

Building on the domain search feature, the domain purchase functionality will allow users to purchase domains directly from their IDE. This feature will streamline the process of securing domain names for new projects.

### 3.2 Key Capabilities

- Purchase domains from various registrars
- Configure domain settings (nameservers, WHOIS privacy, etc.)
- Manage domain renewals
- Transfer domains between registrars
- Set up domain forwarding and DNS records

### 3.3 Implementation Details

#### 3.3.1 Domain Purchase Model

```typescript
interface DomainPurchaseModel {
  purchaseDomain(domain: string, options: PurchaseOptions): Promise<PurchaseResult>;
  getDomainStatus(domain: string): Promise<DomainStatusResult>;
  configureDomain(domain: string, config: DomainConfig): Promise<ConfigResult>;
  renewDomain(domain: string, years: number): Promise<RenewalResult>;
  transferDomain(domain: string, options: TransferOptions): Promise<TransferResult>;
}

interface PurchaseOptions {
  registrar: string;
  years: number;
  whoisPrivacy: boolean;
  autoRenew: boolean;
  nameservers?: string[];
  contactInfo: ContactInfo;
}

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

interface PurchaseResult {
  domain: string;
  successful: boolean;
  orderId?: string;
  registrar: string;
  expirationDate: string;
  price: {
    total: number;
    currency: string;
    breakdown: {
      registration: number;
      whoisPrivacy?: number;
      taxes?: number;
    };
  };
  nameservers: string[];
  status: string;
  nextSteps?: string[];
}

interface DomainStatusResult {
  domain: string;
  registrar: string;
  status: string[];
  creationDate: string;
  expirationDate: string;
  autoRenew: boolean;
  whoisPrivacy: boolean;
  nameservers: string[];
  dnsRecords: DNSRecord[];
}

interface ConfigResult {
  domain: string;
  successful: boolean;
  changes: string[];
  errors?: string[];
}

interface RenewalResult {
  domain: string;
  successful: boolean;
  newExpirationDate: string;
  price: {
    total: number;
    currency: string;
  };
  receiptId?: string;
}

interface TransferOptions {
  authCode: string;
  targetRegistrar: string;
  contactInfo: ContactInfo;
}

interface TransferResult {
  domain: string;
  successful: boolean;
  status: string;
  estimatedCompletionDate?: string;
  errors?: string[];
}
```

#### 3.3.2 MCP Tool Definition

```javascript
const domainPurchaseTool = {
  name: 'domain_purchase',
  description: 'Purchase a domain name',
  inputSchema: {
    type: 'object',
    properties: {
      domain: {
        type: 'string',
        description: 'Domain name to purchase'
      },
      registrar: {
        type: 'string',
        description: 'Registrar to use for the purchase'
      },
      years: {
        type: 'number',
        description: 'Number of years to register the domain',
        default: 1
      },
      whoisPrivacy: {
        type: 'boolean',
        description: 'Whether to enable WHOIS privacy protection',
        default: true
      }
    },
    required: ['domain', 'registrar']
  },
  outputSchema: {
    type: 'object',
    properties: {
      domain: { type: 'string' },
      successful: { type: 'boolean' },
      orderId: { type: 'string' },
      registrar: { type: 'string' },
      expirationDate: { type: 'string' },
      price: {
        type: 'object',
        properties: {
          total: { type: 'number' },
          currency: { type: 'string' },
          breakdown: {
            type: 'object',
            properties: {
              registration: { type: 'number' },
              whoisPrivacy: { type: 'number' },
              taxes: { type: 'number' }
            }
          }
        }
      },
      nameservers: { 
        type: 'array',
        items: { type: 'string' }
      },
      status: { type: 'string' },
      nextSteps: { 
        type: 'array',
        items: { type: 'string' }
      }
    }
  },
  handler: async (params) => {
    // Implementation
  }
};
```

### 3.4 Integration with Payment Processors

The domain purchase feature will integrate with payment processors to handle secure transactions. Potential integrations include:

1. Stripe
2. PayPal
3. Registrar-specific payment systems
4. Apple Pay / Google Pay
5. Credit card processing services

### 3.5 Security Considerations

1. Secure handling of payment information
2. PCI compliance for credit card processing
3. Secure storage of authentication tokens
4. Protection of personal contact information
5. Secure communication with registrar APIs
6. Audit logging for all purchase transactions

## 4. Email Configuration Verification

### 4.1 Feature Overview

The email configuration verification feature will help users verify that their domain's email configuration is set up correctly. This includes checking MX records, SPF, DKIM, and DMARC configurations.

### 4.2 Key Capabilities

- Verify MX records are correctly configured
- Check SPF record syntax and configuration
- Validate DKIM record presence and format
- Verify DMARC policy configuration
- Provide recommendations for improving email deliverability

### 4.3 Implementation Details

#### 4.3.1 Email Configuration Model

```typescript
interface EmailConfigurationModel {
  verifyMXRecords(domain: string): Promise<MXVerificationResult>;
  verifySPF(domain: string): Promise<SPFVerificationResult>;
  verifyDKIM(domain: string, selector?: string): Promise<DKIMVerificationResult>;
  verifyDMARC(domain: string): Promise<DMARCVerificationResult>;
  verifyAll(domain: string): Promise<EmailVerificationResult>;
}

interface MXVerificationResult {
  domain: string;
  records: MXRecord[];
  valid: boolean;
  issues: string[];
  recommendations: string[];
}

interface SPFVerificationResult {
  domain: string;
  record?: string;
  valid: boolean;
  syntax: {
    valid: boolean;
    errors: string[];
  };
  includes: string[];
  allowedIPs: string[];
  issues: string[];
  recommendations: string[];
}

interface DKIMVerificationResult {
  domain: string;
  selector?: string;
  record?: string;
  valid: boolean;
  issues: string[];
  recommendations: string[];
}

interface DMARCVerificationResult {
  domain: string;
  record?: string;
  valid: boolean;
  policy?: 'none' | 'quarantine' | 'reject';
  subdomainPolicy?: 'none' | 'quarantine' | 'reject';
  percentage?: number;
  reportEmail?: string[];
  forensicEmail?: string[];
  issues: string[];
  recommendations: string[];
}

interface EmailVerificationResult {
  domain: string;
  mx: MXVerificationResult;
  spf: SPFVerificationResult;
  dkim: DKIMVerificationResult;
  dmarc: DMARCVerificationResult;
  overallScore: number; // 0-100
  issues: string[];
  recommendations: string[];
}
```

#### 4.3.2 Example Response

```json
{
  "domain": "example.com",
  "mx": {
    "valid": true,
    "records": [
      {
        "name": "example.com",
        "ttl": 3600,
        "priority": 10,
        "value": "mail.example.com"
      }
    ],
    "issues": [],
    "recommendations": []
  },
  "spf": {
    "valid": true,
    "record": "v=spf1 include:_spf.example.com ~all",
    "issues": [],
    "recommendations": [
      "Consider changing ~all to -all for stricter enforcement"
    ]
  },
  "dkim": {
    "valid": false,
    "selector": "default",
    "record": null,
    "issues": [
      "No DKIM record found for selector 'default'"
    ],
    "recommendations": [
      "Add a DKIM record for the 'default' selector",
      "If using a different selector, specify it in the request"
    ]
  },
  "dmarc": {
    "valid": false,
    "record": null,
    "policy": null,
    "issues": [
      "No DMARC record found"
    ],
    "recommendations": [
      "Add a DMARC record with at least a monitoring policy (p=none)",
      "Configure a reporting email address to receive DMARC reports"
    ]
  },
  "overallScore": 50,
  "issues": [
    "Missing DKIM configuration",
    "Missing DMARC configuration"
  ],
  "recommendations": [
    "Configure DKIM for improved email authentication",
    "Add a DMARC policy to monitor email authentication results"
  ]
}
```

### 4.4 Email Configuration Templates

The feature will provide templates for common email configurations:

1. Google Workspace (Gmail)
2. Microsoft 365
3. Zoho Mail
4. Amazon SES
5. SendGrid
6. Mailchimp
7. Custom SMTP server

## 5. DKIM, SPF, and DMARC Verification

### 5.1 Feature Overview

Building on the email configuration verification, this feature will provide more detailed analysis and verification of DKIM, SPF, and DMARC records. It will help users understand and troubleshoot email authentication issues.

### 5.2 Key Capabilities

- Detailed SPF syntax validation
- DKIM key validation and testing
- DMARC policy analysis and recommendations
- Email authentication simulation
- Record generation and formatting

### 5.3 Implementation Details

#### 5.3.1 SPF Verification

```typescript
interface SPFVerifier {
  parse(record: string): SPFParseResult;
  validate(record: string): SPFValidationResult;
  test(record: string, ip: string): SPFTestResult;
  generate(options: SPFGenerateOptions): string;
}

interface SPFParseResult {
  version: string;
  mechanisms: SPFMechanism[];
  modifiers: SPFModifier[];
  all: 'all' | '~all' | '-all' | '?all';
}

interface SPFMechanism {
  type: 'a' | 'mx' | 'ptr' | 'ip4' | 'ip6' | 'exists' | 'include' | 'redirect';
  value: string;
  qualifier: '+' | '-' | '~' | '?';
}

interface SPFModifier {
  type: 'redirect' | 'exp';
  value: string;
}

interface SPFValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  lookups: number;
  maxLookups: number;
}

interface SPFTestResult {
  result: 'pass' | 'fail' | 'softfail' | 'neutral' | 'none' | 'temperror' | 'permerror';
  explanation: string;
  mechanisms: string[];
}

interface SPFGenerateOptions {
  includes: string[];
  ips: string[];
  domains: string[];
  policy: 'all' | '~all' | '-all' | '?all';
}
```

### 5.4 Record Generation

The feature will include tools to generate properly formatted DNS records:

1. SPF record generator
2. DKIM record generator
3. DMARC record generator

## 6. Implementation Timeline

The future features will be implemented according to the following timeline:

### Phase 1: Additional DNS Record Types
- Estimated timeline: Q3 2025
- Priority: High
- Dependencies: Core DNS lookup functionality

### Phase 2: Email Configuration Verification
- Estimated timeline: Q4 2025
- Priority: Medium
- Dependencies: Additional DNS record types (MX)

### Phase 3: DKIM, SPF, and DMARC Verification
- Estimated timeline: Q1 2026
- Priority: Medium
- Dependencies: Email configuration verification

### Phase 4: Domain Purchase Functionality
- Estimated timeline: Q2 2026
- Priority: Low
- Dependencies: Domain search feature

## 7. Conclusion

The future features outlined in this document will significantly enhance the capabilities of the DNS MCP Server, making it a comprehensive tool for DNS management, email configuration, and domain management. These features will be implemented incrementally, with each phase building on the previous one to provide a cohesive and powerful set of tools for users.
