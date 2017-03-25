/**
 * Created by tanner on 3/25/17.
 */
app.directive('currentView', function ()
{
    return {
        templateUrl: getDirectiveFile('current-view', 'current-view.html'),
        restrict: 'E',
        scope: {},
        controller: function ($scope, currentView)
        {
            
        }
    };
});