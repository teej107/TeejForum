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
                res.send(truthy(success, []));
            });
        }
    },

    postToThread: function (threadId)
    {
        threadId = threadId.substring(1);
        return (req, res) =>
        {
            var user = req.body.user;
            var id = req.body[threadId];
            var content = req.body.content;
            var err = utilities.validate(res, user, threadId, content);
            if (err)
                return;

            storage.threads.post(user, threadId, content).then((success) =>
            {
                res.send(success);
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
            });
        }
    }
};