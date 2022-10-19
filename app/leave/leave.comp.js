import {getUserWithEmail, submitLeaveData, userSnapshot} from '../core/service/firebase.js'

app.controller("leave",function($scope){
        $scope.showLeaveForm = false;
       
        $scope.user = {
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

        $scope.paid_leaves_allowed = 30;
        $scope.med_leaves_allowed = 30;
        $scope.paid_taken = 20;
        $scope.med_taken = 20;
        $scope.total_leaves_allowed = $scope.paid_leaves_allowed + $scope.med_leaves_allowed;

        //This will come from api and get stored in leave_history
        function init(){
            const email = 'manishyadav4350@gmail.com'
            getUserWithEmail(email).then((res => {
                $scope.user = res;
                console.log($scope.user);
            }));
        }
        // const unsubscribe = userSnapshot;
        // unsubscribe();
        // init();

        //Leave Form
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
            console.log("Form Upload")
            // await submitLeaveData($scope.form_data,id);
            // $scope.resetForm();
        }

    }
)

//Leave Form Application
app.controller('leaveForm',function($scope){
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
        console.log("Form Upload")
        // await submitLeaveData($scope.form_data,id);
        // $scope.resetForm();
    }
});

// Leave History Record Row
app.component("leaveRow",{
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