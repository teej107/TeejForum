/**
 * Created by tanner on 4/1/17.
 */
app.directive('composebox', function ()
{
    return {
        templateUrl: getDirectiveDirectory() + "/composebox/composebox.html",
        restrict: 'E',
        scope: {
            thread: '='
        },
        controller: function ($scope, apiService)
        {
            $scope.submit = function ()
            {
                apiService.postToThread($scope.thread.id, $scope.content).then(function (result)
                {
                    if(result.error)
                    {
                        alert('unable to post :(');
                        return;
                    }
                    var thread = $scope.thread;
                    for (var key in thread)
                    {
                        if (thread.hasOwnProperty(key))
                        {
                            delete thread[key];
                        }
                    }
                    for(var key in result)
                    {
                        if(result.hasOwnProperty(key))
                        {
                            thread[key] = result[key];
                        }
                    }
                    $scope.content = "";
                });
            };
        }
    }
});