/**
 * Created by tanner on 4/8/17.
 */
app.directive('profile', function ()
{
    return {
        templateUrl: getDirectiveDirectory() + "/profile/profile.html",
        restrict: 'E',
        scope: {},
        controller: function ($scope, authService)
        {
            authService.getUserNotNull().then(function (user)
            {
                $scope.user = user;
            }, function (failure)
            {
                console.log('not logged in')
            });
        }
    };
});