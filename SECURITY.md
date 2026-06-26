# Security Configuration

## Helmet.js Configuration

### Configuration Applied

```typescript
helmet({
  contentSecurityPolicy: false,
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  frameguard: { action: "deny" },
  noSniff: true,
  hidePoweredBy: true,
  ieNoOpen: true,
  xssFilter: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  crossOriginEmbedderPolicy: false,
})
```

### Justification

1. **contentSecurityPolicy: false** — Disabled because this API returns only JSON, never HTML. CSP is designed to prevent XSS in browsers rendering HTML content and is not relevant for a JSON REST API.

2. **hsts** — HTTP Strict Transport Security enforces HTTPS-only connections for 1 year. Prevents protocol downgrade attacks and cookie hijacking over HTTP.

3. **frameguard: deny** — Prevents the API responses from being embedded in iframes. Protects against clickjacking attacks.

4. **noSniff** — Sets X-Content-Type-Options: nosniff. Prevents browsers from MIME-sniffing responses away from the declared content-type.

5. **hidePoweredBy** — Removes the X-Powered-By: Express header to avoid exposing technology stack to attackers.

6. **referrerPolicy** — Controls how much referrer information is sent with requests, reducing information leakage.

7. **crossOriginEmbedderPolicy: false** — Disabled to allow API to be consumed by various client origins without COEP restrictions.

### External Sources

1. Helmet.js Official Documentation — https://helmetjs.github.io/
2. OWASP Secure Headers Project — https://owasp.org/www-project-secure-headers/
3. MDN Web Docs - HTTP Headers — https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
4. OWASP REST Security Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html

---

## CORS Configuration

### Configuration Applied

```typescript
cors({
  origin: (origin, callback) => { /* whitelist check */ },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["X-Total-Count"],
  credentials: false,
  maxAge: 86400,
})
```

### Justification

1. **origin whitelist** — Only explicitly allowed origins can access the API. Prevents unauthorized cross-origin requests from malicious websites.

2. **methods** — Only necessary HTTP methods are allowed. Restricting methods reduces attack surface.

3. **allowedHeaders** — Only Content-Type and Authorization are needed. Restricting headers prevents header injection attacks.

4. **credentials: false** — Not needed for this public API. Setting to true would require more restrictive origin handling and increases CSRF risk.

5. **maxAge: 86400** — Caches preflight response for 24 hours, reducing unnecessary OPTIONS requests and improving performance.

### External Sources

1. MDN Web Docs - CORS — https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
2. OWASP CORS Security Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/CORS_Security_Cheat_Sheet.html
3. W3C CORS Specification — https://www.w3.org/TR/cors/