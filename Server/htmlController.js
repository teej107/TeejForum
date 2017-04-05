/**
 * Created by tanner on 3/25/17.
 */
var utilities = require('./utilities');

module.exports = {
    redirect: function (where)
    {
        return function (req, res)
        {
            res.redirect(where);
        }
    },
    sessionUser: function (req, res)
    {
        var passportSession = utilities.getObject(req, 'session', 'passport', 'user');
        if(passportSession)
        {
            res.send(passportSession);
        }
        else
        {
            res.status(401).send(new utilities.Error('not logged in'))
        }
    }
};