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
    };

    this.getThreadById = function (threadId)
    {
        return $q(function (resolve, reject)
        {
            $http({
                url: '/api/thread/' + threadId,
                method: 'GET'
            }).then(function (success)
            {
                resolve(success.data);
            });
        });
    };

    this.postToThread = function (threadId, content)
    {
        return $q(function (resolve, reject)
        {
            $http({
                url: '/api/thread/' + threadId,
                method: 'POST',
                data: {
                    id: threadId,
                    content: content
                }
            }).then(function (success)
            {
                resolve(success.data);
            });
        });
    };
});