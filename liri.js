require("dotenv").config();
var keys = require("./keys.js");

var moment = require('moment');
moment().format();
var axios=require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var nodeArgs = process.argv;
var userQuerry = "";
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      userQuerry = userQuerry + "+" + nodeArgs[i];
    }
    else {
      userQuerry += nodeArgs[i];
    }
  }
var userCommand= process.argv[2];


    switch (userCommand) {
    case 'concert-this':
        showConcertInfo();
        break;
    case 'spotify-this-song':
        showSongInfo();
        break;
    case 'movie-this':
        showMovieInfo();
        break;
    case 'do-what-it-says':
        showSomeInfo();
        break;
    default: 
        console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }


function showConcertInfo(){
    bandsintownQuerry=userQuerry.replace("+", "%20");
      var querryUrl="https://rest.bandsintown.com/artists/" + bandsintownQuerry + "/events?app_id=codingbootcamp";
      console.log(querryUrl);
        axios.get(querryUrl).then(function(response, error){
            var concerts = response.data[0];
                console.log("**********EVENT INFO*********");  
                console.log("Name of the Venue: " + concerts.venue.name);
                console.log("Venue Location: " +  concerts.venue.city);
                console.log("Date of the Event: " +  moment(concerts.datetime).format("MM/DD/YYYY"));
                console.log("*****************************");
                if(error){
                    console.log("There is an error"+ error);
                }
      });}
function showSongInfo() {
    if (userQuerry === undefined) {
        userQuerry = "The Sign"; //default Song
    }
    spotify.search({ type: 'track', query: userQuerry}).then(function(response) {
    console.log(response);
    var songs = response.tracks.items[0];

    console.log("**********SONG INFO*********");
    console.log("Song name: " + songs.name);
    console.log("Preview song: " + songs.preview_url);
    console.log("Album: " + songs.album.name);
    console.log("Artist(s): " + songs.artists[0].name);
    console.log("*****************************");  
 }

            )};
function showMovieInfo(){
    console.log(userQuerry);
if(userQuerry=== undefined){
    userQuerry="Mr Nobody";
    console.log("If you haven't watched 'Mr.Nobody', then you should: http://www.imdb.com/title/tt0485947/");
    console.log("Its on Netflix");
}
axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=4cb4c457&t="+userQuerry+"&s").then(
  function(response, error) {
          var movies = response.data;
    console.log("**********MOVIE INFO*********"); 
    console.log("Title: " + movies.Title);
    console.log("Release Year: " + movies.Year);
    console.log("IMDB Rating: " + movies.imdbRating);
    console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies));
    console.log("Country of Production: " + movies.Country);
    console.log("Language: " + movies.Language);
    console.log("Plot: " + movies.Plot);
    console.log("Actors: " + movies.Actors);
    console.log("*****************************");  
if(error){
  console.log('Error occurred.');
}
});}
//function to get proper Rotten Tomatoes Rating
function getRottenTomatoesRatingObject (data) {
    return data.Ratings.find(function (item) {
       return item.Source === "Rotten Tomatoes";
    });
  }
  
  function getRottenTomatoesRatingValue (data) {
    return getRottenTomatoesRatingObject(data).Value;
  }
  function showSomeInfo(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
        }
        var dataArr=data.split(",");
        userCommand = dataArr[0];
        userQuerry = dataArr[1];
        console.log(dataArr);
        if(userCommand==="spotify-this-song"){
            showSongInfo();
        }else if(userCommand==="concert-this"){
            showConcertInfo();
        }else if(userCommand==="movie-this"){
            showMovieInfo();
        }
	});
}
