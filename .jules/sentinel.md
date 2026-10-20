## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.

## 2025-03-07 - Plaintext Passwords and Account Enumeration
**Vulnerability:** The application stores regular user passwords in plaintext within `localStorage` (via React context state) and exposes detailed account existence errors during login (e.g., "Bunday foydalanuvchi topilmadi").
**Learning:** Storing passwords in plaintext allows any script or individual with access to `localStorage` to read credentials. Furthermore, differentiating error messages based on whether the user exists or the password is incorrect leads to account enumeration, allowing attackers to check which emails are registered on the platform.
**Prevention:** Always hash passwords before storing them. Even on the client side, hashing with a salt (e.g., PBKDF2 + SHA-256) is better than plaintext. Always use generic error messages like "Email yoki parol xato" during authentication to prevent account enumeration.
