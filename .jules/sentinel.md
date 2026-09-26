## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.
## 2025-03-06 - [Plaintext Passwords in Local Storage]
**Vulnerability:** Found user passwords stored in plaintext in localStorage within `src/contexts/AuthContext.tsx`.
**Learning:** In applications mocking a backend by storing data in local storage, storing plaintext passwords is a security risk. While client-side hashing is generally less effective against a compromised client, it adds a layer of defense by ensuring raw passwords are not easily extracted from the storage.
**Prevention:** Always hash passwords before storing them, even in mock or client-side storage scenarios. Use modern APIs like the Web Crypto API (`crypto.subtle.deriveBits` with PBKDF2 and SHA-256) along with a unique salt per user to securely hash passwords.
