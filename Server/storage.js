/**
 * Created by tanner on 3/21/17.
 */
var massive = require('massive');
var db = massive.connectSync({
    connectionString: 'postgres://postgres:tanner@localhost/teejforum'
});

module.exports = {
    users: {
        createUser: function (firstName, lastName, tagname, avatar)
        {
            return new Promise((resolve, reject) =>
                db.create_user([firstName, lastName, tagname, avatar], function (err)
                {
                    promise.resolve();
                }));
        },
        getUsersByTagName: function (name)
        {
            return new Promise((resolve, reject) =>
                db.get_users_by_tagname(['%' + name + '%'], function (err, users)
                {
                    promise.resolve(users);
                }));
        }
    },
    sections: {
        createSection: function (title, description)
        {
            return new Promise((resolve, reject) =>
                db.create_section([title, description], function (err)
                {
                    resolve();
                }));
        },
        getSections: function ()
        {
            return new Promise((resolve, reject) =>
                db.get_sections(function (err, sections)
                {
                    resolve(sections);
                }));
        },
        getThreadsFromSection: function (sectionId)
        {
            return new Promise((resolve, reject) =>
                db.get_threads_from_section([sectionId], function (err, threads)
                {
                    resolve(threads);
                }));
        }
    },
    threads: {
        post: function (user, threadId, content)
        {
            return new Promise((resolve, reject) =>
            {
                db.post_to_thread([user, threadId, content], function (err)
                {
                    db.get_post([user, threadId, content], function (err, post)
                    {
                        resolve(post);
                    });
                });
            });
        }
    }
};