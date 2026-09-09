## 2024-05-24 - [Hardcoded Admin Credentials]
**Vulnerability:** Hardcoded admin credentials `SUPER_ADMIN_USER` and `SUPER_ADMIN_PASS` were present in the source code in `src/contexts/AdminContext.tsx`. Additionally, a hardcoded password was pre-filled in a login modal.
**Learning:** Hardcoded credentials expose super-admin access directly to anyone with source code access, making it trivial to compromise the application.
**Prevention:** Never hardcode secrets or credentials in source code. Use environment variables (like `import.meta.env`) for secrets, and enforce secure authentication processes without default credentials on the client side.
