'use strict';


//Importing necessary dependancies

const
express =  require('express'),
bodyParser = require('body-parser'),
app = express().use(bodyParser.json());


//Setting app server port
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));


//Creating an endpoint for our webhook

app.post('webhook', (req, res) => {

    let body = req.body;

    if(body.object === 'page'){
        body.entry.forEach(
            function(entry){
                let webhook_event = entry.messaging[0];
                console.log(webhook_event);
            });
            res.status(200).send('EVENT_RECEIVED');

    }else{
        res.sendStatus(404);
    }

});


// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = "aswjghja124uhkbfui3iu5ro8qeau"
      
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
    
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {

        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
      }
    }
  });