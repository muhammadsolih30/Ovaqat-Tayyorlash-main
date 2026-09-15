## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.
## 2025-03-06 - [Plaintext Password Storage]
**Vulnerability:** Found site user passwords stored in plaintext in the `taomuz_users` array within `localStorage`. This allows anyone with physical access to the device or with the ability to execute an XSS payload to extract the cleartext passwords.
**Learning:** In frontend applications with mocked authentication, user credentials shouldn't be stored in plaintext. While client-side hashing doesn't replace the security of a proper backend setup, it prevents credentials from being easily dumped.
**Prevention:** Always hash passwords before storing or comparing them using standard web APIs like `crypto.subtle.digest("SHA-256", ...)`.
