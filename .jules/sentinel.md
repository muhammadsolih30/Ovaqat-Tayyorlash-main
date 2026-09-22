## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.

## 2026-09-22 - [High] Secure Password Hashing in Mock Frontend Auth
**Vulnerability:** User passwords were stored in plaintext within the local storage state used by the mock `AuthContext`.
**Learning:** Even in a purely frontend mocked environment, storing user credentials in plaintext in state or `localStorage` sets a poor architectural precedent and can expose user data to XSS or physical device access. The transition required awaiting asynchronous crypto functions in previously synchronous contexts.
**Prevention:** Always use a proper key derivation function such as PBKDF2 with a random salt (using the Web Crypto API on the frontend) to securely hash passwords before storing or comparing them. Never assume that mock code is exempt from fundamental secure design principles.
