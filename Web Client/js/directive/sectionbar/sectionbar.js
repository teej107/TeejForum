/**
 * Created by tanner on 3/25/17.
 */
app.directive('sectionbar', function ()
{
    return {
        templateUrl: getDirectiveDirectory() + '/sectionbar/sectionbar.html',
        restrict: 'E',
        scope: {},
        controller: function ($scope, apiService)
        {
            apiService.getSections().then(function (success)
            {
                $scope.sections = success;
            });
        }
    };
});