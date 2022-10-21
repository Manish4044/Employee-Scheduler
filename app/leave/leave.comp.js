import {getUserWithEmail, submitLeaveData, userSnapshot} from '../core/service/firebase.js'

app.controller("leave",async function($scope, $rootScope, $timeout){
        $scope.showLeaveForm = false;
        
        $scope.toggleFormVisibility = function(){
            console.log("toggle");
            $scope.showLeaveForm = !$scope.showLeaveForm;
        }

        $scope.toggleSpinner = function(){
            console.log("toggle spinner");
            $rootScope.rootShowSpinner = true;
            console.log($rootScope.rootShowSpinner);
        }
        
        // Leave Status and History
        $scope.paid_leaves_allowed = 30;
        $scope.med_leaves_allowed = 30;
        $scope.paid_taken = 20;
        $scope.med_taken = 20;
        $scope.total_leaves_allowed = $scope.paid_leaves_allowed + $scope.med_leaves_allowed;
        
        $scope.init = async function(){
            const res = await getUserWithEmail($rootScope.email);
            console.log(res);
            $scope.user = res;
            $timeout(function(){
                $scope.$apply();
            })
            return res.leaves;
        }
        $scope.init();  
        // End Leave Status and History
        
        //Leave Form Operations Below
        $scope.originalFormData = {
            from:new Date(),
            to:new Date(),
            purpose:"This is the default reason",
            status:"pending",
            type:"med"
        };
    
        $scope.form_data = angular.copy($scope.originalFormData);
        
        $scope.resetForm = function () {
            $scope.form_data = angular.copy($scope.originalFormData);
        };
    
        $scope.submit = async function(data){
            $rootScope.showSpinner();
            await submitLeaveData($scope.form_data,$rootScope.id);
            $scope.resetForm();
            $rootScope.hideSpinner();
        }
    }
)

// Leave History Record Row
app.component("leaveRow",{
    templateUrl:'app/leave/leaveRow/leaveRow.comp.html',
    bindings: {
        record: '=',
    },
    controller: function(){
        //Render button color based on status
        var $ctrl = this;
        this.renderButtonText = function(status){
            switch(status.toLowerCase())
            {
                case "pending":
                    return "orange";
                case "approved":
                    return "green";
                case "rejected":
                    return "red";
                default:
                    return "orange";
            }
        }
    }
})