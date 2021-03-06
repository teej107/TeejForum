/**
 * Created by tanner on 3/28/17.
 */
app.controller('threadController', function ($scope, $stateParams, $window, apiService)
{
    $scope.back = function ()
    {
        $window.history.back();
    };

    apiService.getThreadById($stateParams.id).then(function (success)
    {
        $scope.thread = success;
    });
});