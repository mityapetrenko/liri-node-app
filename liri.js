require("dotenv").config();
var keys = require("./keys.js");

var moment = require('moment');
moment().format();
var axios=require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var nodeArgs = process.argv;
var userQuerry = "";
for (var i = 2; i < nodeArgs.length; i++) {

    if (i > 2 && i < nodeArgs.length) {
      userQuerry = userQuerry + "+" + nodeArgs[i];
    }
    else {
      userQuerry += nodeArgs[i];
  
    }
  }

var userCommand= process.argv[2];

UserInputs(userCommand, userQuerry);

function UserInputs (userCommand, userQuerry){
    switch (userCommand) {
    case 'concert-this':
        showConcertInfo(userQuerry);
        break;
    case 'spotify-this-song':
        showSongInfo(userQuerry);
        break;
    case 'movie-this':
        showMovieInfo(userQuerry);
        break;
    case 'do-what-it-says':
        showSomeInfo();
        break;
    default: 
        console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}

function showConcertInfo(userQuerry){
        
        axios.get("https://rest.bandsintown.com/artists/" + userQuerry + "/events?app_id=codingbootcamp").then(
  function(response, error,body){
        // If the request is successful
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {  
                console.log("**********EVENT INFO*********");  
                fs.appendFileSync("log.txt", "**********EVENT INFO*********\n");//Append in log.txt file
                console.log(i);
                fs.appendFileSync("log.txt", i+"\n");
                console.log("Name of the Venue: " + concerts[i].venue.name);
                fs.appendFileSync("log.txt", "Name of the Venue: " + concerts[i].venue.name+"\n");
                console.log("Venue Location: " +  concerts[i].venue.city);
                fs.appendFileSync("log.txt", "Venue Location: " +  concerts[i].venue.city+"\n");
                console.log("Date of the Event: " +  concerts[i].datetime);
                fs.appendFileSync("log.txt", "Date of the Event: " +  concerts[i].datetime+"\n");
                console.log("*****************************");
                fs.appendFileSync("log.txt", "*****************************"+"\n");
            }
        } else{
          console.log('Error occurred.');
        }
        var date = data[i].datetime;
        date = moment(date).format("MM/DD/YYYY");
        console.log("Date: " + date)
    });}
    

function showSongInfo(userQuerry) {
    if (userQuerry === undefined) {
        userQuerry = "The Sign"; //default Song
    }
    spotify.search(
        {
            type: "track",
            query: userQuerry
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log("**********SONG INFO*********");
                fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
                console.log(i);
                fs.appendFileSync("log.txt", i +"\n");
                console.log("Song name: " + songs[i].name);
                fs.appendFileSync("log.txt", "song name: " + songs[i].name +"\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url +"\n");
                console.log("Album: " + songs[i].album.name);
                fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                console.log("Artist(s): " + songs[i].artists[0].name);
                fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                console.log("*****************************");  
                fs.appendFileSync("log.txt", "*****************************\n");
             }
        }
    );
};

function showMovieInfo(userQuerry){

if(userQuerry===undefined){
    userQuerry="Mr Nobody";
    console.log("If you haven't watched 'Mr.Nobody', then you should: http://www.imdb.com/title/tt0485947/");
    console.log("Its on Netflix");
}
axios.get("http://www.omdbapi.com/?t=" +userQuerry+"&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
)
}
