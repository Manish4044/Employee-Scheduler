import {getUserWithEmail, submitLeaveData, userSnapshot} from '../core/service/firebase.js'

app.controller("leave",async function($scope, $rootScope){
        $scope.showLeaveForm = false;
        
        $scope.toggleFormVisibility = function(){
            console.log("toggle");
            $scope.showLeaveForm = !$scope.showLeaveForm;
        }
       
        $scope.user = {
            name:"Manish Yadav",
            id:"AjDiqZMuOXboRmVeWlFi",
            leaves:[
                {
                    from:"01/09/2022",
                    to:"10/09/2022",
                    purpose:"This leave is for personal reasons",
                    status:"Approved",
                    type:"paid"
                },
                {
                    from:"05/08/2022",
                    to:"15/08/2022",
                    purpose:"Leave for going to Durga Puja holidays",
                    status:"Rejected",
                    type:"paid"
                },
                {
                    from:"20/08/2022",
                    to:"25/08/2022",
                    purpose:"Leave for visiting the doctor",
                    status:"Pending",
                    type:"paid"
                }
            ]
        };


        $scope.paid_leaves_allowed = 30;
        $scope.med_leaves_allowed = 30;
        $scope.paid_taken = 20;
        $scope.med_taken = 20;
        $scope.total_leaves_allowed = $scope.paid_leaves_allowed + $scope.med_leaves_allowed;

        $scope.init = async function(){
            const email = 'manishyadav4350@gmail.com'
            await getUserWithEmail(email).then((res => {
                $scope.user = res;
                console.log($scope.user);
            }));
        }
        $scope.init();  

        //Leave Form Operation
        $scope.originalFormData = {
            from:new Date(),
            to:new Date(),
            purpose:"",
            status:"pending",
            type:"med"
        };
    
        $scope.form_data = angular.copy($scope.originalFormData);
        
        $scope.resetForm = function () {
            $scope.form_data = angular.copy($scope.originalFormData);
        };
    
        $scope.submit = async function(data){
            console.log(data)
            await submitLeaveData($scope.form_data,$rootScope.id);
            $scope.resetForm();
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