## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.

## 2025-03-06 - [Account Enumeration Vulnerability in Login]
**Vulnerability:** The login function returned distinct error messages for "user not found" and "incorrect password" (e.g., "Bunday foydalanuvchi topilmadi" vs "Parol xato").
**Learning:** Returning distinct error messages for non-existent accounts versus incorrect passwords allows attackers to enumerate which email addresses are registered on the platform, aiding in targeted attacks.
**Prevention:** Use a generic error message (e.g., "Email yoki parol xato") for both scenarios to prevent account enumeration.
