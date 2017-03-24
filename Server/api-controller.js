/**
 * Created by tanner on 3/23/17.
 */
var storage = require('./storage');
var utilities = require('./utilities');

module.exports = {
    getSections: function (req, res)
    {
        storage.sections.getSections().then(function (resolve, reject)
        {
            res.send(resolve);
        });
    },
    getThreads: function (argument)
    {
        argument = argument.substring(1);
        return (req, res) =>
        {
            storage.sections.getThreads(req.params[argument]).then(function (resolve, reject)
            {
                res.send(truthy(resolve, []));
            });
        }
    },

    postToThread: function (req, res)
    {
        var user = req.body.user;
        var threadId = req.body.id;
        var content = req.body.content;
        var err = utilities.validate(res, user, threadId, content);
        if (err)
            return;

        return storage.threads.post(user, threadId, content).then(function (resolve, reject)
        {
            res.send(resolve);
        });
    }
};