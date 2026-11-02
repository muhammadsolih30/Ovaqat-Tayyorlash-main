## 2025-03-06 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded super admin credentials in `src/contexts/AdminContext.tsx`. The credentials (`SUPER_ADMIN_USER = "muhammadsolih"` and `SUPER_ADMIN_PASS = "muhammadsolih2234"`) are explicitly stored in the client-side code.
**Learning:** In a pure frontend application, any hardcoded credentials can be easily read by anyone inspecting the code or the bundled JavaScript files. This grants unauthorized full admin access to the application, bypassing all intended security controls.
**Prevention:** Never hardcode credentials or secrets in the client-side code. Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) during the build process, or implement a proper backend service for authentication where secrets remain on the server.

## 2025-03-06 - [Account Enumeration Risk]
**Vulnerability:** Found an account enumeration vulnerability in the login function in `src/contexts/AuthContext.tsx`. The login function returned distinct error messages for a non-existent user versus an incorrect password, allowing attackers to check if specific email addresses are registered on the platform. It also lacked protection against bypassing authentication for OAuth accounts where the stored password could be undefined.
**Learning:** Returning specific error messages during authentication processes can expose user information. Always use generic error messages like "Email or password incorrect". Additionally, ensuring robust validation handles accounts without explicit passwords (like those from OAuth) is crucial.
**Prevention:** Implement unified error messaging for authentication failures. Ensure that authentication logic explicitly checks and rejects cases where an account might not have a password set to prevent bypasses.

## 2025-03-06 - Insecure Client-Side Password Storage Upgrade
**Vulnerability:** Client-side regular user mock authentication stored plaintext user passwords directly in `localStorage` in `src/contexts/AuthContext.tsx`. This exposed user credentials to anyone with access to the client machine or through XSS attacks.
**Learning:** Even in mock client-side setups, security best practices (like storing hashed credentials) should be followed, both to provide accurate representations of production logic and to prevent developers from accidentally retaining plaintext password handling when transitioning to a real backend.
**Prevention:** Always use secure hashing functions (e.g., PBKDF2, bcrypt, argon2) before storing credentials. When upgrading legacy mock auth code, ensure backward compatibility for old accounts that haven't been hashed yet by identifying hashed credentials with a clear delimiter (like a salt `:`) and safely falling back for old plaintext credentials.
