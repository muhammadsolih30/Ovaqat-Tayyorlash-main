## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.

## 2025-03-09 - Client-side Plaintext Password Storage
**Vulnerability:** User passwords for the mocked authentication system were being stored in plaintext in the browser's `localStorage`.
**Learning:** Even in applications with fully mocked client-side authentication where there is no backend, storing plaintext passwords is a major security risk (e.g. if an attacker gains physical or XSS access, they can dump the passwords). We must use a strong hashing mechanism (like PBKDF2 with SHA-256 via the Web Crypto API) to secure stored credentials.
**Prevention:** Avoid saving user passwords in plaintext entirely. Use the Web Crypto API `crypto.subtle.deriveBits` with PBKDF2 to hash passwords, generate unique salts per user with `crypto.getRandomValues`, and store only the resulting `passwordHash` and `salt`. Ensure `register` and `login` logic handle the asynchronous nature of password hashing appropriately.
