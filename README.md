# socket-pixels
> A simple pixel collaboration tool written using NodeJS, Socket.io and ReactJS.
---
<img src="https://cloud.githubusercontent.com/assets/2873924/23181892/fa95e820-f876-11e6-9652-d649f2988da8.gif" width+"400" height="300">

####Installation
```
npm install
```
This instructs NPM to fetch all dependencies. They'll be placed in the 'node_modules' folder.

#####Development
```
npm run frontend
```
This will start the Webpack development server (on port 3000).

```
npm run backend
```
This starts up the NodeJS backend (on port 8000) that manages the socket connections.
The bundle will be served from the virtual 'static' folder.


#####Production
```
npm run deploy
```
This instructs Webpack to build a new bundle.js in the 'dist' folder.

```
npm run backend-prod
```
This starts up the NodeJS backend (on port 8000) that manages the socket connections.
The bundle will be served from the 'dist' folder.

Licensed under the MIT License, see the [LICENSE file](https://github.com/Buffer-Overflow/socket-pixels/blob/master/LICENSE)
in the root of the project.
