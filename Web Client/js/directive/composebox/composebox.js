/**
 * Created by tanner on 4/1/17.
 */
app.directive('composebox', function ()
{
    return {
        templateUrl: getDirectiveDirectory() + "/composebox/composebox.html",
        restrict: 'E',
        scope: {
            submit: '&'
        },
        controller: function ($scope)
        {

        }
    }
});