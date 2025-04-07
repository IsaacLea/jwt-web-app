# Session token app

This project is a simple application with a session implementation for web security

Initialized with Vite + Typescript + React


## Features

- Logon flow validates credentials, generates a new session, and sets the user cookie for subsequent validation
- Session is implemented with express-session
- Server stores the sessions in memory (for production site consider storing in a database such as redis or SQL)
- Axios is configured with an interceptor to automatically add the Authentication creds in each api call
- Protected routes are setup so all pages except logon require valid creds

## Considerations

- express-session can be used to implement the server side session using a framework, supporting many differet session storage types.  Session data is stored server side and sessionId in a client side cookie.
- express-cookie can be used to store the session information on the client side, removing the need for stateful session storage.  It encodes all session data in the cookie, so it is only useful with a small session info size.

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
