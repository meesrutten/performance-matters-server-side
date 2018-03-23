# Timeline of Artists
## Performance matters
### Serverside application

## Build
For this build I used:
- ES6 modules
- Express & Node.js
- Express request
- GSAP Libraries

## NPM scripts

### Run all
```javascript
"dev": "parallelshell \"npm run start\" \"npm run build-js\" \"npm run build-css\""
```

### Start server:
```javascript
"start": "nodemon server.js"
```

### Compile and bundle
```javascript
"build-js": "browserify src/scripts/bundle.js -o public/scripts/bundle.js -t [ babelify --presets [ env ] --plugins [ transform-object-rest-spread ] ]"
```

### Build CSS
```javascript
"build-css": "node-sass -w --output-style src/styles/*/*.scss public/styles/main.css"
```

### ESLint
```javascript
"lint": "eslint src/scripts/*.js"
```	

