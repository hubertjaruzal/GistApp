# Installation
```bash
npm i
```
1. Register a new OAuth application (https://github.com/settings/applications/new)
  * Homepage: http://localhost:8080/
  * Authorization callback URL: http://localhost:8080/auth
2. Configure Gatekeeper: https://github.com/prose/gatekeeper
3. Set client_id in webpack's externals (webpack.config.js)

# Run local server
```bash
node gatekeeper/server.js
npm start
```

#Design

Frameworks, Tools:

1. ReactJS - Frontend Framework
2. MobX - State Management
3. Webpack - Module bundler
4. Sass - CSS preprocessor
5. Gategeeper - (https://github.com/prose/gatekeeper) - Github OAuth helper for Client side
6. Jest - Library for JavaScript testing.
7. CodeMirror - Text editor

Labels, User's token are stored in LocalStorage.

#Note

Switching status between private and public gist isnt available in github api.
