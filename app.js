var app = angular.module("app",["ngAvatar","ngRoute"]);

app.run(function($rootScope){
    $rootScope.email = "manishyadav4350@gmail.com";
    $rootScope.name = "Manish Yadav";
    $rootScope.id = "A9ewWVKEigN8Tu8Oudu6";

    $rootScope.route = {
        leave:true
    }
})

app.controller('navbar',function($scope,$rootScope){
    console.log("Navbar loaded")
    $scope.showPage = function(page){
        $rootScope.route = {
            [page]:true,
        }
    }
})