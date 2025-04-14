/**
 * TLD Database class for managing TLD information
 * @file src/models/tld-database.ts
 */
export class TldDatabase {
  private tlds: Record<string, any>; // Will store TLD information

  constructor() {
    // Initialize with some common TLDs
    this.tlds = {
      'com': { price: { registration: 10, renewal: 10, currency: 'USD' } },
      'net': { price: { registration: 10, renewal: 10, currency: 'USD' } },
      'org': { price: { registration: 10, renewal: 10, currency: 'USD' } },
      'io': { price: { registration: 50, renewal: 50, currency: 'USD' } },
      'ai': { price: { registration: 100, renewal: 100, currency: 'USD' } },
      'dev': { price: { registration: 15, renewal: 15, currency: 'USD' } },
      'app': { price: { registration: 15, renewal: 15, currency: 'USD' } },
      'is': { price: { registration: 30, renewal: 30, currency: 'USD' } },
      'le': { price: { registration: 50, renewal: 50, currency: 'USD' } },
      'me': { price: { registration: 12, renewal: 12, currency: 'USD' } }
    };
  }

  /**
   * Get all TLDs in the database
   * @returns Array of TLD strings
   */
  async getAllTlds(): Promise<string[]> {
    return Object.keys(this.tlds);
  }

  /**
   * Get information about a specific TLD
   * @param tld The TLD to get information for
   * @returns TLD information object or null if not found
   */
  async getTldInfo(tld: string): Promise<any | null> {
    return this.tlds[tld] || null;
  }

  /**
   * Check if a TLD exists in the database
   * @param tld The TLD to check
   * @returns Whether the TLD exists
   */
  async tldExists(tld: string): Promise<boolean> {
    return tld in this.tlds;
  }
}