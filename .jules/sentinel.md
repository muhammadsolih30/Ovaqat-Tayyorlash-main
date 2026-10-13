## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.

## 2025-03-06 - [Plaintext Credentials in LocalStorage and Account Enumeration]
**Vulnerability:** User passwords were saved directly to `localStorage` in plaintext during registration via `AuthContext.tsx`. In addition, authentication routines returned different error messages for non-existent users versus invalid passwords, enabling account enumeration attacks.
**Learning:** Any data saved in `localStorage` is accessible to malicious scripts (e.g. via XSS) or anyone inspecting the browser. Returning detailed error messages ("user not found" vs "invalid password") allows attackers to guess valid usernames/emails.
**Prevention:** Only save hashes or authentication tokens on the client-side. Hash passwords on the client before saving or checking (though ideally this happens server-side). Furthermore, always return generic login error messages such as "Invalid email or password" to prevent user enumeration.
