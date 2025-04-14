# SPEC-020-page-size: Web Page Size Measurement Tool Specification

## SPEC-020-page-size:overview-001

The Web Page Size Measurement tool provides functionality to analyze and measure the size characteristics of web pages, including total download size, resource sizes by type, compression efficiency, and resource count. This specification outlines the implementation details, options, and usage of the page size measurement feature within the MCPDNS Network Tools suite.

## SPEC-020-page-size:requirements-001

### Functional Requirements

1. Measure total web page download size
2. Break down size by resource type (HTML, CSS, JavaScript, images, etc.)
3. Analyze resource count and distribution
4. Measure compression efficiency
5. Support for including or excluding specific resources
6. Option for detailed resource breakdown
7. Return structured size measurement results in a consistent format

### Technical Requirements

1. Implementation must be non-blocking and asynchronous
2. Must handle network errors gracefully
3. Must validate input parameters
4. Should implement standard web resource measurement techniques
5. Should handle different website structures and technologies
6. Should provide accurate size measurements for all resource types

## SPEC-020-page-size:interface-001

### Type Definitions

```typescript
// Page Size Options
export interface PageSizeOptions {
  includeResources?: boolean;          // Whether to include resource details
  includeResourceBreakdown?: boolean;  // Whether to include resource type breakdown
  timeout?: number;                    // Request timeout in milliseconds
  userAgent?: string;                  // Custom user agent
}

// Page Size Resource
export interface PageSizeResource {
  url: string;                         // Resource URL
  type: string;                        // Resource type
  size: number;                        // Resource size in bytes
  compressed: boolean;                 // Whether resource is compressed
  compressedSize?: number;             // Compressed size in bytes
  cacheable: boolean;                  // Whether resource is cacheable
}

// Page Size Response
export interface PageSizeResponse {
  url: string;                         // The URL that was measured
  totalSize: number;                   // Total page size in bytes
  htmlSize: number;                    // HTML size in bytes
  cssSize: number;                     // CSS size in bytes
  javascriptSize: number;              // JavaScript size in bytes
  imageSize: number;                   // Images size in bytes
  fontSize: number;                    // Fonts size in bytes
  otherSize: number;                   // Other resources size in bytes
  resourceCount: number;               // Total number of resources
  resources?: PageSizeResource[];      // Detailed resource information
  resourceBreakdown?: {                // Resource count by type
    html: number;                      // HTML resource count
    css: number;                       // CSS resource count
    javascript: number;                // JavaScript resource count
    images: number;                    // Image resource count
    fonts: number;                     // Font resource count
    other: number;                     // Other resource count
  };
  compressedSize?: number;             // Total compressed size in bytes
  compressionRatio?: number;           // Compression ratio (uncompressed/compressed)
}
```

### Service Method

```typescript
measurePageSize(url: string, options?: PageSizeOptions): Promise<PageSizeResponse>;
```

## SPEC-020-page-size:behavior-001

### Input Validation

- The `url` parameter must be a valid URL
- The `includeResources` option must be a boolean
- The `includeResourceBreakdown` option must be a boolean
- The `timeout` option, if provided, must be a positive number
- The `userAgent` option, if provided, must be a string

### Processing

1. Validate all input parameters
2. Load the web page and capture all resource requests
3. Measure the size of each resource:
   - Record original and compressed sizes
   - Categorize resources by type
   - Check cacheability of resources
4. Calculate total page size and size by resource type
5. Calculate compression efficiency
6. Count resources by type
7. Construct a PageSizeResponse object with the size measurement results
8. Return the structured page size information

### Error Handling

- Network connectivity issues should throw an appropriate error
- Invalid URLs should throw a descriptive error
- Timeout errors should be clearly indicated
- Resource loading errors should be handled gracefully
- Inaccessible websites should return appropriate error information

## SPEC-020-page-size:examples-001

### Basic Page Size Measurement

```typescript
// Measure size of example.com with default options
const result = await networkTools.measurePageSize('https://example.com');
console.log(`Size analysis of ${result.url}`);
console.log(`Total size: ${formatBytes(result.totalSize)}`);
console.log(`HTML: ${formatBytes(result.htmlSize)}`);
console.log(`CSS: ${formatBytes(result.cssSize)}`);
console.log(`JavaScript: ${formatBytes(result.javascriptSize)}`);
console.log(`Images: ${formatBytes(result.imageSize)}`);
console.log(`Fonts: ${formatBytes(result.fontSize)}`);
console.log(`Other: ${formatBytes(result.otherSize)}`);
console.log(`Resource count: ${result.resourceCount}`);

// Helper function to format bytes
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
```

### Detailed Resource Breakdown

```typescript
// Measure with detailed resource information
const result = await networkTools.measurePageSize('https://example.org', {
  includeResources: true,
  includeResourceBreakdown: true
});

console.log(`Total size: ${formatBytes(result.totalSize)}`);
console.log(`Compressed size: ${formatBytes(result.compressedSize)}`);
console.log(`Compression ratio: ${result.compressionRatio.toFixed(2)}x`);

if (result.resourceBreakdown) {
  console.log('\nResource count by type:');
  console.log(`HTML: ${result.resourceBreakdown.html}`);
  console.log(`CSS: ${result.resourceBreakdown.css}`);
  console.log(`JavaScript: ${result.resourceBreakdown.javascript}`);
  console.log(`Images: ${result.resourceBreakdown.images}`);
  console.log(`Fonts: ${result.resourceBreakdown.fonts}`);
  console.log(`Other: ${result.resourceBreakdown.other}`);
}

if (result.resources) {
  console.log('\nTop 5 largest resources:');
  const sortedResources = [...result.resources].sort((a, b) => b.size - a.size);
  sortedResources.slice(0, 5).forEach((resource, index) => {
    console.log(`${index + 1}. ${resource.url} (${formatBytes(resource.size)}, ${resource.type})`);
  });
}
```

### Custom Timeout and User Agent

```typescript
// Measure with custom timeout and mobile user agent
const result = await networkTools.measurePageSize('https://example.com', {
  timeout: 30000,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
});
console.log(result);
```

## SPEC-020-page-size:implementation-notes-001

- The implementation should use browser automation tools:
  - Puppeteer, Playwright, or similar for headless browser control
  - Chrome DevTools Protocol for network monitoring
  - Resource timing API for detailed measurements
- For resource size measurement:
  - Record transfer size (compressed) and resource size (uncompressed)
  - Handle different content encodings (gzip, brotli, deflate)
  - Account for HTTP headers in size calculations
  - Handle redirects appropriately
- For resource categorization:
  - Use content-type headers for primary categorization
  - Fall back to file extensions or URL patterns when headers are missing
  - Handle dynamically generated resources
- For compression analysis:
  - Calculate compression ratio for text-based resources
  - Identify uncompressed resources that could benefit from compression
  - Handle different compression algorithms
- For cacheability analysis:
  - Check Cache-Control, Expires, and ETag headers
  - Identify resources without proper cache directives
  - Calculate potential bandwidth savings from caching
- Consider implementing:
  - Resource deduplication detection
  - Unused resource identification
  - Resource minification analysis
  - Image format optimization suggestions
- Use appropriate logging for debugging measurement issues

## SPEC-020-page-size:security-considerations-001

- Validate and sanitize all input parameters
- Implement proper error handling to avoid information leakage
- Be cautious about executing JavaScript from untrusted websites
- Implement rate limiting to prevent abuse
- Consider adding authentication requirements for page size measurement operations
- Be aware of potential legal implications of website scanning
- Respect robots.txt directives
- Implement appropriate user agent identification
- Be cautious about storing or logging resource URLs and content
- Consider the privacy implications of detailed resource analysis

## SPEC-020-page-size:resource-categorization-001

The implementation should categorize resources into these types:

1. **HTML**:
   - Primary document
   - Embedded frames and iframes
   - HTML imports

2. **CSS**:
   - External stylesheets
   - Inline styles (counted as part of HTML)
   - CSS in SVG

3. **JavaScript**:
   - External scripts
   - Inline scripts (counted as part of HTML)
   - JSON data
   - Source maps

4. **Images**:
   - JPEG, PNG, GIF, WebP, AVIF
   - SVG (both inline and external)
   - ICO (favicons)
   - Image sprites

5. **Fonts**:
   - WOFF, WOFF2, TTF, OTF, EOT
   - Font icons

6. **Media**:
   - Audio files
   - Video files
   - Media streams

7. **Other**:
   - XML and data files
   - Manifest files
   - Worker scripts
   - WebAssembly
   - Any unrecognized resource types

## SPEC-020-page-size:optimization-recommendations-001

Based on the size analysis, the tool should provide recommendations for:

1. **Image Optimization**:
   - Convert to modern formats (WebP, AVIF)
   - Properly size images for their display dimensions
   - Use responsive images with srcset
   - Implement lazy loading for below-the-fold images

2. **Text Resource Optimization**:
   - Enable compression (gzip, brotli)
   - Minify HTML, CSS, and JavaScript
   - Remove unused CSS and JavaScript
   - Implement code splitting for JavaScript

3. **Font Optimization**:
   - Use WOFF2 format
   - Subset fonts to include only necessary characters
   - Implement font-display for better loading behavior
   - Consider system fonts or variable fonts

4. **Caching Strategy**:
   - Implement appropriate cache headers
   - Use versioned URLs for cache busting
   - Leverage browser caching for static resources
   - Consider using service workers for offline caching

5. **Resource Loading**:
   - Reduce the number of HTTP requests
   - Implement resource hints (preload, prefetch)
   - Prioritize critical resources
   - Consider resource bundling where appropriate

## SPEC-020-page-size:future-enhancements-001

- Integration with performance measurement for correlation analysis
- Historical size tracking and change detection
- Competitive size benchmarking
- Budget setting and monitoring for page size
- Advanced image analysis (quality, dimensions, format)
- Unused CSS and JavaScript detection
- Third-party resource impact analysis
- Resource dependency graphing
- Mobile vs. desktop size comparison
- Integration with CDN optimization recommendations