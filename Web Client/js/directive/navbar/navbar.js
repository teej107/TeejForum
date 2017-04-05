/**
 * Created by tanner on 3/25/17.
 */
app.directive('navbar', function ()
{
    return {
        templateUrl: getDirectiveDirectory() + "/navbar/navbar.html",
        restrict: 'E',
        scope: {},
        controller: function ($scope, $window, authService)
        {
            $scope.loginTitle = "Login";
            authService.getUserNotNull().then(function (success)
            {
               $scope.loginTitle = success.name.givenName;
            });
            $scope.login = function ()
            {
                $window.location.href = "/auth/google";
            };
        }
    };
});