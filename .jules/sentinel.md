## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.
## 2025-03-06 - [Account Enumeration via Error Messages]
**Vulnerability:** Found an account enumeration vulnerability in the client-side `login` function (`src/contexts/AuthContext.tsx`). The system returned different error messages for non-existent users ("Bunday foydalanuvchi topilmadi.") versus incorrect passwords ("Parol xato.").
**Learning:** Returning distinct errors for non-existent users allows attackers to easily test email addresses and discover which users are registered on the platform, leading to targeted attacks or privacy leakage.
**Prevention:** Always use generic error messages for authentication failures, such as "Email or password incorrect" ("Email yoki parol xato"), to prevent revealing whether an account exists.
