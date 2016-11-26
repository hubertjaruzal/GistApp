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
