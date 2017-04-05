/**
 * Created by tanner on 3/25/17.
 */
app.directive('navbar', function ()
{
    return {
        templateUrl: getDirectiveDirectory() + "/navbar/navbar.html",
        restrict: 'E',
        scope: {},
        controller: function ($scope, $window)
        {
            $scope.loginTitle = "Login";
            $scope.login = function ()
            {
                $window.location.href = "/auth/google";
            };
        }
    };
});