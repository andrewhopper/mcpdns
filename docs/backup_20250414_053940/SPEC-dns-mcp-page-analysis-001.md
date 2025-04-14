# SPEC-dns-mcp-page-analysis-001: Web Page Analysis Tool Specification

## SPEC-dns-mcp-page-analysis-001:overview-001

The Web Page Analysis tool provides functionality to analyze web pages for various aspects including meta tags, images, links, headings, schema markup, SEO, and accessibility. This comprehensive analysis helps identify issues and opportunities for improvement in web pages. This specification outlines the implementation details, options, and usage of the page analysis feature within the MCPDNS Network Tools suite.

## SPEC-dns-mcp-page-analysis-001:requirements-001

### Functional Requirements

1. Analyze web page meta tags and SEO elements
2. Check images for alt text and optimization
3. Analyze links for internal, external, and broken links
4. Evaluate heading structure and hierarchy
5. Check for schema markup and structured data
6. Assess accessibility compliance
7. Provide SEO analysis and recommendations
8. Support for configurable analysis options
9. Return structured analysis results in a consistent format

### Technical Requirements

1. Implementation must be non-blocking and asynchronous
2. Must handle network errors gracefully
3. Must validate input parameters
4. Should implement multiple analysis techniques
5. Should handle different website structures and technologies
6. Should provide actionable recommendations

## SPEC-dns-mcp-page-analysis-001:interface-001

### Type Definitions

```typescript
// Page Analysis Options
export interface PageAnalysisOptions {
  checkMetaTags?: boolean;       // Whether to analyze meta tags
  checkImages?: boolean;         // Whether to analyze images
  checkLinks?: boolean;          // Whether to analyze links
  checkHeaders?: boolean;        // Whether to analyze headers
  checkSchema?: boolean;         // Whether to check schema markup
  checkAccessibility?: boolean;  // Whether to check accessibility
  checkSeo?: boolean;            // Whether to perform SEO analysis
  timeout?: number;              // Request timeout in milliseconds
  userAgent?: string;            // Custom user agent
}

// Meta Tag Analysis
export interface MetaTagAnalysis {
  title?: string;                // Page title
  description?: string;          // Meta description
  keywords?: string[];           // Meta keywords
  robots?: string;               // Robots directive
  viewport?: string;             // Viewport settings
  ogTags: Record<string, string>; // Open Graph tags
  twitterTags: Record<string, string>; // Twitter card tags
  canonicalUrl?: string;         // Canonical URL
  otherTags: Record<string, string>; // Other meta tags
  hasValidTags: boolean;         // Whether essential tags are valid
  issues: string[];              // Identified issues
  recommendations: string[];     // Recommendations for improvement
}

// SEO Analysis
export interface SeoAnalysis {
  title: {
    value?: string;              // Title text
    length: number;              // Title length
    isOptimalLength: boolean;    // Whether title length is optimal
  };
  description: {
    value?: string;              // Description text
    length: number;              // Description length
    isOptimalLength: boolean;    // Whether description length is optimal
  };
  headings: {
    h1Count: number;             // Number of H1 headings
    h2Count: number;             // Number of H2 headings
    h3Count: number;             // Number of H3 headings
    hasProperStructure: boolean; // Whether heading structure is proper
  };
  images: {
    count: number;               // Total image count
    withoutAlt: number;          // Images without alt text
  };
  links: {
    internal: number;            // Internal link count
    external: number;            // External link count
    broken: number;              // Broken link count
  };
  wordCount: number;             // Page word count
  hasCanonicalTag: boolean;      // Whether canonical tag exists
  hasSitemap: boolean;           // Whether sitemap exists
  hasRobotsTxt: boolean;         // Whether robots.txt exists
  mobileCompatible: boolean;     // Whether page is mobile-friendly
  usesHttps: boolean;            // Whether page uses HTTPS
  loadTime: number;              // Page load time in milliseconds
  issues: string[];              // Identified SEO issues
  recommendations: string[];     // SEO recommendations
  score: number;                 // SEO score (0-100)
}

// Page Analysis Response
export interface PageAnalysisResponse {
  url: string;                   // The URL that was analyzed
  title?: string;                // Page title
  metaTags?: MetaTagAnalysis;    // Meta tag analysis
  linkCount: number;             // Total link count
  externalLinks: number;         // External link count
  internalLinks: number;         // Internal link count
  brokenLinks: number;           // Broken link count
  imageCount: number;            // Total image count
  imagesWithoutAlt: number;      // Images without alt text
  headingStructure: {            // Heading structure analysis
    h1: number;                  // H1 count
    h2: number;                  // H2 count
    h3: number;                  // H3 count
    h4: number;                  // H4 count
    h5: number;                  // H5 count
    h6: number;                  // H6 count
    isProperlyStructured: boolean; // Whether structure is proper
  };
  languages: string[];           // Detected languages
  textToHtmlRatio: number;       // Text to HTML ratio
  wordCount: number;             // Page word count
  schemaMarkup: {                // Schema markup analysis
    present: boolean;            // Whether schema markup exists
    types: string[];             // Schema types
    valid: boolean;              // Whether schema is valid
  };
  seo?: SeoAnalysis;             // SEO analysis
  accessibility: {               // Accessibility analysis
    issues: string[];            // Accessibility issues
    recommendations: string[];   // Accessibility recommendations
    score: number;               // Accessibility score (0-100)
  };
}
```

### Service Method

```typescript
analyzePage(url: string, options?: PageAnalysisOptions): Promise<PageAnalysisResponse>;
```

## SPEC-dns-mcp-page-analysis-001:behavior-001

### Input Validation

- The `url` parameter must be a valid URL
- All boolean options must be valid boolean values
- The `timeout` option, if provided, must be a positive number
- The `userAgent` option, if provided, must be a string

### Processing

1. Validate all input parameters
2. Fetch the web page content with the specified options
3. Parse the HTML content
4. Perform requested analyses based on the options:
   - Meta tag analysis
   - Image analysis
   - Link analysis
   - Heading structure analysis
   - Schema markup validation
   - Accessibility evaluation
   - SEO analysis
5. Compile issues and recommendations
6. Calculate scores for SEO and accessibility
7. Construct a PageAnalysisResponse object with the analysis results
8. Return the structured page analysis information

### Error Handling

- Network connectivity issues should throw an appropriate error
- Invalid URLs should throw a descriptive error
- Timeout errors should be clearly indicated
- HTML parsing errors should be handled gracefully
- Inaccessible websites should return appropriate error information

## SPEC-dns-mcp-page-analysis-001:examples-001

### Basic Page Analysis

```typescript
// Analyze example.com with default options
const result = await networkTools.analyzePage('https://example.com');
console.log(`Analysis of ${result.url}`);
console.log(`Title: ${result.title}`);
console.log(`Word count: ${result.wordCount}`);
console.log(`Images: ${result.imageCount} (${result.imagesWithoutAlt} without alt text)`);
console.log(`Links: ${result.linkCount} (${result.internalLinks} internal, ${result.externalLinks} external, ${result.brokenLinks} broken)`);
```

### SEO-Focused Analysis

```typescript
// Analyze with focus on SEO elements
const result = await networkTools.analyzePage('https://example.org', {
  checkMetaTags: true,
  checkHeaders: true,
  checkSeo: true,
  checkLinks: true,
  checkImages: false,
  checkSchema: false,
  checkAccessibility: false
});

if (result.seo) {
  console.log(`SEO Score: ${result.seo.score}/100`);
  console.log('SEO Issues:');
  result.seo.issues.forEach(issue => console.log(`- ${issue}`));
  console.log('SEO Recommendations:');
  result.seo.recommendations.forEach(rec => console.log(`- ${rec}`));
}
```

### Comprehensive Analysis with Custom Timeout

```typescript
// Perform a comprehensive analysis with a 30-second timeout
const result = await networkTools.analyzePage('https://example.com', {
  checkMetaTags: true,
  checkImages: true,
  checkLinks: true,
  checkHeaders: true,
  checkSchema: true,
  checkAccessibility: true,
  checkSeo: true,
  timeout: 30000
});
console.log(result);
```

## SPEC-dns-mcp-page-analysis-001:implementation-notes-001

- The implementation should use multiple analysis techniques:
  - HTML parsing and DOM traversal
  - CSS analysis
  - JavaScript detection
  - HTTP header analysis
  - Resource loading analysis
- For meta tag analysis:
  - Check for essential tags (title, description, viewport)
  - Validate tag content and length
  - Check for social media tags (Open Graph, Twitter)
  - Verify canonical URLs
- For image analysis:
  - Check for alt text
  - Analyze image sizes and formats
  - Check for lazy loading
  - Verify responsive images
- For link analysis:
  - Categorize links (internal, external, anchor)
  - Check for broken links
  - Analyze link text and relevance
  - Check for nofollow attributes
- For heading structure:
  - Verify proper hierarchy (H1 → H2 → H3)
  - Check for skipped levels
  - Analyze heading content
- For schema markup:
  - Detect structured data formats (JSON-LD, Microdata, RDFa)
  - Validate against schema.org specifications
  - Check for required properties
- For accessibility:
  - Check WCAG compliance
  - Verify color contrast
  - Check keyboard navigation
  - Verify ARIA attributes
- For SEO analysis:
  - Combine all relevant factors
  - Weight factors by importance
  - Calculate an overall score
  - Provide actionable recommendations
- Consider using headless browsers for JavaScript-rendered content
- Implement proper caching to improve performance
- Use appropriate logging for debugging analysis issues

## SPEC-dns-mcp-page-analysis-001:security-considerations-001

- Validate and sanitize all input parameters
- Implement proper error handling to avoid information leakage
- Be cautious about executing JavaScript from untrusted websites
- Implement rate limiting to prevent abuse
- Consider adding authentication requirements for page analysis operations
- Be aware of potential legal implications of website scanning
- Respect robots.txt directives
- Implement appropriate user agent identification
- Be cautious about storing or logging analyzed page content
- Consider the privacy implications of page analysis

## SPEC-dns-mcp-page-analysis-001:seo-factors-001

The SEO analysis should consider the following factors:

1. **On-Page Factors**:
   - Title tag (presence, length, keywords)
   - Meta description (presence, length, quality)
   - Heading structure and content
   - URL structure
   - Content quality and length
   - Keyword usage and density
   - Image optimization
   - Internal linking
   - Mobile friendliness

2. **Technical Factors**:
   - Page load speed
   - HTTPS usage
   - Robots.txt and meta robots
   - XML sitemap
   - Canonical tags
   - Structured data
   - HTTP status codes
   - Crawlability
   - Mobile responsiveness

3. **User Experience Factors**:
   - Readability
   - Content organization
   - Navigation structure
   - Ad usage
   - Popup implementation
   - Mobile usability
   - Page layout and design

## SPEC-dns-mcp-page-analysis-001:accessibility-guidelines-001

The accessibility analysis should be based on WCAG (Web Content Accessibility Guidelines) 2.1 and check for:

1. **Perceivable**:
   - Text alternatives for non-text content
   - Captions and alternatives for multimedia
   - Content adaptability
   - Distinguishable content (color contrast, text sizing)

2. **Operable**:
   - Keyboard accessibility
   - Sufficient time to read and use content
   - Seizure prevention
   - Navigable content
   - Input modalities beyond keyboard

3. **Understandable**:
   - Readable text
   - Predictable operation
   - Input assistance

4. **Robust**:
   - Compatible with current and future user tools
   - Valid HTML
   - Proper ARIA usage

## SPEC-dns-mcp-page-analysis-001:future-enhancements-001

- Competitive analysis against similar pages
- Historical tracking of page changes
- Performance optimization recommendations
- Content quality and readability analysis
- Mobile-specific analysis
- Progressive Web App (PWA) assessment
- Security vulnerability scanning
- Privacy compliance checking (GDPR, CCPA)
- Internationalization and localization analysis
- Custom rule creation for specific requirements