var Twit = require('twit'); // this is how we import the twit package
var config = require('./config.js'); //this is we import the config 
//file which is a js file which contains the keys ans tokens
var T = new Twit(config); 

setInterval(tweetScheduler,1000*60*30);
tweetScheduler();

function tweetScheduler()
{
	var params = {
	q: 'blockchain , bitcoin',
	count: 1,
	result_type: 'recent',
	lang: 'en'
	}

	T.get('search/tweets', params,function (err, data) {
	console.log(data);
	});

}

