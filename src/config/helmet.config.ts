import helmet from "helmet";

export const helmetConfig = helmet({
  // Disabled for pure JSON API - CSP is for HTML content only
  contentSecurityPolicy: false,

  // Enforce HTTPS for 1 year, include subdomains
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },

  // Prevent clickjacking - deny all framing
  frameguard: {
    action: "deny",
  },

  // Prevent MIME type sniffing
  noSniff: true,

  // Hide X-Powered-By header to avoid revealing tech stack
  hidePoweredBy: true,

  // Prevent IE from opening downloads in site context
  ieNoOpen: true,

  // Enable XSS filter in older browsers
  xssFilter: true,

  // Control referrer information
  referrerPolicy: {
    policy: "strict-origin-when-cross-origin",
  },

  // Disable cross-origin embedder policy for API use
  crossOriginEmbedderPolicy: false,
});