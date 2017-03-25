/**
 * Created by tanner on 3/25/17.
 */
app.directive('forumSections', function ()
{
    return {
        templateUrl: getDirectiveFile('forum-sections','forum-sections.html'),
        restrict: 'E',
        scope: {},
        controller: function ($scope, forumSectionsService)
        {
            forumSectionsService.getSections().then(function (success)
            {
                $scope.sections = success;
            })
        },
        link: function (scope, element, attr)
        {

        }
    }
});