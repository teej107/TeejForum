/**
 * Created by tanner on 3/27/17.
 */
app.controller('sectionController', function ($scope, $stateParams, apiService, authService)
{
    apiService.getThreadsBySectionId($stateParams.id).then(function (success)
    {
        $scope.threads = success;
    });
    $scope.section = $stateParams.id;
    $scope.canCreate = function ()
    {
        return authService.getUser() !== null;
    }
});