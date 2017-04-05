/**
 * Created by tanner on 3/21/17.
 */
var port = 3000;

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
app.use(function (req, res, next)
{
    console.log(req.session);
    next();
});

var GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.use(new GoogleStrategy(secret.strategy.google('http://localhost:3000/auth/google/return'),
    function (accessToken, refreshToken, profile, done)
    {
        return done(null, profile);
    }));
passport.serializeUser(function (user, done)
{
    done(null, user);
});
passport.deserializeUser(function (obj, done)
{
    done(null, obj);
});
app.listen(port, function ()
{
    console.log('listening on port', port);
    console.log(utilities.currentTime());
});

app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));
app.get('/auth/google/return', passport.authenticate('google', { failureRedirect: '/nope' }),
    function (req, res)
    {
        res.redirect('/');
    });

app.get('/user', htmlController.sessionUser);

app.get('/api/sections', apiController.getSections);

var arg = ':id';
app.get('/api/section/' + arg, apiController.getThreadsBySectionId(arg));
app.get('/api/thread/' + arg, apiController.getThread(arg));
app.post('/api/thread/' + arg, apiController.postToThread(arg));
/*app.get('*', htmlController.redirect('/index.html'));*/