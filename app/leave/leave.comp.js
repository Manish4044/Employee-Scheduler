import {getUserWithEmail, submitLeaveData} from '../core/service/firebase.js'

var leave = angular.module("leave",['ngMaterial']);

leave.component("leave",{
    templateUrl:'app/leave/leave.comp.html',
    controller: function(){
        var $ctrl = this;

        $ctrl.showLeaveForm = false;
        $ctrl.user = {
            name:"Manish Yadav",
            id:"AjDiqZMuOXboRmVeWlFi",
            leaves:[
                {
                    from:"01/09/2022",
                    to:"10/09/2022",
                    purpose:"This leave is for personal reasons",
                    status:"Approved"
                },
                {
                    from:"05/08/2022",
                    to:"15/08/2022",
                    purpose:"Leave for going to Durga Puja holidays",
                    status:"Rejected"
                },
                {
                    from:"20/08/2022",
                    to:"25/08/2022",
                    purpose:"Leave for visiting the doctor",
                    status:"Pending"
                }
            ]
        };

        $ctrl.paid_leaves_allowed = 30;
        $ctrl.med_leaves_allowed = 30;
        $ctrl.paid_taken = 20;
        $ctrl.med_taken = 20;
        $ctrl.total_leaves_allowed = $ctrl.paid_leaves_allowed + $ctrl.med_leaves_allowed;

        //This will come from api and get stored in leave_history
        function init(){
            const email = 'manishyadav4350@gmail.com'
            getUserWithEmail(email).then((res => {
                $ctrl.user = res;
                console.log($ctrl.user);
            }));
        }
        init();
    }
})

//Leave Form Application
leave.controller('leaveForm',function($scope){
    $scope.originalFormData = {
        from:new Date(),
        to:new Date(),
        purpose:"",
        status:"pending",
        type:"paid"
    };

    $scope.form_data = angular.copy($scope.originalFormData);
    
    $scope.resetForm = function () {
        $scope.form_data = angular.copy($scope.originalFormData);
    };

    $scope.submit = async function(e){
        const id = 'AjDiqZMuOXboRmVeWlFi';
        await submitLeaveData($scope.form_data,id);
        $scope.resetForm();
    }
});

// Leave History Record Row
leave.component("leaveRow",{
    templateUrl:'app/leave/leaveRow/leaveRow.comp.html',
    bindings: {
        record: '=',
    },
    controller: function(){
        var $ctrl = this;

        //Render button color based on status
        $ctrl.renderButtonText = function(status){
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

leave.component("leaveForm",{
    templateUrl:'app/leave/leaveForm/leaveForm.comp.html',
    bindings:{  
        showLeaveForm:"="
    },
    controller: function(){
        var $ctrl = this;

        $ctrl.closeLeaveForm = function(){
            console.log("Close Leave Form");
        }

        $ctrl.submit = function(e){
            // e.preventDefault()
            console.log("Submitting data");
        }
    }
})