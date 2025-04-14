#!/bin/bash
# Script to rename documentation files according to the new naming convention
# This is a template and should be reviewed and tested before execution

# Create a backup directory
BACKUP_DIR="docs/backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "Created backup directory: $BACKUP_DIR"

# Backup all existing files
cp docs/SPEC-*.md "$BACKUP_DIR/"
echo "Backed up all SPEC files to $BACKUP_DIR"

# Rename files according to the mapping
echo "Renaming files..."

# Index file
mv docs/SPEC-dns-mcp-index-000.md docs/SPEC-000-index.md
echo "Renamed to SPEC-000-index.md"

# Tool specification files
mv docs/SPEC-dns-mcp-nslookup-001.md docs/SPEC-001-nslookup.md
mv docs/SPEC-dns-mcp-dig-002.md docs/SPEC-002-dig.md
mv docs/SPEC-dns-mcp-ping-003.md docs/SPEC-003-ping.md
mv docs/SPEC-dns-mcp-traceroute-004.md docs/SPEC-004-traceroute.md
mv docs/SPEC-dns-mcp-telnet-005.md docs/SPEC-005-telnet.md
mv docs/SPEC-dns-mcp-http-request-006.md docs/SPEC-006-http-request.md
mv docs/SPEC-dns-mcp-websocket-007.md docs/SPEC-007-websocket.md
mv docs/SPEC-dns-mcp-whois-008.md docs/SPEC-008-whois.md
mv docs/SPEC-dns-mcp-ip-info-009.md docs/SPEC-009-ip-info.md
mv docs/SPEC-dns-mcp-ssl-certificate-001.md docs/SPEC-010-ssl-certificate.md
mv docs/SPEC-dns-mcp-mtr-001.md docs/SPEC-011-mtr.md
mv docs/SPEC-dns-mcp-dnssec-check-001.md docs/SPEC-012-dnssec-check.md
mv docs/SPEC-dns-mcp-dnssec-setup-001.md docs/SPEC-013-dnssec-setup.md
mv docs/SPEC-dns-mcp-domain-expiration-001.md docs/SPEC-014-domain-expiration.md
mv docs/SPEC-dns-mcp-domain-availability-001.md docs/SPEC-015-domain-availability.md
mv docs/SPEC-dns-mcp-domain-registration-001.md docs/SPEC-016-domain-registration.md
mv docs/SPEC-dns-mcp-technology-detection-001.md docs/SPEC-017-technology-detection.md
mv docs/SPEC-dns-mcp-page-analysis-001.md docs/SPEC-018-page-analysis.md
mv docs/SPEC-dns-mcp-page-performance-001.md docs/SPEC-019-page-performance.md
mv docs/SPEC-dns-mcp-page-size-001.md docs/SPEC-020-page-size.md

echo "All files renamed successfully"

# Update content of each file
echo "Updating file contents..."

# Update index file
sed -i '' 's/SPEC-dns-mcp-index-000/SPEC-000-index/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-nslookup-001/SPEC-001-nslookup/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-dig-002/SPEC-002-dig/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-ping-003/SPEC-003-ping/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-traceroute-004/SPEC-004-traceroute/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-telnet-005/SPEC-005-telnet/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-http-request-006/SPEC-006-http-request/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-websocket-007/SPEC-007-websocket/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-whois-008/SPEC-008-whois/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-ip-info-009/SPEC-009-ip-info/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-ssl-certificate-010/SPEC-010-ssl-certificate/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-mtr-011/SPEC-011-mtr/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-dnssec-check-012/SPEC-012-dnssec-check/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-dnssec-setup-013/SPEC-013-dnssec-setup/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-domain-expiration-014/SPEC-014-domain-expiration/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-domain-availability-015/SPEC-015-domain-availability/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-domain-registration-016/SPEC-016-domain-registration/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-technology-detection-017/SPEC-017-technology-detection/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-page-analysis-018/SPEC-018-page-analysis/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-page-performance-019/SPEC-019-page-performance/g' docs/SPEC-000-index.md
sed -i '' 's/SPEC-dns-mcp-page-size-020/SPEC-020-page-size/g' docs/SPEC-000-index.md

# Update individual specification files
for file in docs/SPEC-*-*.md; do
  if [[ "$file" != *template* && "$file" != *backup* ]]; then
    # Extract the base name without extension
    base=$(basename "$file" .md)
    
    # Skip if it's the index file
    if [[ "$base" == "SPEC-000-index" ]]; then
      continue
    fi
    
    # Extract the number and tool name
    number=$(echo "$base" | cut -d'-' -f2)
    tool=$(echo "$base" | cut -d'-' -f3-)
    
    # Find the old ID pattern
    if [[ "$number" == "001" ]]; then
      old_pattern="SPEC-dns-mcp-nslookup-001"
    elif [[ "$number" == "002" ]]; then
      old_pattern="SPEC-dns-mcp-dig-002"
    elif [[ "$number" == "003" ]]; then
      old_pattern="SPEC-dns-mcp-ping-003"
    elif [[ "$number" == "004" ]]; then
      old_pattern="SPEC-dns-mcp-traceroute-004"
    elif [[ "$number" == "005" ]]; then
      old_pattern="SPEC-dns-mcp-telnet-005"
    elif [[ "$number" == "006" ]]; then
      old_pattern="SPEC-dns-mcp-http-request-006"
    elif [[ "$number" == "007" ]]; then
      old_pattern="SPEC-dns-mcp-websocket-007"
    elif [[ "$number" == "008" ]]; then
      old_pattern="SPEC-dns-mcp-whois-008"
    elif [[ "$number" == "009" ]]; then
      old_pattern="SPEC-dns-mcp-ip-info-009"
    elif [[ "$number" == "010" ]]; then
      old_pattern="SPEC-dns-mcp-ssl-certificate-001"
    elif [[ "$number" == "011" ]]; then
      old_pattern="SPEC-dns-mcp-mtr-001"
    elif [[ "$number" == "012" ]]; then
      old_pattern="SPEC-dns-mcp-dnssec-check-001"
    elif [[ "$number" == "013" ]]; then
      old_pattern="SPEC-dns-mcp-dnssec-setup-001"
    elif [[ "$number" == "014" ]]; then
      old_pattern="SPEC-dns-mcp-domain-expiration-001"
    elif [[ "$number" == "015" ]]; then
      old_pattern="SPEC-dns-mcp-domain-availability-001"
    elif [[ "$number" == "016" ]]; then
      old_pattern="SPEC-dns-mcp-domain-registration-001"
    elif [[ "$number" == "017" ]]; then
      old_pattern="SPEC-dns-mcp-technology-detection-001"
    elif [[ "$number" == "018" ]]; then
      old_pattern="SPEC-dns-mcp-page-analysis-001"
    elif [[ "$number" == "019" ]]; then
      old_pattern="SPEC-dns-mcp-page-performance-001"
    elif [[ "$number" == "020" ]]; then
      old_pattern="SPEC-dns-mcp-page-size-001"
    fi
    
    # Replace the old ID with the new ID
    new_pattern="SPEC-$number-$tool"
    sed -i '' "s/$old_pattern/$new_pattern/g" "$file"
    echo "Updated content in $file"
  fi
done

# Update the PLAN file to reference the new file names
sed -i '' 's/SPEC-dns-mcp-overview-001.md/SPEC-000-index.md/g' docs/PLAN-dns-mcp-implementation-001.md
sed -i '' 's/SPEC-dns-mcp-fastmcp-integration-001.md/SPEC-001-nslookup.md/g' docs/PLAN-dns-mcp-implementation-001.md
sed -i '' 's/SPEC-dns-mcp-ns-lookup-001.md/SPEC-001-nslookup.md/g' docs/PLAN-dns-mcp-implementation-001.md
sed -i '' 's/SPEC-dns-mcp-whois-001.md/SPEC-008-whois.md/g' docs/PLAN-dns-mcp-implementation-001.md
sed -i '' 's/SPEC-dns-mcp-providers-001.md/SPEC-009-ip-info.md/g' docs/PLAN-dns-mcp-implementation-001.md
sed -i '' 's/SPEC-dns-mcp-domain-search-001.md/SPEC-015-domain-availability.md/g' docs/PLAN-dns-mcp-implementation-001.md
sed -i '' 's/SPEC-dns-mcp-caching-001.md/SPEC-000-index.md/g' docs/PLAN-dns-mcp-implementation-001.md
sed -i '' 's/SPEC-dns-mcp-future-001.md/SPEC-000-index.md/g' docs/PLAN-dns-mcp-implementation-001.md

echo "Content updates completed"

# Verify all files have been updated
echo "Verifying files..."
grep -r "SPEC-dns-mcp" docs/SPEC-*-*.md || echo "All files updated successfully!"

echo "Renaming process completed. The old files have been renamed to the new format."
echo "You can now use the new file names in your documentation."