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
    getThreadsFromSection: function (sectionId)
    {
        sectionId = sectionId.substring(1);
        return (req, res) =>
        {
            storage.sections.getThreadsFromSection(req.params[sectionId]).then(function (resolve, reject)
            {
                res.send(truthy(resolve, []));
            });
        }
    },

    postToThread: function (threadId)
    {
        return (req, res) =>
        {
            var user = req.body.user;
            var threadId = req.body[threadId];
            var content = req.body.content;
            var err = utilities.validate(res, user, threadId, content);
            if (err)
                return;

            return storage.threads.post(user, threadId, content).then(function (resolve, reject)
            {
                res.send(resolve);
            });
        }
    }
};