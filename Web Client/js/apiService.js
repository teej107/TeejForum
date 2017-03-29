/**
 * Created by tanner on 3/25/17.
 */
app.service('apiService', function ($http, $q)
{
    this.get = function ()
    {
        return $q(function (resolve, reject)
        {
            $http({
                url: '/api/sections',
                method: 'GET'
            }).then(function (success)
            {
                resolve(success.data);
            })
        });
    };

    this.getThreadsBySectionId = function (sectionId)
    {
        return $q(function (resolve, reject)
        {
           $http({
               url: '/api/section/' + sectionId,
               method: 'GET'
           }).then(function (success)
           {
               resolve(success.data);
           })
        });
    }
});