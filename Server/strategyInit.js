/**
 * Created by tanner on 3/21/17.
 */
module.exports = {
    google: function (returnURL, realm)
    {
        return {
            object: {
                returnURL: returnURL,
                realm: realm
            },
            method: function (identifier, profile, done)
            {
                return done(null, profile);
            }
        }
    }
};