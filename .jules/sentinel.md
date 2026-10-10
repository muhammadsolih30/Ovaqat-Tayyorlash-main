## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.

## 2025-03-06 - [Plaintext Passwords Stored in LocalStorage]
**Vulnerability:** The application was storing user passwords in plaintext inside the browser's `localStorage` (via the `taomuz_users` and `taomuz_current_user` keys).
**Learning:** Any data stored in `localStorage` can be accessed by JavaScript. If an application is vulnerable to Cross-Site Scripting (XSS), attackers can easily read plaintext credentials, resulting in account takeover and exposure of user passwords which might be reused on other platforms.
**Prevention:** Passwords should never be stored in plain text anywhere (client or server). Use strong cryptographic hashing algorithms like PBKDF2, Argon2, or bcrypt with unique salts before persisting them. Since this is a frontend-only application, the Web Crypto API (`crypto.subtle`) was used to derive a PBKDF2 hash with SHA-256 and store `{ hash, salt }` instead of the original password.
