/**
 * Created by tanner on 3/25/17.
 */
var app = angular.module('teej-forum', ['ui.router']);

app.config(function ($stateProvider, $locationProvider)
{
    $stateProvider
        .state('section', new Route('/section/:id', 'template/section.html', 'sectionController'))

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