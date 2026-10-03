## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.

## 2025-03-06 - [Plaintext User Passwords]
**Vulnerability:** Found plaintext user passwords being stored in state/localStorage in `src/contexts/AuthContext.tsx`.
**Learning:** Even in a purely mocked client-side environment, storing plaintext passwords exposes user credentials. Using the Web Crypto API provides a native, zero-dependency way to hash passwords on the client before storing them.
**Prevention:** Always hash passwords before storing them. When dealing with legacy systems where plaintext was used, implement a "hash on login" mechanism to migrate users to hashed passwords during their next successful login.
