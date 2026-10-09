## 2025-03-06 - Hash Passwords in Frontend Mock Auth Environments
**Vulnerability:** The application was storing user passwords in plaintext within the local storage (`taomuz_users`) and memory mock database via the `AuthContext` implementation.
**Learning:** Even in applications that are entirely frontend-driven or mock APIs locally, storing user credentials in plaintext in `localStorage` or memory poses a critical risk if a local environment is compromised. It represents bad security practices.
**Prevention:** In mock frontend authentication states, password data must be securely hashed. Use the Web Crypto API (`crypto.subtle`) with a robust algorithm like PBKDF2 with SHA-256 and salt to securely handle mock authentication, replicating real-world backend standards.
