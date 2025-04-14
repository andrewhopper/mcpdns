# SPEC-017-technology-detection: Website Technology Detection Tool Specification

## SPEC-017-technology-detection:overview-001

The Website Technology Detection tool provides functionality to identify and analyze technologies used by websites, including content management systems, JavaScript frameworks, analytics tools, and other web technologies. This specification outlines the implementation details, options, and usage of the technology detection feature within the MCPDNS Network Tools suite.

## SPEC-017-technology-detection:requirements-001

### Functional Requirements

1. Detect technologies used by websites
2. Categorize detected technologies by type
3. Identify technology versions when possible
4. Filter detection by technology categories
5. Support for deep scanning for more thorough detection
6. Configurable timeout and user agent settings
7. Return structured technology detection results in a consistent format

### Technical Requirements

1. Implementation must be non-blocking and asynchronous
2. Must handle network errors gracefully
3. Must validate input parameters
4. Should implement multiple detection methods
5. Should maintain an updated database of technology signatures
6. Should handle different website structures and technologies

## SPEC-017-technology-detection:interface-001

### Type Definitions

```typescript
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

// Technology Detection Options
export interface TechnologyDetectionOptions {
  categories?: TechnologyCategory[];  // Categories to detect
  includeVersions?: boolean;          // Whether to detect versions
  timeout?: number;                   // Request timeout in milliseconds
  userAgent?: string;                 // Custom user agent
  deepScan?: boolean;                 // Whether to perform a deep scan
}

// Technology Details
export interface TechnologyDetails {
  name: string;                       // Technology name
  category: TechnologyCategory | string;  // Technology category
  version?: string;                   // Detected version
  confidence: number;                 // Detection confidence (0-100)
  website?: string;                   // Technology website
  description?: string;               // Technology description
  icon?: string;                      // Technology icon URL
  cpe?: string;                       // Common Platform Enumeration identifier
}

// Technology Detection Response
export interface TechnologyDetectionResponse {
  url: string;                        // The URL that was analyzed
  technologies: TechnologyDetails[];  // Detected technologies
  hasWordpress: boolean;              // Whether WordPress was detected
  hasGoogleAnalytics: boolean;        // Whether Google Analytics was detected
  hasGoogleTagManager: boolean;       // Whether Google Tag Manager was detected
  hasFacebook: boolean;               // Whether Facebook technologies were detected
  hasReact: boolean;                  // Whether React was detected
  hasVue: boolean;                    // Whether Vue.js was detected
  hasAngular: boolean;                // Whether Angular was detected
  hasJQuery: boolean;                 // Whether jQuery was detected
  hasBootstrap: boolean;              // Whether Bootstrap was detected
  ecommercePlatform?: string;         // Detected e-commerce platform
  javascript: {                       // JavaScript technologies
    libraries: string[];              // Detected JS libraries
    frameworks: string[];             // Detected JS frameworks
  };
  analytics: string[];                // Detected analytics tools
  advertising: string[];              // Detected advertising tools
  cms?: string;                       // Detected CMS
}
```

### Service Method

```typescript
detectTechnologies(url: string, options?: TechnologyDetectionOptions): Promise<TechnologyDetectionResponse>;
```

## SPEC-017-technology-detection:behavior-001

### Input Validation

- The `url` parameter must be a valid URL
- The `categories` option, if provided, must be an array of valid TechnologyCategory values
- The `includeVersions` option must be a boolean
- The `timeout` option, if provided, must be a positive number
- The `userAgent` option, if provided, must be a string
- The `deepScan` option must be a boolean

### Processing

1. Validate all input parameters
2. Fetch the website content with the specified options
3. Apply detection techniques:
   - HTML content analysis
   - JavaScript library detection
   - HTTP header analysis
   - Meta tag analysis
   - If deepScan is enabled:
     - Analyze additional page resources
     - Execute JavaScript and analyze runtime environment
     - Check for API endpoints and patterns
4. Categorize and organize detected technologies
5. Determine versions when possible and requested
6. Calculate confidence scores for each detection
7. Construct a TechnologyDetectionResponse object with the detection results
8. Return the structured technology detection information

### Error Handling

- Network connectivity issues should throw an appropriate error
- Invalid URLs should throw a descriptive error
- Timeout errors should be clearly indicated
- Content parsing errors should be handled gracefully
- Inaccessible websites should return appropriate error information

## SPEC-017-technology-detection:examples-001

### Basic Technology Detection

```typescript
// Detect technologies used by example.com
const result = await networkTools.detectTechnologies('https://example.com');
console.log(`Detected ${result.technologies.length} technologies on ${result.url}`);
result.technologies.forEach(tech => {
  console.log(`- ${tech.name} (${tech.category})${tech.version ? ` v${tech.version}` : ''}`);
});
```

### Filtered Category Detection

```typescript
// Detect only CMS and JavaScript frameworks
const result = await networkTools.detectTechnologies('https://example.org', {
  categories: [TechnologyCategory.CMS, TechnologyCategory.JAVASCRIPT_FRAMEWORK],
  includeVersions: true
});
console.log(result);
```

### Deep Scan with Custom User Agent

```typescript
// Perform a deep scan with a mobile user agent
const result = await networkTools.detectTechnologies('https://example.com', {
  deepScan: true,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
  timeout: 30000
});
console.log(result);
```

## SPEC-017-technology-detection:implementation-notes-001

- The implementation should use multiple detection techniques:
  - HTML pattern matching
  - JavaScript library detection
  - HTTP header analysis
  - Meta tag analysis
  - DOM structure analysis
  - Resource URL patterns
  - API endpoint detection
- Maintain a comprehensive database of technology signatures:
  - Regular expression patterns
  - JavaScript variable patterns
  - HTTP header patterns
  - DOM element patterns
- Consider using or adapting existing technology detection libraries:
  - Wappalyzer
  - BuiltWith API
  - What CMS
- Implement version detection through:
  - Version strings in HTML/JS/CSS
  - File hashes comparison
  - API response patterns
- Optimize performance:
  - Implement caching of detection results
  - Use efficient pattern matching algorithms
  - Prioritize detection of common technologies
- For deep scanning:
  - Consider using headless browsers for JavaScript execution
  - Implement resource limitation to prevent excessive scanning
  - Handle single-page applications appropriately
- Use appropriate logging for debugging detection issues

## SPEC-017-technology-detection:security-considerations-001

- Validate and sanitize all input parameters
- Implement proper error handling to avoid information leakage
- Be cautious about executing JavaScript from untrusted websites
- Implement rate limiting to prevent abuse
- Consider adding authentication requirements for technology detection operations
- Be aware of potential legal implications of website scanning
- Respect robots.txt directives
- Implement appropriate user agent identification
- Consider the privacy implications of technology fingerprinting
- Be cautious about storing or logging detected technology information

## SPEC-017-technology-detection:detection-categories-001

The implementation should detect technologies in the following categories:

1. **Content Management Systems (CMS)**:
   - WordPress, Drupal, Joomla, Magento, Shopify, Wix, Squarespace, etc.

2. **JavaScript Frameworks and Libraries**:
   - React, Angular, Vue.js, jQuery, Bootstrap, Ember.js, Backbone.js, etc.

3. **Analytics and Tracking**:
   - Google Analytics, Adobe Analytics, Matomo, Hotjar, Mixpanel, etc.

4. **Advertising Networks**:
   - Google AdSense, Facebook Ads, Amazon Associates, AdRoll, etc.

5. **E-commerce Platforms**:
   - Shopify, WooCommerce, Magento, BigCommerce, PrestaShop, etc.

6. **Payment Systems**:
   - PayPal, Stripe, Square, Braintree, Authorize.Net, etc.

7. **Marketing Tools**:
   - HubSpot, Marketo, Mailchimp, Constant Contact, etc.

8. **Hosting and Infrastructure**:
   - AWS, Cloudflare, Netlify, Vercel, Heroku, etc.

9. **Tag Managers**:
   - Google Tag Manager, Adobe Tag Manager, Tealium, etc.

10. **CDNs**:
    - Cloudflare, Akamai, Fastly, Amazon CloudFront, etc.

11. **Security Tools**:
    - reCAPTCHA, Cloudflare, Sucuri, etc.

12. **Fonts and Typography**:
    - Google Fonts, Adobe Fonts, Font Awesome, etc.

## SPEC-017-technology-detection:future-enhancements-001

- Machine learning-based detection for improved accuracy
- Vulnerability scanning based on detected technologies and versions
- Historical technology tracking and change detection
- Competitive analysis features
- Technology usage statistics and trends
- Integration with security advisories for detected technologies
- Performance impact analysis of detected technologies
- Recommendations for technology alternatives or upgrades
- API endpoint discovery and documentation
- Integration with other tools for deeper analysis