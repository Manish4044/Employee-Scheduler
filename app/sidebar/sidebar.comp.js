// var sidebar = angular.module('sidebar',['ngAvatar']);

app.controller('sidebar',function($scope, $rootScope){
        $scope.showSidebar = false;
        
        $scope.toggleSidebar = function() {
            console.log("Toggle");
            $scope.showSidebar = !$scope.showSidebar;
        }

        $scope.showPage = function(page){
            $rootScope.route = {
                [page]:true,
            }
        }
    }
)