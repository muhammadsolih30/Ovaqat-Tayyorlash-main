## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.
## 2025-03-08 - Account Enumeration in AuthContext
**Vulnerability:** The application returned distinct error messages for incorrect email versus incorrect password in `AuthContext.tsx`, enabling account enumeration.
**Learning:** Returning specific error messages like "Bunday foydalanuvchi topilmadi." and "Parol xato." leaks information about whether an account exists, which an attacker can use to build a list of valid users.
**Prevention:** Always use generic error messages like "Email yoki parol xato" for authentication failures to prevent revealing whether the failure was due to an invalid username or invalid password.
