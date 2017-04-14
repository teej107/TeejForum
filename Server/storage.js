/**
 * Created by tanner on 3/21/17.
 */
var utilities = require('./utilities');
var massive = require('massive');
var db = massive.connectSync({
    connectionString: 'postgres://postgres:tanner@localhost/teejforum'
});

function sendThread(threadId)
{
    return (resolve, reject) =>
    {
        db.get_thread([threadId], (err, thread) =>
        {
            if (thread)
            {
                thread = thread[0];
                db.get_thread_conversation([threadId], (err, conversation) =>
                {
                    thread.posts = conversation;
                    resolve(thread);
                });
            }
            else
            {
                resolve(null);
            }
        })
    };
}

function getByTagName(name)
{
    return new Promise((resolve, reject) =>
        db.get_users_by_tagname(['%' + name + '%'], (err, users) => resolve(users)));
}

function getUserByAuthId(type, id)
{
    return new Promise((resolve, reject) =>
        db.get_user_by_auth_id([type, id], (err, record) => resolve(record)));
}

function addUserAuth(id, type, authId)
{
    return new Promise((resolve, reject) =>
        db.add_user_auth([id, type, authId], (err, result) => resolve(result)));
}

function createUser(firstName, lastName, tagname, avatar)
{
    return new Promise((resolve, reject) =>
        db.create_user([firstName, lastName, tagname, avatar], (err, records) =>
        {
            resolve(records[0]);
        }));
}

module.exports = {
    users: {
        initIfNull: function (type, authId)
        {
            return new Promise((resolve, reject) =>
                getUserByAuthId(type, authId).then((record) =>
                {
                    if (record.length === 1)
                    {
                        db.update_last_online([record[0].id], Function.prototype.empty);
                        resolve(record[0]);
                    }
                    else
                    {
                        createUser().then((record) =>
                        {
                            addUserAuth(record.id, type, authId).then((result) => resolve(record[0]));
                        });
                    }
                }));
        },
        getByTagName: getByTagName,

        getAuth: function (id, type)
        {
            return new Promise((resolve, reject) =>
                db.get_user_auth([id, type], (err, auth) => resolve(auth)));
        },
        addAuth: addUserAuth,
        getByAuthId: getUserByAuthId,
        getById: function (id)
        {
            return new Promise((resolve, reject) =>
            {
                db.get_user_by_id([id], function (err, record)
                {
                    resolve(record);
                });
            })
        },
        updateProfile: function (id, tagname, firstname, lastname, avatar)
        {
            return new Promise((resolve, reject) =>
            {
                db.update_profile([id, tagname, firstname, lastname, avatar], function (err, record)
                {
                    console.log('updated', record[0]);
                    resolve(record[0]);
                })
            });
        }
    },
    sections: {
        create: function (title, description)
        {
            return new Promise((resolve, reject) =>
                db.create_section([title, description], function (err)
                {
                    resolve();
                }));
        }
        ,
        get: function ()
        {
            return new Promise((resolve, reject) =>
                db.get_sections(function (err, sections)
                {
                    resolve(sections);
                }));
        }
        ,
        getById: function (sectionId)
        {
            return new Promise((resolve, reject) =>
            {
                db.get_section_by_id([sectionId], function (err, record)
                {
                    resolve(record);
                })
            })
        }
        ,
        getThreadsById: function (sectionId)
        {
            return new Promise((resolve, reject) =>
                db.get_threads_from_section([sectionId], function (err, threads)
                {
                    resolve(threads);
                }));
        }
    }
    ,
    threads: {
        post: function (user, threadId, content)
        {
            return new Promise((resolve, reject) =>
            {
                if (utilities.validate((err) => reject(err), {user: user, id: threadId, content: content}))
                    return;

                db.post_to_thread([user, threadId, content], function (err)
                {
                    sendThread(threadId)(resolve, reject);
                });
            });
        }
        ,

        getById: function (threadId)
        {
            return new Promise(sendThread(threadId));
        }
        ,

        create: function (sectionId, user, title, body)
        {
            return new Promise((resolve, reject) =>
            {
                db.create_thread([sectionId, user, title, body], function (err, id)
                {
                    if (err)
                    {
                        reject(err);
                    }
                    else
                    {
                        resolve(id);
                    }
                });
            });
        }
    }
}
;