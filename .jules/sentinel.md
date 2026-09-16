## 2026-09-16 - [Plaintext Passwords in Local Storage]
**Vulnerability:** User passwords were stored in plaintext inside the mock local storage database (`taomuz_users`).
**Learning:** Even in mock client-side backends, storing plaintext credentials presents a security risk as it familiarizes developers with insecure practices, and leaks info.
**Prevention:** Always implement a secure password hashing mechanism (e.g., PBKDF2 with SHA-256 and a random salt) via the Web Crypto API, even for mock implementations.
