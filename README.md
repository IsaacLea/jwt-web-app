# Session token app

This project is a simple application with a JWT implementation for web security

Initialized with Vite + Typescript + React


## Features

- Logon flow validates credentials, generates and signs a JWT, and returns the JWT to be used for subsequent authentication
- Axios is configured to automatically add the Authentication creds in each api call using an interceptor
- Protected routes are setup so all pages except logon require valid creds

## Considerations

- A secret key is used to both sign and validate the JWT.  On a distributed system it would be better to use public and private keys so that the public keys could be shared with other apps and the secret could be kept in one place only used to sign the JWT.
- The client passes the JWT in the authentication header of each request, which makes them vulnerable to CSRF attacks (user clicks on a malicious link and the browser will send this header to the bad site and thus they can get the JWT from the header).  Consider review of validating request origins (CORS)
- Refresh tokens can be used used to keep the user logged in while allowing for shorter life spans on the JWT
- The JWT is currently being stored in localStorage which makes it vulrnerable to XSS attacks (malicious code runs in the users browser that runs javascript to pull the token from localStorage).  This is hard to avoid and may be acceptable, see here:
https://pragmaticwebsecurity.com/articles/oauthoidc/localstorage-xss.html



