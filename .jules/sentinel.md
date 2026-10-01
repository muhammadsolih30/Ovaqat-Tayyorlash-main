## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.
## 2025-03-06 - [CRITICAL] Fix plaintext password storage
**Vulnerability:** The application was storing users' passwords in plaintext in localStorage (as mocked user data) in `AuthContext.tsx`. During login, it compared plaintext passwords.
**Learning:** Mocked backends in frontend-only applications can inadvertently introduce bad security practices by storing credentials in plaintext format. It's crucial to always hash passwords, even in a mocked state, to maintain security hygiene and prevent credential exposure if local storage is compromised.
**Prevention:** Implement Web Crypto API (like `crypto.subtle.deriveBits` with PBKDF2) for password hashing and use a randomly generated salt for each user. Store only the hash and the salt, never the plaintext password.
