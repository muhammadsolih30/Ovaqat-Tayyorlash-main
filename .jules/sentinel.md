## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.
## 2025-03-06 - [Plaintext Password Storage]
**Vulnerability:** Found plaintext password storage for user accounts in `src/contexts/AuthContext.tsx`. The `password` field in the user object was stored directly in `localStorage` without any hashing.
**Learning:** Even in a purely frontend application using `localStorage` for state persistence, storing plaintext passwords is a high-severity vulnerability that could expose user credentials to anyone with physical access or via XSS.
**Prevention:** Always hash passwords before storing them. Utilize the native `crypto.subtle.digest` API with SHA-256 for basic client-side hashing when a backend is unavailable.
