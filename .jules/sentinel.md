## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.

## 2024-03-20 - [CRITICAL] Hashing mock credentials
**Vulnerability:** Client-side authentication mock logic was storing credentials in local storage using plain text passwords. Although this is a mocked frontend state without a real backend, exposing credentials unnecessarily represents a critical pattern to avoid and could be an anti-pattern.
**Learning:** Even without a true backend, mock layers, browser storage, and components simulating auth should mimic secure protocols.
**Prevention:** Implement client-side `crypto.subtle` hashing (e.g. PBKDF2) along with salts instead of plain text, and update relevant login/registration logics to become asynchronous.
