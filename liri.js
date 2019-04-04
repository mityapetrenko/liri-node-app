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
    if (i > 2 && i < nodeArgs.length) {
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
      var querryUrl="https://rest.bandsintown.com/artists/" + userQuerry + "/events?app_id=codingbootcamp";
        axios.get(querryUrl).then(function(response){
            console.log(response);
            var concerts = response.data[0];
                console.log("**********EVENT INFO*********");  
                //fs.appendFile("log.txt", "**********EVENT INFO*********\n");//Append in log.txt file
                console.log("Name of the Venue: " + concerts.venue.name);
                //fs.appendFile("log.txt", "Name of the Venue: " + concerts.venue.name+"\n");
                console.log("Venue Location: " +  concerts.venue.city);
                //fs.appendFile("log.txt", "Venue Location: " +  concerts.venue.city+"\n");
                console.log("Date of the Event: " +  moment(concerts.datetime).format("MM/DD/YYYY"));
                //fs.appendFile("log.txt", "Date of the Event: " +  moment(concerts.datetime).format("MM/DD/YYYY")+"\n");
                console.log("*****************************");
                //fs.appendFile("log.txt", "*****************************"+"\n");
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
    //fs.appendFile("log.txt", "**********SONG INFO*********\n");
    console.log(i);
    //fs.appendFile("log.txt", i +"\n");
    console.log("Song name: " + songs.name);
    //fs.appendFile("log.txt", "song name: " + songs.name +"\n");
    console.log("Preview song: " + songs.preview_url);
    //fs.appendFile("log.txt", "preview song: " + songs.preview_url +"\n");
    console.log("Album: " + songs.album.name);
    //fs.appendFile("log.txt", "album: " + songs.album.name + "\n");
    console.log("Artist(s): " + songs.artists[0].name);
    //fs.appendFile("log.txt", "artist(s): " + songs.artists[0].name + "\n");
    console.log("*****************************");  
    //fs.appendFile("log.txt", "*****************************\n");
 }

//  .catch(function(err) {
//     console.log(err)})
            )};
function showMovieInfo(userQuerry){

if(userQuerry==undefined){
    userQuerry="Mr Nobody";
    console.log("If you haven't watched 'Mr.Nobody', then you should: http://www.imdb.com/title/tt0485947/");
    console.log("Its on Netflix");
}
axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=4cb4c457&t="+userQuerry+"&s").then(
  function(response, error) {
    var movies = response.data;
    console.log("**********MOVIE INFO*********");  
    //fs.appendFile("log.txt", "**********MOVIE INFO*********\n");
    console.log("Title: " + movies.Title);
    //fs.appendFile("log.txt", "Title: " + movies.Title + "\n");
    console.log("Release Year: " + movies.Year);
    //fs.appendFile("log.txt", "Release Year: " + movies.Year + "\n");
    console.log("IMDB Rating: " + movies.imdbRating);
    //fs.appendFile("log.txt", "IMDB Rating: " + movies.imdbRating + "\n");
    console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies));
    //fs.appendFile("log.txt", "Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies) + "\n");
    console.log("Country of Production: " + movies.Country);
    //fs.appendFile("log.txt", "Country of Production: " + movies.Country + "\n");
    console.log("Language: " + movies.Language);
    //fs.appendFile("log.txt", "Language: " + movies.Language + "\n");
    console.log("Plot: " + movies.Plot);
    //fs.appendFile("log.txt", "Plot: " + movies.Plot + "\n");
    console.log("Actors: " + movies.Actors);
    //fs.appendFile("log.txt", "Actors: " + movies.Actors + "\n");
    console.log("*****************************");  
    //fs.appendFile("log.txt", "*****************************\n");
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
