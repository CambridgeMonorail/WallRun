# Workflow: Authentication and session issues

## Goal

Diagnose login failures, session expiry, and auth-gated content that does not load correctly.

## Steps

1. Navigate to the login or protected page.
2. If login is needed, use `chr_fill_form` with test credentials.
3. Capture console messages and network requests during the auth flow.
4. For login failures:
   - Check the login API response (status, body, headers)
   - Verify credentials are sent correctly (Content-Type, payload format)
   - Check for CORS or CSP blocking the auth endpoint
5. For session expiry issues:
   - Check if a refresh token request was sent
   - Look for 401 responses followed by a retry or redirect
   - Use `chr_evaluate_script` to inspect cookies or localStorage:
     ```js
     document.cookie
     localStorage.getItem('token')
     ```
6. For protected content that won't load:
   - Verify the auth token is attached to API requests (Authorization header)
   - Check if redirects strip the token
   - Confirm the token hasn't expired (decode JWT timestamps if applicable)
7. Propose a fix:
   - Missing auth header in fetch config
   - Token refresh not triggered
   - CORS preventing cookie or header passthrough
   - Redirect loop between login and protected route

## Verification plan

- Log in successfully with test account
- Navigate to protected content
- Confirm content loads without errors
- Wait for token expiry and confirm refresh works (or redirect to login is clean)
