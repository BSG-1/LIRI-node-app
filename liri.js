require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var action = process.argv;
var value = "";

for (var i = 3; i < action.length; i++) {
	value = value + " " + action[i];
}
console.log(value);


switch (command) {
   case "my-tweets":
     tweets();
     break;
 
   case "spotify-this-song":
     s1potify();
     break;
 
   case "movie-this":
     movie();
     break;
 
   case "do-this":
     doThis();
     break;
}

//access and display tweets from api & env passwords
function tweets(){
	client.get('statuses/user_timeline', { count: '20'}, function(error, tweets, response) {
  		if(error) throw error;
  		console.log("Here are your most recent Tweets:" + "\n")
  		for (var i = 0; i < tweets.length; i++) { 			
  			console.log(JSON.stringify(tweets[i].text));
  			console.log(tweets[i].created_at);
  			console.log("--------------------" + "\n");	
  		}
	});
}

function s1potify(){
	spotify.search({type: 'track', query: value}, function(err, data){
		if(err){
			return console.log('Error occurred: ' + err);
			console.log(data.tracks.items[i].name = "The Sign")

		}

		for (var i = 0; i < data.tracks.items.length; i++) {
			//separating line
			console.log("---------------------------------" + "\n");
			//Artist(s)
			console.log("Artist(s): " + data.tracks.items[i].artists[0].name);
			//Song's name
			console.log("Song name: " + data.tracks.items[i].name);
			//A preview link of the song from Spotify
			console.log("Preview link from Spotify: " + data.tracks.items[i].preview_url);
			//The album that the song is from
			console.log("Album: " + data.tracks.items[i].album.name);
		}
	});
}
