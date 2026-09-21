## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.
## 2026-09-21 - [Plaintext Passwords in AuthContext]
**Vulnerability:** Found that user passwords were being stored and verified in plaintext within `src/contexts/AuthContext.tsx`.
**Learning:** Storing plaintext passwords, even in a mocked frontend application utilizing `localStorage`, poses a significant security risk if the storage is accessed.
**Prevention:** Implement cryptographic hashing (e.g., using the Web Crypto API with PBKDF2, SHA-256, and a random salt) to securely hash passwords before storage, ensuring plaintext passwords are not persisted.
