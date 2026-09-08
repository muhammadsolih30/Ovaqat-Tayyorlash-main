## 2025-03-09 - Hardcoded Admin Credentials
**Vulnerability:** Super admin credentials (username and password) were hardcoded in plain text directly in the `src/contexts/AdminContext.tsx` file.
**Learning:** Hardcoding credentials makes them visible to anyone with access to the source code (or the frontend bundle in a React app), which is a critical security vulnerability leading to authentication bypass.
**Prevention:** Never hardcode secrets. Always use environment variables for sensitive configuration, and preferably handle authentication and authorization purely on the backend securely, returning only temporary session tokens to the frontend.
