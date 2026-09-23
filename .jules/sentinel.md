## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.

## 2025-03-06 - [Plaintext User Passwords]
**Vulnerability:** Found that user passwords for site authentication in `src/contexts/AuthContext.tsx` were being stored and compared in plaintext.
**Learning:** Storing passwords in plaintext poses a severe risk in the event of an account data leak (e.g., from `localStorage` in this mock implementation, or a backend database). Cryptographic hashing ensures the original password cannot be recovered from the stored value.
**Prevention:** Always hash passwords before storing them. Utilize established algorithms (e.g., PBKDF2 with SHA-256) and a unique salt per user (as implemented via the Web Crypto API `crypto.subtle.deriveBits`) to protect against dictionary and rainbow table attacks. Never store or compare plaintext credentials.
