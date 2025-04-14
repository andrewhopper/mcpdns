import { DnsProviderResult, DnsRecord } from '../types';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export class ProviderManager {
  private providers: { [key: string]: string };

  constructor() {
    this.providers = {
      google: '8.8.8.8',
      cloudflare: '1.1.1.1',
      opendns: '208.67.222.222'
    };
  }

  /**
   * Look up NS records for a domain across all or specific providers
   * @param domain The domain to look up
   * @param provider The provider to use (or 'all' for all providers)
   * @returns DNS provider results
   */
  async lookupNs(domain: string, provider: string = 'all'): Promise<DnsProviderResult[]> {
    if (provider === 'all') {
      // Look up with all providers
      const promises = Object.keys(this.providers).map(providerName => 
        this.lookupNsWithProvider(domain, providerName)
      );
      
      return Promise.all(promises);
    } else {
      // Look up with specific provider
      const result = await this.lookupNsWithProvider(domain, provider);
      return [result];
    }
  }

  /**
   * Look up NS records for a domain with a specific provider
   * @param domain The domain to look up
   * @param providerName The name of the provider
   * @returns DNS provider result
   */
  private async lookupNsWithProvider(domain: string, providerName: string): Promise<DnsProviderResult> {
    const serverIp = this.providers[providerName];
    if (!serverIp) {
      throw new Error(`Unknown DNS provider: ${providerName}`);
    }

    try {
      const startTime = Date.now();
      
      // Use dig to perform the NS lookup
      const { stdout } = await execPromise(`dig @${serverIp} ${domain} NS +noall +answer +authority`);
      
      const responseTime = Date.now() - startTime;
      
      // Parse the dig output to extract NS records
      const records = this.parseDnsOutput(stdout);
      
      return {
        provider: providerName,
        responseTime,
        records
      };
    } catch (error) {
      console.error(`Error looking up NS records with ${providerName}:`, error);
      return {
        provider: providerName,
        responseTime: 0,
        records: []
      };
    }
  }

  /**
   * Parse dig output to extract DNS records
   * @param output The output from dig command
   * @returns Array of DNS records
   */
  private parseDnsOutput(output: string): DnsRecord[] {
    const lines = output.trim().split('\n');
    const records: DnsRecord[] = [];

    for (const line of lines) {
      // Skip empty lines and comments
      if (!line || line.startsWith(';')) {
        continue;
      }

      // Parse the DNS record line
      // Format: example.com.            86400   IN      NS      a.iana-servers.net.
      const parts = line.split(/\s+/);
      if (parts.length >= 5) {
        const name = parts[0];
        const ttl = parseInt(parts[1], 10);
        const value = parts[4];

        records.push({
          name,
          ttl,
          value
        });
      }
    }

    return records;
  }
}