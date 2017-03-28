/**
 * Created by tanner on 3/25/17.
 */
app.service('apiService', function ($http, $q)
{
    this.getSections = function ()
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

    this.getThreadsFromSection = function (sectionId)
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