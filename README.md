# Timeline of Artists
## Performance matters
### Serverside application

## Concept
This is a progressive web app that displays a timeline of artists in Amsterdam during the Golden Age.

It portrays the name, birthyear and deathyear of the artists.

When navigating to an artist you can see his work in a chronological timeline.

This website can be installed as an application.

![Timeline of artists](./readme-images/timeline-artist-Mees-Rutten.gif "Timeline of artists")

## Build
For this build I used:
- ES6 modules
- Express & Node.js
- Express request
- GSAP Libraries

## Progressive web app
This website contains:
- Service worker
- Webmanifest
- Install prompt

## npm scripts

### Run all
This will start a Node server with bundled and compiled JS and SCSS to compressed CSS.
```javascript
"dev": "parallelshell \"npm run start\" \"npm run build-js\" \"npm run build-css\""
```

## Audit

### Performance

#### Before
- Clientside rendering
- No Critical CSS
- Google Web Fonts
- Minimal paint/layout triggering
- Huge images

<img src="./readme-images/before.png" width="600" alt="Before, Performance audit" style="display: block;">

### After
To increase performance I've added:
- Critical CSS
- System fonts
- Gzip
- CSS compression
- Minimal paint/layout triggering
- [Failed] Image compression/resizing

<img src="./readme-images/performance.png" width="600" alt="Performance audit" style="display: block;">

- ~90/100
- Slow images are caused by API

#### To increase performance further
By using `fs.writeFile` I tried to download all the images, then compress and resize them with `sharp` and then write those to a folder for the client.
I tried to get the images and resize/compress them before sending them to the client but I failed.
To increase performance most I need to find a way to resize/compress the images.

### Progressive web app

<img src="./readme-images/pwa.png" width="600" alt="Progressive web app audit" style="display: block;">

- ~73/100
- App is installable
- Install prompt will fire on further navigating
- Has working Service Worker / manifest

### Accessibility and Best Practices

<img src="./readme-images/acc-bp.png" width="600" alt="Accessibility and best practice audit" style="display: block;">

- 100/100 on both
- Good color contrast
- Keyboard accessible
- Aria labeled when needed
- Works without JavaScript

## Future
In the future I want to: 
- Compress the images
- Add lazy loading