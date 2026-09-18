## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.
## 2025-03-07 - [Plaintext Passwords in Local Storage]
**Vulnerability:** User passwords were stored and checked in plaintext within `AuthContext.tsx` and saved directly to `localStorage`.
**Learning:** Storing passwords in plaintext, even in a mock frontend authentication, exposes them to client-side attacks or local user inspection.
**Prevention:** Passwords should always be hashed (e.g., using Web Crypto API and SHA-256) before storing or validating, even in local storage.
