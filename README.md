# liri-node-app
# Video Guide to LIRI App
[Video Link](https://drive.google.com/open?id=1Ule8nWbVEXj5hD5a2r0I8iJLt1uVd3P_)
## Application Overview
* This application allows for 4 different user inputs as they are outlined in the switch statement. 
    * *Concert-this* . This command will allow user to send a querry to the BandsInTown API and axios NPM module and that   will return a JSON object. We selectively output the data that is need with console log. 
    * *Spotify-this-song*. This command will allow the user to input string after the command and will send a querry to Spotify API. This will return a JSON object that is selectively outputed with console log.
    * *movie-this* command. This command will allow user to send a querry to the OMDb API using the axios  NPM module and the returned JSON object will be output the data with console log. 
    * *do-what-it-says* This command will use FS NPM Module to read the random.txt file and parse out data and use it to construct a command and search querry which will be run accordingly. 
##Requirements
* Make a Node.js app that depends on user input from the command line
* Integrate BandsInTown, Spotify, and OMDb APIs via the appropriate NPM modules
* Use API calls and parse through returned JSON objects, outputting them in a specified format
* Read commands and queries from file
## Technologies Used
* Node.js
* JavaScript
* Spotify API (via spotify npm module)
* OMDb API (via axios npm module)
* BandsInTown API (via axios NPM module)
