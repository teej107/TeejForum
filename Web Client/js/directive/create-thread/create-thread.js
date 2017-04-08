/**
 * Created by tanner on 4/8/17.
 */
app.directive('createThread', function ()
{
    return {
        templateUrl: getDirectiveDirectory() + '/create-thread/create-thread.html',
        restrict: 'E',
        scope: {
            section: '='
        },
        controller: function ($scope, $state, apiService)
        {
            $scope.create = function ()
            {
                apiService.createThread($scope.section, $scope.title, $scope.body).then(function (success)
                {
                    $state.transitionTo('thread', {id: success.id});
                })
            };
        }
    }
});