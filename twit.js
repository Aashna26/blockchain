var Twit = require('twit'); 
var config = require('./config.js'); 
var T = new Twit(config); 
var MongoClient = require('mongodb').MongoClient;

//setInterval(tweetScheduler,1000*60*30);
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
	console.log(data.text);

	MongoClient.connect("mongodb://localhost:27017/MyDb", function (err, db) {
    
    db.collection('Tweets', function (err, collection) {
        
        collection.insert({ _id: data.id, created_at:data.created_at, text: data.text, 
        UserName: data.user.name, UserDescrip: data.user.description, RetweetCount: data.retweet_count});

        db.collection('Persons').count(function (err, count) {
            if (err) throw err;
            
            console.log('Total Rows: ' + count);
        });
    });
                
});
	});



}
