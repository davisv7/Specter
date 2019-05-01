## Installation

install [node](https://nodejs.org/en/), [git](https://git-scm.com/) and [yarn](https://yarnpkg.com/en/)

open a terminal or gitbash in the directory of your choice

### `git clone https://github.com/davisv7/Specter.git`

### `cd specter`

### `yarn install`

grabs all dependecies

### `yarn run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


## Deployment

You need an SSL cert, I think.

### `yarn run build`

### `yarn add global serve`

### `serve -s build`

## How to use 

Go to the address Specter is being served at on Chrome:

![alt](images/connect.png?raw=true "Title")

Login using your preferred username and press enter or click the submit button.

![alt](images/preferredusername.png?raw=true "Title")

Connected peers will appear in your peer list at the top of the chat. Hovering over their names reveal their peer ids. 

![alt](images/connectpeer.png?raw=true "Title")

Type in the chat box at the bottom of the page and press enter to send.