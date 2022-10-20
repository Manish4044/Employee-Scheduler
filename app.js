var app = angular.module("app",["ngAvatar","ngRoute"]);

app.run(function($rootScope){
    $rootScope.email = "manishyadav4350@gmail.com";
    $rootScope.name = "Manish Yadav";
    $rootScope.id = "A9ewWVKEigN8Tu8Oudu6";
    $rootScope.rootShowSpinner = false;
    $rootScope.route = {
        profile:true
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

app.component("loadSpinner",{
    templateUrl:'app/shared/loadSpinner/loadSpinner.comp.html',
    controller: function(){
        console.log("Spiiner");
        //Render button color based on status
    }
})
