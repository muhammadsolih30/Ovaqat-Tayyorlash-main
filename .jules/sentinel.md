## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.

## 2025-03-07 - Hashing Passwords Stored in LocalStorage
**Vulnerability:** Client-side authentication mock was storing passwords in plaintext directly in local storage, which could be exposed.
**Learning:** Even in mocked authentication logic used for demos or client-only side setups, passwords should be securely hashed (e.g., using Web Crypto API's `crypto.subtle.digest` with a salt) so plaintext credentials are not lying around in localStorage.
**Prevention:** Always implement a secure hashing mechanism along with salts for storing credentials, even if simulating backend endpoints locally.
