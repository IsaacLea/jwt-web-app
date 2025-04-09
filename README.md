# Session token app

This project is a simple application with a JWT implementation for web security

Initialized with Vite + Typescript + React


## Features

- Logon flow validates credentials, generates and signs a JWT access and refresh token, and returns them to be used for subsequent authentication
- Axios is configured to automatically add the Authentication creds in each api call using an interceptor
- Protected routes are setup so all pages except logon require valid creds

## Considerations

- Since a JWT access token is sent in each request and are not encrypted they should not contain private information and they should be kept small for performance reasons.  HTTPS helps mitigate this but it is still best practice not to have PI in tokens.
- A secret key is used to both sign and validate the JWT on the server.  On a distributed system it would be better to use public and private keys so that the public keys could be shared with other apps and the secret could be kept in one place only used to sign the JWT.
- The client passes the JWT access token in the authentication header of each request.  Consider review of validating request origins (CORS)
- Refresh tokens can be used used to keep the user logged in while allowing for shorter life spans on the access token
- The JWT access token is currently being stored in localStorage which makes it vulrnerable to XSS attacks (malicious code runs in the users browser that runs javascript to pull the token from localStorage).  This is hard to avoid and may be acceptable, see here:
https://pragmaticwebsecurity.com/articles/oauthoidc/localstorage-xss.html

- The refresh token is currently also being stored in localstorage.  It may be more secure to use http-only cookies which would make it inaccessable to malicious javascript (XSS attack), but it would still be vulnerable to CRSF because it gets sent in every request as opposed to only on refresh requests like when we use localstorage.  This could perhaps be mitigated by CORS settings so if we can use same origin strictly then that would be a good option.  There really is no definitive best practice for where to store this client side.
- Refresh tokens are long lived and powerful since they can be used to get new access tokens until they expire.  There are some additional strategies to reduce risk in case they are stolen such as token rotation and reuse detection outlined here:
https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/
- A mechanism to prevent access token hijacking is to include a fingerprint within the token and also as a hardened http-only cookie.  Then on token validation it checks to see if they match.  See Token Sidejacking here:
https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html#token-sidejacking





