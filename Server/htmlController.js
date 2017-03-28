/**
 * Created by tanner on 3/25/17.
 */
module.exports = {
    redirect: function (where)
    {
        return function (req, res)
        {
            res.redirect(where);
            res.send();
        }
    }
};