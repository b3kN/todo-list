#Todo List

###Introduction

This simple todo list application is a remake of the original TODO MVC using the Riggr application.

###Installation

Literally download the app and place it into the desired destination, start the node process, and it will start functioning and listening on port 3003 ([http://localhost:3003](http://localhost:3003)):

```
start index.js
```

I suggest using Forever to run the application:

```
npm install forever -g
forever start todo-list/index.js
```

###Usage

As of now, the main usage of the application is to create simple lists for actions to be completed.

The first step would be to create your list by adding items to be completed. Once items have been added sufficiently, you have a few different options which include to complete the item, or archive it out. 

Archiving the item will not complete it out, but will save it until restored or deleted permanently.

Completion and deletion options are pretty self explanatory; I suggest just playing around with it.

###Demo

Full demo available [here](http://todo.bekeris.info)
