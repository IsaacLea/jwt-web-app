# Session token app

This project is a simple application with a session implementation for web security

Initialized with Vite + Typescript + React


## Features

- Logon flow validates credentials, generates a new session, and sets the user to a cookie to track the session and for subsequent validation
- Session is implemented with express-session
- Server stores the sessions in memory (for production site consider storing in a database such as redis or SQL)
- Axios is configured to automatically add the Authentication creds in each api call
- Protected routes are setup so all pages except logon require valid creds

## Considerations

- express-session can be used to implement the server side session using a framework, supporting many differet session storage types.  Session data is stored server side and sessionId in a client side cookie.
- express-cookie can be used to store the session information on the client side, removing the need for stateful session storage.  It encodes all session data in the cookie, so it is only useful with a small session info size.

