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

            storage.sections.get()
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

            storage.sections.getById(sectionId).then((success) =>
            {
                storage.threads.create(id, user, title, body).then(
                    (success) =>
                    {
                        res.send(success[0]);
                    },
                    (failure) =>
                    {
                        res.status(400).send(failure);
                    });
            });

        }
    },
    canCreateThread: function (sectionId)
    {
        sectionId = sectionId.substring(1);
        return (req, res) =>
        {
            var id = req.params[sectionId];
            var userId = userIdFromReq(req);
            var validation = utilities.validate((err) => err.sendResponse(res),
                {
                    id: id,
                    'user authentication id': userId
                });

            if (validation)
                return;

            console.log('getting user...');
            storage.sections.getById(id).then((success) =>
            {
                var level = success[0].create_thread_level;
                storage.users.getById(userId).then((user) =>
                {
                    var adminLevel = user[0].admin_level;
                    if(!adminLevel)
                    {
                        adminLevel = 0;
                    }
                    res.send(level ? user.admin_level >= level : true)
                });
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