/**
 * Created by tanner on 3/21/17.
 */
var massive = require('massive');
var db = massive.connectSync({
    connectionString: 'postgres://postgres:tanner@localhost/teejforum'
});

module.exports = function ()
{
    return {
        users: {
            createUser: function (firstName, lastName, tagname)
            {
                var promise = new Promise();
                db.create_user([firstName, lastName, tagname], function (err)
                {
                    promise.resolve();
                });
                return promise;
            },
            getUsersByTagName: function (name)
            {
                var promise = new Promise();
                db.get_users_by_tagname(['%' + name + '%'], function (err, users)
                {
                    promise.resolve(users);
                });
                return promise;
            }
        },
        sections: {
            createSection: function (title, description)
            {
                var promise = new Promise();
                db.create_section([title, description], function (err)
                {
                    promise.resolve();
                });
                return promise;
            },
            getSections: function ()
            {
                var promise = new Promise();
                db.get_sections(function (err, sections)
                {
                   promise.resolve(sections);
                });
                return promise;
            }
        }
    }
};