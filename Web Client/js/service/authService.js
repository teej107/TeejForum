/**
 * Created by tanner on 4/4/17.
 */
app.service('authService', function ($http, $q)
{
    var user = null;
    var fetching = [];

    function httpFetchUser(resolve, reject)
    {
        fetching.push({resolve: resolve, reject: reject});
        if (fetching.length < 2)
        {
            //Threading problem here if threading problem occurs :P
            $http({
                url: '/user',
                method: 'GET'
            }).then(function (success)
            {
                user = success.data;
                fetching.forEach(function (e)
                {
                    e.resolve(user);
                });
                fetching.length = 0;
            }, function (failure)
            {
                fetching.forEach(function (e)
                {
                    e.reject(failure);
                });
                fetching.length = 0;
            })
            ////
        }
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
    };
});