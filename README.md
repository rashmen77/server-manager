# Description
Server manager to add/delete/update servers.
Three seprate severs must be started inorder for the system to be functional.
Client communicates to authServer and stores a JWT in localstorage. 
Using that JWT token, client sends a request to server-manager with the JWT in its header.
Server-manager authenticates the token and respondes with data.

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
