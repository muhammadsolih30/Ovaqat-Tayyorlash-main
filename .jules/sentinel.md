## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.
## 2023-11-20 - [Mock Auth Plaintext Passwords]
**Vulnerability:** Passwords for mocked regular users were stored and validated in plaintext in local storage via the `AuthContext.tsx`.
**Learning:** Even in mocked frontend authentication logic, it's critical to simulate secure behavior. Any frontend storing plaintext passwords in local storage leaves them exposed to XSS attacks or device compromise.
**Prevention:** Implement secure password hashing, such as `PBKDF2` with `SHA-256` and a random salt, utilizing the native `crypto.subtle` API to hash passwords before storing or verifying them.
