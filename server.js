var express = require('express');
var bodyParser = require('body-parser');
var path    = require("path");
var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

//APP ID REQUIRED
const log4js = require('log4js');
const passport = require('passport');
const APIStrategy = require("ibmcloud-appid").APIStrategy;


// create express app
var app = express();
const logger = log4js.getLogger("TripPlanner");

//Adding node_modules files
//app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
//app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
//app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
//app.use('/css', express.static(__dirname + '/public/css')); // redirect CSS LOCAL
//app.use('/js', express.static(__dirname + '/public/js'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//Adding passport AUTH
app.use(passport.initialize());
// The oauthServerUrl value can be obtained from Service Credentials
// tab in the App ID Dashboard. You're not required to provide this argument if
// your node.js application runs on IBM Cloud and is bound to the
// App ID service instance. In this case App ID configuration will be obtained
// using VCAP_SERVICES environment variable.
passport.use(new APIStrategy({
	oauthServerUrl: "https://appid-oauth.ng.bluemix.net/oauth/v3/0fc2da3d-43d2-41ad-88ed-4d5948bd0d1e",
	tenantId: "0fc2da3d-43d2-41ad-88ed-4d5948bd0d1e",
	clientId: "03f3426b-5919-424b-b055-7f034c449ee4"
}));

// define a simple route
app.get('/', function(req, res){
    //res.json({"message": "Welcome to first nova reporter app"});
    res.sendFile('index.html', { root: __dirname + "/public/views/" } )
});

// Require routes
require('./src/routes/routes.js')(app, passport, APIStrategy);

// listen for requests
app.listen(port, function(){
    console.log('Server listening on port: %d', port);
});

