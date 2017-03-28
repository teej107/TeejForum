/**
 * Created by tanner on 3/21/17.
 */
var port = 3000;

var utilities = require('./utilities');
var strategy = require('./strategyInit');
var storage = require('./storage');
var apiController = require('./apiController');
var htmlController = require('./htmlController');

var express = require('express');
var app = express();
app.use(express.static('../Web Client'));

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

app.get('/api/sections', apiController.getSections);

var arg = ':id';
app.get('/api/section/' + arg, apiController.getThreadsFromSection(arg));
app.post('/api/thread/' + arg, apiController.postToThread(arg));

app.get('*', htmlController.redirect('/index.html'));
