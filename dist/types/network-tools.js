"use strict";
// Network Tools Types
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnologyCategory = exports.DnsSecAlgorithm = exports.HttpMethod = exports.DnsRecordType = void 0;
// DNS Record Types
var DnsRecordType;
(function (DnsRecordType) {
    DnsRecordType["A"] = "A";
    DnsRecordType["AAAA"] = "AAAA";
    DnsRecordType["CNAME"] = "CNAME";
    DnsRecordType["MX"] = "MX";
    DnsRecordType["NS"] = "NS";
    DnsRecordType["PTR"] = "PTR";
    DnsRecordType["SOA"] = "SOA";
    DnsRecordType["SRV"] = "SRV";
    DnsRecordType["TXT"] = "TXT";
    DnsRecordType["CAA"] = "CAA";
    DnsRecordType["DNSKEY"] = "DNSKEY";
    DnsRecordType["DS"] = "DS";
    DnsRecordType["NAPTR"] = "NAPTR";
    DnsRecordType["NSEC"] = "NSEC";
    DnsRecordType["RRSIG"] = "RRSIG";
    DnsRecordType["ANY"] = "ANY";
})(DnsRecordType || (exports.DnsRecordType = DnsRecordType = {}));
// HTTP Method Types
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
    HttpMethod["PATCH"] = "PATCH";
    HttpMethod["HEAD"] = "HEAD";
    HttpMethod["OPTIONS"] = "OPTIONS";
})(HttpMethod || (exports.HttpMethod = HttpMethod = {}));
// DNSSEC Algorithm Types
var DnsSecAlgorithm;
(function (DnsSecAlgorithm) {
    DnsSecAlgorithm["RSA_SHA1"] = "RSA/SHA-1";
    DnsSecAlgorithm["RSA_SHA256"] = "RSA/SHA-256";
    DnsSecAlgorithm["RSA_SHA512"] = "RSA/SHA-512";
    DnsSecAlgorithm["ECDSA_P256_SHA256"] = "ECDSA P-256/SHA-256";
    DnsSecAlgorithm["ECDSA_P384_SHA384"] = "ECDSA P-384/SHA-384";
    DnsSecAlgorithm["ED25519"] = "ED25519";
    DnsSecAlgorithm["ED448"] = "ED448";
})(DnsSecAlgorithm || (exports.DnsSecAlgorithm = DnsSecAlgorithm = {}));
// Website Technology Category Types
var TechnologyCategory;
(function (TechnologyCategory) {
    TechnologyCategory["CMS"] = "cms";
    TechnologyCategory["ANALYTICS"] = "analytics";
    TechnologyCategory["JAVASCRIPT_FRAMEWORK"] = "javascript_framework";
    TechnologyCategory["ADVERTISING"] = "advertising";
    TechnologyCategory["ECOMMERCE"] = "ecommerce";
    TechnologyCategory["PAYMENT"] = "payment";
    TechnologyCategory["MARKETING"] = "marketing";
    TechnologyCategory["HOSTING"] = "hosting";
    TechnologyCategory["TAG_MANAGER"] = "tag_manager";
    TechnologyCategory["CDN"] = "cdn";
    TechnologyCategory["SECURITY"] = "security";
    TechnologyCategory["FONT"] = "font";
    TechnologyCategory["OTHER"] = "other";
})(TechnologyCategory || (exports.TechnologyCategory = TechnologyCategory = {}));
