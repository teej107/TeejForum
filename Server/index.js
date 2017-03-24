/**
 * Created by tanner on 3/21/17.
 */
var port = 3000;

var utilities = require('./utilities');
var strategy = require('./strategy-init');
var storage = require('./storage');
var apiController = require('./api-controller');
var express = require('express');

var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');

var GoogleStrategy = require('passport-google').Strategy;
app.use(cors());
app.use(bodyParser.json());

/*app.use(passport.initialize());
 var googleParams = strategy.google('/auth/google/callback', 'localhost:' + port);
 passport.use(new GoogleStrategy());
 passport.serializeUser(function (user, done)
 {
 done(null, user);
 });
 passport.deserializeUser(function (obj, done)
 {
 done(null, obj);
 });*/

app.listen(port, function ()
{
    console.log('listening on port', port);
    console.log(new Date().currentTime());
});

function toAPI(str)
{
    return '/api/' + str;
}

app.get(toAPI('sections'), apiController.getSections);