var app = angular.module("app",["ngRoute","leave","uploadForm",'sidebar','task','profile']);


app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            template: '<leave></leave>'
        })
        .when("/profile", {
            template: '<profile></profile>'
        })
        .when("/task", {
            template: '<task></task>'
        })
    })