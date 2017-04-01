/**
 * Created by tanner on 3/27/17.
 */
app.controller('sectionController', function ($scope, $stateParams, apiService)
{
    apiService.getThreadsBySectionId($stateParams.id).then(function (success)
    {
        $scope.threads = success;
    });
});