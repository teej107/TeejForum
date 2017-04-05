/**
 * Created by tanner on 4/4/17.
 */
app.service('authService', function ($http, $q)
{
    var user = null;

    function httpFetchUser(resolve, reject)
    {
        $http({
            url: '/user',
            method: 'GET'
        }).then(function (success)
        {
            user = success.data;
            resolve(user);
        }, function (failure)
        {
            reject(failure);
        })
    }

    this.fetchUser = function ()
    {
        return $q(function (resolve, reject)
        {
            httpFetchUser(resolve, reject);
        });

    };
    this.getUser = function ()
    {
        return user;
    };
    this.getUserNotNull = function ()
    {
        return $q(function (resolve, reject)
        {
            if (user)
            {
                resolve(user);
            }
            else
            {
                httpFetchUser(resolve, reject);
            }
        });
    }.bind(this);
});