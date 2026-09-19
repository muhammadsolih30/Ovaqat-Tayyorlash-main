## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.

## 2025-03-07 - [Plaintext Passwords in LocalStorage]
**Vulnerability:** User passwords were stored in plaintext within the \`localStorage\` for the mock backend/frontend state. Anyone with local access or utilizing an XSS vulnerability could extract plain-text user passwords.
**Learning:** Storing passwords or sensitive auth tokens in plain text in client-side storage mechanisms (like \`localStorage\` or \`sessionStorage\`) directly compromises user accounts.
**Prevention:** Always hash passwords before storing them, even in a mock environment or local state representation. Use standard cryptographic techniques (like PBKDF2 with SHA-256 and a random salt via Web Crypto API) to secure stored credentials.
