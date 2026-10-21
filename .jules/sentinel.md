## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.

## 2024-05-18 - Account Enumeration in Auth Context
**Vulnerability:** The login function returned different error messages for "User not found" and "Incorrect password" (Account Enumeration) and allowed password-based authentication bypass for accounts initialized without passwords (e.g., via Google Auth) if an empty/undefined password was provided.
**Learning:** Returning distinct error messages based on failure conditions provides an oracle for attackers to discover valid usernames/emails. Secondly, mocked/client-side authentication systems often use `undefined` or empty fields for alternate login methods (like OAuth), making traditional password checks vulnerable if they don't explicitly require the stored password to exist.
**Prevention:** Always use generic error messages like "Email or password incorrect" for all login failures. When validating credentials, explicitly ensure the stored secret exists and is non-falsy before comparing it against user input.
