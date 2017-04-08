/**
 * Created by tanner on 3/23/17.
 */
var storage = require('./storage');
var utilities = require('./utilities');

function userIdFromReq(req)
{
    return utilities.getObject(req, 'session', 'passport', 'user', 'id');
}

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
            var user = userIdFromReq(req);
            var id = req.params[threadId];
            var content = req.body.content;

            var validation = utilities.validate((err) => err.sendResponse(res),
                {
                    'user authentication id': user,
                    [threadId]: id,
                    content: content
                });
            if (validation)
                return;

            storage.threads.post(user, id, content).then((success) => res.send(success));
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
    },
    createThread: function (sectionId)
    {
        sectionId = sectionId.substring(1);
        return (req, res) =>
        {
            var user = userIdFromReq(req);
            var title = req.body.title;
            var body = req.body.body;
            var id = req.params[sectionId];

            var validation = utilities.validate((err) => err.sendResponse(res),
                {
                    id: id,
                    'user authentication id': user,
                    title: title,
                    body: body
                });
            if (validation)
                return;

            storage.threads.create(id, user, title, body).then(
                (success) =>
                {
                    res.send(success[0]);
                },
                (failure) =>
                {
                    res.status(400).send(failure);
                });
        }
    },
    updateProfile: function ()
    {
        return (req, res) =>
        {

        }
    }
};