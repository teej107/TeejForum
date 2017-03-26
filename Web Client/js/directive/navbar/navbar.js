/**
 * Created by tanner on 3/25/17.
 */
app.directive('navbar', function ()
{
    return {
        templateUrl: getDirectiveDirectory() + "/navbar/navbar.html",
        restrict: 'E',
        scope: {}
    };
});