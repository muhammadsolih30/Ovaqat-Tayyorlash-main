## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.
## 2025-03-06 - [Account Enumeration Vulnerability in Authentication]
**Vulnerability:** The authentication logic in `src/contexts/AuthContext.tsx` explicitly distinguished between "User not found" and "Incorrect password" error messages.
**Learning:** This distinction creates an account enumeration vulnerability. Attackers can use the distinct error messages to systematically determine which email addresses are registered within the system, potentially aiding in brute-force attacks, targeted phishing, or credential stuffing.
**Prevention:** Always use generic error messages (e.g., "Email yoki parol xato") for authentication failures to prevent information leakage about the existence of specific accounts.
