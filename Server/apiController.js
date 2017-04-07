/**
 * Created by tanner on 3/23/17.
 */
var storage = require('./storage');
var utilities = require('./utilities');

module.exports = {
    getSections: function (req, res)
    {
        storage.sections.get().then((success) =>
        {
            res.send(success);
        });
    },
    getThreadsBySectionId: function (sectionId)
    {
        sectionId = sectionId.substring(1);
        return (req, res) =>
        {
            storage.sections.getThreadsById(req.params[sectionId]).then((success) =>
            {
                res.send(success ? success : []);
            });
        }
    },

    postToThread: function (threadId)
    {
        threadId = threadId.substring(1);
        return (req, res) =>
        {
            var user = utilities.getObject(req, 'session', 'passport', 'user', 'id');
            var id = req.params[threadId];
            var content = req.body.content;
            if (utilities.validate((err) => err.sendResponse(res), {googleId: user, [threadId]: id, content: content}))
                return;

            storage.users.getByAuthId('google', user).then((success) =>
            {
                if (success.length === 1)
                {
                    user = success[0].id;
                    if (utilities.validate((err) => err.sendResponse(res), {user: user}))
                        return;

                    storage.threads.post(user, id, content).then((success) => res.send(success), (failure) => res.send(failure));
                }
                else
                {
                    res.status(404).send(new utilities.Error('googleId not found'));
                }
            });
        }
    },

    getThread: function (threadId)
    {
        threadId = threadId.substring(1);
        return (req, res) =>
        {
            var id = req.params[threadId];
            storage.threads.getById(id).then((success) =>
            {
                res.send(success);
            }, (failure) =>
            {
                res.send(failure);
            });
        }
    }
};