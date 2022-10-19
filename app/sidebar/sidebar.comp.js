// var sidebar = angular.module('sidebar',['ngAvatar']);

app.controller('sidebar',function($scope){
        $scope.showSidebar = false;
        
        $scope.toggleSidebar = function() {
            console.log("Toggle");
            $scope.showSidebar = !$scope.showSidebar;
        }
    }
)

app.controller('navbar',function($scope){
        console.log("Navbar loaded")
    }
)