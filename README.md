# Timeline of Artists
## Performance matters
### Serverside application

## Build
For this build I used:
- ES6 modules
- Express & Node.js
- Express request
- GSAP Libraries

## Functionality
 Works without JavaScript
 Server: express
 Data from Adamnet

## NPM scripts

### Run all
This will start a Node server with bundled and compiled JS and SCSS to compressed CSS.
```javascript
"dev": "parallelshell \"npm run start\" \"npm run build-js\" \"npm run build-css\""
```

### Start server:
```javascript
"start": "nodemon server.js"
```

### Compile and bundle
Uses Browserify and takes `bundle.js`, adds all other JS files to `bundle.js` and compiles it.
```javascript
"build-js": "browserify src/scripts/bundle.js -o public/scripts/bundle.js -t [ babelify --presets [ env ] --plugins [ transform-object-rest-spread ] ]"
```

### Build CSS
Takes the SCSS and compiles it to CSS.
```javascript
"build-css": "node-sass -w --output-style src/styles/*/*.scss public/styles/main.css"
```

### ESLint
Config is included in the project.
```javascript
"lint": "eslint src/scripts/*.js"
```	

### Audit
![A Lighthouse audit](https://github.com/meesrutten/performance-matters-server-side/blob/master/readme-images/audit.png "Audit")
- Images are very slow because of the endpoint.
- 89/100 in Performance