/**
 * Created by tanner on 3/23/17.
 */
var storage = require('./storage');

module.exports = {
    getSections: function (req, res)
    {
        storage.sections.getSections().then(function (resolve, reject)
        {
           res.send(resolve);
        });
    }
};