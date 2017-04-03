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
            //TODO: Use sessions here
            var user = /*req.body.user*/ 1;

            var id = req.params[threadId];
            var content = req.body.content;
            if (utilities.validate((err) => err.sendResponse(res), {user: user, [threadId]: id, content: content}))
                return;

            storage.threads.post(user, id, content).then((success) => res.send(success), (failure) => res.send(failure));
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