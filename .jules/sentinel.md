## 2026-09-12 - [Remove Hardcoded Super Admin Credentials]
**Vulnerability:** Hardcoded super admin credentials (username and password) were found in `src/contexts/AdminContext.tsx`.
**Learning:** Storing sensitive information like credentials in the client-side source code allows anyone with access to the client-side bundle to extract the credentials and gain unauthorized access to the super admin panel.
**Prevention:** Use environment variables (e.g., `import.meta.env.VITE_SUPER_ADMIN_USER`) to inject credentials during the build or runtime process, rather than hardcoding them in the source files.
