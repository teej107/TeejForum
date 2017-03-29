/**
 * Created by tanner on 3/28/17.
 */
app.controller('threadController', function ($scope, $stateParams, apiService)
{
    apiService.getThreadById($stateParams.id).then(function (success)
    {
        console.log(success);
    });
});