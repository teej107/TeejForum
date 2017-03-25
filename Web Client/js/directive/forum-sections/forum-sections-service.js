/**
 * Created by tanner on 3/25/17.
 */
app.service('forumSectionsService', function ($http, $q)
{
    this.getSections = function ()
    {
        return $q(function (resolve, reject)
        {
            $http({
                url: getServer() + '/api/sections',
                method: 'GET'
            }).then((success) =>
            {
                resolve(success.data);
            });
        });

    }
});