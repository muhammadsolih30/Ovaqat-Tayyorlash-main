## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.

## 2024-05-24 - Switch from plaintext user passwords to PBKDF2 hashing
**Vulnerability:** Client-side authentication stored plaintext passwords in the AuthContext user array, potentially leaking them via the bundle or client state to anyone looking at LocalStorage or state.
**Learning:** Pure frontend applications lacking a backend still need to prioritize secure credential storage patterns to build good habits and prevent exposure. Storing credentials as plaintext opens up a big security hole.
**Prevention:** Always salt and hash passwords using standard algorithms (like PBKDF2) before storing or transmitting them, even in mocked client-side applications.
