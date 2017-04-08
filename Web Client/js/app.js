/**
 * Created by tanner on 3/25/17.
 */
var app = angular.module('teej-forum', ['ui.router', 'ngCookies']);

app.config(function ($stateProvider, $locationProvider)
{
    $stateProvider
        .state('section',
            new Route('/section?id', getControllerDirectory() + "/section/section.html", 'sectionController'))
        .state('thread',
            new Route('/thread?id', getControllerDirectory() + "/thread/thread.html", 'threadController'))
        .state('newthread',
            new Route('/thread/new?section', getControllerDirectory() + "/newthread/newthread.html", 'newThreadController'));

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

function Route(url, templateUrl, controller)
{
    this.url = url;
    this.templateUrl = templateUrl;
    this.controller = controller;
}