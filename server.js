var request = require('request');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var contextHistory = [];


// app.get('/', function (req, res) {
//    res.send('Hello World');
// })

app.use('/', express.static('public'));
app.use(bodyParser.json());

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
var doSomethingInit = function(question, sessionId){
	return new Promise((resolve, reject)=>{
		var options = {
		  uri: 'https://api.dialogflow.com/v1/query',
		  method: 'POST',
		  json: {"query": question, lang: 'en', sessionId: sessionId},
		  headers: {
		    'Authorization': 'Bearer ' + '0a7b0853f0b34731be525315f1befb6a',
		  }
		};

		request(options, function (error, response, body) {
		      if (!error && response.statusCode == 200) {
		        resolve(body)
		      } else {
		        reject({error: error, response: response})
		      }
		});   		
	})
}

app.post('/api/question', function (req, res) {
	console.log('req.body - /api/question', req.body);

	doSomethingInit(req.body.query, req.body.sessionId).then((response)=>{
		console.log('response', response);
		if(response.result.metadata.contexts.length > 0){
			contextHistory.push(response.result.metadata.contexts);
		}
		res.json(response.result.speech);
	})
})

app.get('/api/contextHistory', function (req, res) {
	console.log('/api/contextHistory')
	res.send(contextHistory);
})

// doSomethingInit("Slut for tonight?").then((response)=>{
// 	console.log('response', response);

// 	doSomethingInit("How much will it be?").then((response)=>{
// 		console.log('response', response);
// 	})
// })

// doSomethingInit("What you got?").then((response)=>{
//  console.log('response', response);
// })

// var whichContextAmI = function(sessionId){
//     return new Promise((resolve, reject)=>{
// 	   	var options = {uri: 'https://api.dialogflow.com/v1/contexts?v=20150910&sessionId=' + sessionId,
// 			  method: 'GET',
// 			  headers: {
// 			    'Authorization': 'Bearer ' + '58f887664c95429aa7aa528759622623',
// 			  }
// 		};

// 		request(options, function (error, response, body) {
// 		      if (!error && response.statusCode == 200) {
// 		        resolve(body)
// 		      } else {
// 		        reject({error: error, response: response})
// 		      }
// 		});   
	 	
//     })
// }

// whichContextAmI('12345').then((myContext)=>{
// 	console.log('myContext', myContext)
// });
