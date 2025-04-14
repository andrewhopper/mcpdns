# SPEC-019-page-performance: Web Page Performance Measurement Tool Specification

## SPEC-019-page-performance:overview-001

The Web Page Performance Measurement tool provides functionality to analyze and measure the performance characteristics of web pages, including loading times, rendering metrics, resource usage, and Core Web Vitals. This specification outlines the implementation details, options, and usage of the page performance measurement feature within the MCPDNS Network Tools suite.

## SPEC-019-page-performance:requirements-001

### Functional Requirements

1. Measure web page loading and rendering performance
2. Capture Core Web Vitals metrics (LCP, FID, CLS)
3. Analyze resource loading and timing
4. Support for mobile and desktop device simulation
5. Support for different network connection speeds
6. Option to save HAR files and screenshots
7. Support for multiple measurement runs for consistency
8. Provide performance recommendations
9. Return structured performance results in a consistent format

### Technical Requirements

1. Implementation must be non-blocking and asynchronous
2. Must handle network errors gracefully
3. Must validate input parameters
4. Should implement standard web performance measurement techniques
5. Should handle different website structures and technologies
6. Should provide actionable performance recommendations

## SPEC-019-page-performance:interface-001

### Type Definitions

```typescript
// Page Performance Options
export interface PagePerformanceOptions {
  mobile?: boolean;                // Whether to simulate a mobile device
  connection?: 'slow3G' | '4G' | 'cable' | 'wifi';  // Network connection type
  saveHar?: boolean;               // Whether to save HAR file
  saveScreenshot?: boolean;        // Whether to save screenshot
  timeout?: number;                // Request timeout in milliseconds
  userAgent?: string;              // Custom user agent
  runs?: number;                   // Number of measurement runs
  device?: 'desktop' | 'mobile' | 'tablet';  // Device type to simulate
}

// Web Vitals Performance Metrics
export interface WebVitalsMetrics {
  firstContentfulPaint: number;    // First Contentful Paint (ms)
  largestContentfulPaint: number;  // Largest Contentful Paint (ms)
  firstInputDelay?: number;        // First Input Delay (ms)
  cumulativeLayoutShift: number;   // Cumulative Layout Shift (score)
  timeToInteractive?: number;      // Time to Interactive (ms)
  totalBlockingTime?: number;      // Total Blocking Time (ms)
  speedIndex: number;              // Speed Index (ms)
}

// Resource Timing
export interface ResourceTiming {
  url: string;                     // Resource URL
  type: string;                    // Resource type
  size: number;                    // Resource size in bytes
  duration: number;                // Load duration in ms
  startTime: number;               // Start time in ms
}

// Page Performance Response
export interface PagePerformanceResponse {
  url: string;                     // The URL that was measured
  loadTime: number;                // Total page load time in ms
  domContentLoaded: number;        // DOMContentLoaded event time in ms
  firstPaint: number;              // First paint time in ms
  fullyLoaded: number;             // Fully loaded time in ms
  downloadSize: number;            // Total download size in bytes
  requestCount: number;            // Number of requests
  webVitals: WebVitalsMetrics;     // Core Web Vitals metrics
  resourceTimings: ResourceTiming[]; // Resource timing information
  performanceScore: number;        // Performance score (0-100)
  harFile?: string;                // Path to HAR file if saved
  screenshot?: string;             // Path to screenshot if saved
  issues: string[];                // Identified performance issues
  recommendations: string[];       // Performance recommendations
}
```

### Service Method

```typescript
measurePerformance(url: string, options?: PagePerformanceOptions): Promise<PagePerformanceResponse>;
```

## SPEC-019-page-performance:behavior-001

### Input Validation

- The `url` parameter must be a valid URL
- The `mobile` option must be a boolean
- The `connection` option, if provided, must be one of the defined connection types
- The `saveHar` and `saveScreenshot` options must be boolean values
- The `timeout` option, if provided, must be a positive number
- The `userAgent` option, if provided, must be a string
- The `runs` option, if provided, must be a positive integer
- The `device` option, if provided, must be one of the defined device types

### Processing

1. Validate all input parameters
2. Configure the measurement environment based on options:
   - Set up device emulation if specified
   - Configure network throttling if specified
   - Set custom user agent if specified
3. Perform the specified number of measurement runs
4. For each run:
   - Load the web page
   - Collect performance metrics
   - Capture resource timings
   - Measure Core Web Vitals
   - Save HAR file and/or screenshot if requested
5. Aggregate and analyze results from all runs
6. Identify performance issues and generate recommendations
7. Calculate an overall performance score
8. Construct a PagePerformanceResponse object with the performance results
9. Return the structured page performance information

### Error Handling

- Network connectivity issues should throw an appropriate error
- Invalid URLs should throw a descriptive error
- Timeout errors should be clearly indicated
- Page loading errors should be handled gracefully
- Measurement errors should be documented in the response
- Inaccessible websites should return appropriate error information

## SPEC-019-page-performance:examples-001

### Basic Performance Measurement

```typescript
// Measure performance of example.com with default options
const result = await networkTools.measurePerformance('https://example.com');
console.log(`Performance analysis of ${result.url}`);
console.log(`Load time: ${result.loadTime}ms`);
console.log(`Performance score: ${result.performanceScore}/100`);
console.log(`Largest Contentful Paint: ${result.webVitals.largestContentfulPaint}ms`);
console.log(`Cumulative Layout Shift: ${result.webVitals.cumulativeLayoutShift}`);
```

### Mobile Performance with Slow Connection

```typescript
// Measure mobile performance with slow 3G connection
const result = await networkTools.measurePerformance('https://example.org', {
  mobile: true,
  connection: 'slow3G',
  saveScreenshot: true
});
console.log(`Mobile performance score: ${result.performanceScore}/100`);
console.log(`Screenshot saved to: ${result.screenshot}`);
```

### Multiple Measurement Runs with HAR File

```typescript
// Perform 3 measurement runs and save HAR file
const result = await networkTools.measurePerformance('https://example.com', {
  runs: 3,
  saveHar: true,
  device: 'desktop',
  connection: 'wifi'
});
console.log(`Average load time (${result.runs} runs): ${result.loadTime}ms`);
console.log(`HAR file saved to: ${result.harFile}`);
```

## SPEC-019-page-performance:implementation-notes-001

- The implementation should use modern browser automation tools:
  - Puppeteer, Playwright, or similar for headless browser control
  - Chrome DevTools Protocol for performance metrics collection
  - WebPageTest API integration for additional insights
- For Core Web Vitals measurement:
  - Implement proper calculation of LCP, FID, and CLS
  - Follow Google's Web Vitals measurement methodology
  - Consider using the web-vitals JavaScript library
- For device simulation:
  - Use predefined device profiles (e.g., iPhone, Pixel)
  - Configure viewport, user agent, and device pixel ratio
  - Simulate touch events for mobile devices
- For network throttling:
  - Implement realistic network condition profiles
  - Consider both bandwidth and latency limitations
  - Ensure consistent application of throttling
- For multiple measurement runs:
  - Clear cache between runs for consistent results
  - Calculate median values for key metrics
  - Identify and handle outliers appropriately
- For HAR file generation:
  - Include all network requests and timings
  - Add page timing markers
  - Include browser and environment information
- For performance scoring:
  - Weight metrics based on user impact
  - Consider industry benchmarks
  - Align with Lighthouse or similar scoring methodologies
- Implement proper caching to improve tool performance
- Use appropriate logging for debugging measurement issues

## SPEC-019-page-performance:security-considerations-001

- Validate and sanitize all input parameters
- Implement proper error handling to avoid information leakage
- Be cautious about executing JavaScript from untrusted websites
- Implement rate limiting to prevent abuse
- Consider adding authentication requirements for performance measurement operations
- Be aware of potential legal implications of website scanning
- Respect robots.txt directives
- Implement appropriate user agent identification
- Be cautious about storing or logging performance data
- Consider the privacy implications of screenshots and HAR files

## SPEC-019-page-performance:core-web-vitals-001

The implementation should focus on measuring Core Web Vitals:

1. **Largest Contentful Paint (LCP)**:
   - Measures loading performance
   - Should occur within 2.5 seconds of page load
   - Identifies when the largest content element becomes visible

2. **First Input Delay (FID)**:
   - Measures interactivity
   - Should be less than 100 milliseconds
   - Measures time from first user interaction to response

3. **Cumulative Layout Shift (CLS)**:
   - Measures visual stability
   - Should be less than 0.1
   - Quantifies unexpected layout shifts during page loading

4. **Additional Metrics**:
   - First Contentful Paint (FCP)
   - Time to Interactive (TTI)
   - Total Blocking Time (TBT)
   - Speed Index (SI)

The tool should provide clear guidance on how these metrics impact user experience and how to improve them.

## SPEC-019-page-performance:performance-recommendations-001

The tool should provide actionable recommendations in these categories:

1. **Resource Optimization**:
   - Image compression and proper sizing
   - Minification of CSS and JavaScript
   - Text compression (Gzip, Brotli)
   - Resource prioritization

2. **Rendering Optimization**:
   - Critical rendering path optimization
   - Render-blocking resource management
   - Lazy loading of off-screen content
   - Font loading optimization

3. **JavaScript Optimization**:
   - Code splitting and bundling
   - Unused code elimination
   - Efficient event handling
   - Web worker usage

4. **Caching Strategies**:
   - Browser caching configuration
   - Service worker implementation
   - Cache-Control header optimization
   - Content versioning

5. **Server Optimization**:
   - TTFB (Time to First Byte) improvement
   - HTTP/2 or HTTP/3 implementation
   - CDN usage
   - Server response time optimization

## SPEC-019-page-performance:future-enhancements-001

- Real user monitoring (RUM) integration
- Performance budget creation and monitoring
- Competitive performance benchmarking
- Progressive Web App (PWA) performance assessment
- Server-side rendering (SSR) analysis
- Advanced JavaScript performance profiling
- Memory usage analysis
- CPU utilization measurement
- Battery impact assessment for mobile devices
- Custom metric definition and tracking