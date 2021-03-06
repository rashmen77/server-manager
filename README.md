# Description
Server manager to add/delete/update servers.
Three separate servers must be started in order for the system to be functional.
Client communicates to authServer and stores a JWT in localstorage. 
Using that JWT token, the client sends a request to the server-manager with the JWT 
in its header. Server-manager authenticates the token and responds with data.


## Installation

```bash
#client
$ cd client/
$ npm install

#authServer
$ cd authServer/
$ npm install

#server-manager
$ cd server-manager/
$ npm install
```


## Running the app

```bash
#client
$ cd client/
$ npm start

#authServer
$ cd authServer/
$ nodemon start:auth

#server-manager
$ cd server-manager/
$ nodemon start:server
```
