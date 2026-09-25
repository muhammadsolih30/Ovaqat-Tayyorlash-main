## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.
## 2025-03-06 - [Plaintext Passwords in AuthContext]
**Vulnerability:** Found plaintext password storage and comparison in `src/contexts/AuthContext.tsx`. The passwords were being stored directly in localStorage and compared without any hashing.
**Learning:** Even in mocked frontend-only applications, storing and comparing plaintext passwords trains bad practices and poses a risk if localStorage is accessed.
**Prevention:** Always hash passwords before storage or comparison, using Web Crypto API or other robust hashing mechanisms.
