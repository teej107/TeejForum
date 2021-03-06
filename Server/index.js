/**
 * Created by tanner on 3/21/17.
 */
const port = 3000;

var utilities = require('./utilities');
var storage = require('./storage');
var apiController = require('./apiController');
var htmlController = require('./htmlController');
var secret = require('./secret');

var express = require('express');
var app = express();

app.use(express.static('../Web Client'));
app.use('/thread', express.static('../Web Client/index.html'));
app.use('/section', express.static('../Web Client/index.html'));

var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

app.use(session(secret.session));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

var GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.use(new GoogleStrategy(secret.strategy.google('http://localhost:3000/auth/google/return'),
    function (accessToken, refreshToken, profile, done)
    {
        if (!profile.id)
        {
            console.warn('missing "profile.id"', profile);
        }
        else
        {
            storage.users.initIfNull('google', profile.id).then((result) =>
            {
                utilities.addIfNotExists(result, 'firstname', profile.name.givenName);
                utilities.addIfNotExists(result, 'lastname', profile.name.familyName);
                utilities.addIfNotExists(result, 'tagname', profile._json.nickname);
                utilities.addIfNotExists(result, 'avatar', profile.photos[0].value);
                done(null, result);
            });
        }
    }));
passport.serializeUser(function (user, done)
{
    done(null, user);
});
passport.deserializeUser(function (obj, done)
{
    done(null, obj);
});
var passportAuth = passport.authenticate('google', {scope: ['profile'], failureRedirect: '/nope'});
app.listen(port, function ()
{
    console.log('listening on port', port);
    console.log(utilities.currentTime());
});

app.get('/auth/google', passportAuth);
app.get('/auth/google/return', passportAuth, htmlController.redirect('/'));

app.get('/user', htmlController.sessionUser);

app.get('/api/sections', apiController.getSections);

var arg = ':id';
app.get('/api/section/' + arg, apiController.getThreadsBySectionId(arg));
app.post('/api/section/' + arg, apiController.createThread(arg));
app.get('/api/thread/' + arg, apiController.getThread(arg));
app.post('/api/thread/' + arg, apiController.postToThread(arg));
app.get('/api/permissions/section/' + arg, apiController.canCreateThread(arg));

//For debugging
app.get('*', htmlController.redirect('/index.html?bad=endpoint'));