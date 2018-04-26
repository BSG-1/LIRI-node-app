require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");

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
     if(!value){
     	console.log("If you don't want to see me again, please enter a song.")
     	console.log("--------------------" + "\n");
     	console.log("Artist(s): Ace of Base");
		console.log("Song name: The Sign");
		console.log("Preview link from Spotify: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=dce815c76c1d41eb856264ae0435e0ad");
		console.log("Album: The Sign (US Album) [Remastered]");
		console.log("--------------------" + "\n");

     } else{
     	s1potify()
     }
     break;
 
   case "movie-this":
   	if (!value){
   		console.log("********************************" + "\n");
   		console.log("Title of the movie: Mr. Nobody");
   		console.log("Year the movie was released: 26 Sep 2013");
   		console.log("Rotten Tomatoes Rating: 66%");
   		console.log("Country where produced: Belgium, Germany, Canada, France, USA, UK");
   		console.log("Language of the movie: English, Mohawk");
   		console.log("Plot of the movie: \n" + "A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
   		console.log("Actors in the movie: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham" + "\n");
   		console.log("********************************");
   	} else{
   		movie();	
   	} 
     break;
 
   case "do-what-it-says":
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
	spotify.search({type: 'track', query: value, limit: 10}, function(err, data){
		if(err){
			return console.log('Error occurred: ' + err);
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

function movie(){
	request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy", function(error, response, body){
		//request successful with status 200
		if(!error && response.statusCode === 200){
			//parse body and grab imdbRating 
			console.log("********************************" + "\n");
			console.log("Title of the movie: " + JSON.parse(body).Title);
			console.log("Year the movie was released: " + JSON.parse(body).Released);

			if(JSON.parse(body).Ratings[1]){
				console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			} else {
				console.log("Rating: " + JSON.parse(body).Ratings[0].Value);
			};

			// console.log(JSON.parse(body));
			console.log("Country where produced: " + JSON.parse(body).Country);
			console.log("Language of the movie: " + JSON.parse(body).Language);
			console.log("Plot of the movie: \n" + JSON.parse(body).Plot);
			console.log("Actors in the movie: " + JSON.parse(body).Actors + "\n");
			console.log("********************************");
		}
	});
}

function doThis(){
	fs.readFile("random.txt", "utf8", function(error, data){
		//log error to console
		if (error){
			return console.log(error);
		}
		//print contents of random.txt
		console.log(data + "\n" + " Loading...");
		//split by commas for readability
		var dataArr = data.split(",");
		//re-display contents as array for later
		value = dataArr[1];
		s1potify()
	});
}


