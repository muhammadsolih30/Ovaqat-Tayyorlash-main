## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.
## 2025-03-07 - [Plaintext Passwords Stored in LocalStorage]
**Vulnerability:** The client-side mocked authentication system stored user passwords in plaintext within the `users` array in `localStorage`. Anyone with access to the browser's storage could read these passwords.
**Learning:** Storing plaintext passwords on the client is a critical vulnerability that compromises user credentials.
**Prevention:** Implement secure password hashing, such as PBKDF2 with SHA-256 and a random salt, utilizing the Web Crypto API, to ensure passwords are not stored in plaintext even in mocked environments.
