## 2024-03-06 - Hash plaintext passwords in AuthContext
**Vulnerability:** User passwords were stored in plaintext in local storage.
**Learning:** Storing plaintext passwords on the frontend compromises user accounts if local storage is accessed. Even in a mocked environment, this pattern exposes credentials if local storage is read by malicious scripts or extensions.
**Prevention:** Always hash passwords before storing them using the Web Crypto API, such as PBKDF2 with SHA-256 and a random salt, to prevent exposing credentials in the client bundle and client-side storage.
