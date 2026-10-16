## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.
## $(date +%Y-%m-%d) - Secure Password Storage & Prevent Enumeration
**Vulnerability:** Plaintext password storage and account enumeration via verbose error messages during authentication.
**Learning:** Storing passwords in plaintext poses a severe risk in the event of a breach. Verbose error messages like "user not found" versus "incorrect password" leak valid account IDs.
**Prevention:** Always use a strong one-way hashing algorithm like PBKDF2 with SHA-256 and salt for password storage, even in mocked environments. Return generic error messages for authentication failures.
