import {getUserWithEmail, submitLeaveData,uploadFiles, submitDocData, getUserDocuments} from './app/core/service/firebase.js'

var app = angular.module("app",["ngAvatar"]);

app.run(function($rootScope){
    // User data
    $rootScope.email = "manishyadav4350@gmail.com";
    $rootScope.name = "Manish Yadav";
    $rootScope.id = "A9ewWVKEigN8Tu8Oudu6";

    // Spinner
    $rootScope.rootShowSpinner = false;
    $rootScope.showSpinner = function(){
        $rootScope.rootShowSpinner = true;
        console.log("SHOW Spinner");
    }
    $rootScope.hideSpinner = function(){
        console.log("HIDE Spinner");
        $rootScope.rootShowSpinner = false;
    }

    // Page Route
    $rootScope.route = {
        leave:true
    }
})

// Navbar page
app.controller('navbar',function($scope,$rootScope){
    console.log("Navbar loaded")
    $scope.showPage = function(page){
        $rootScope.route = {
            [page]:true,
        }
    }
})
// End Navbar page

app.component("loadSpinner",{
    templateUrl:'app/shared/loadSpinner/loadSpinner.comp.html',
    controller: function(){
        console.log("Spiiner");
    }
})

// Leave Page
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
// End Leave Page



// Profile Page
app.controller('profile',function($scope,$rootScope){
    $scope.documents = [
        {
            name:'aadhar_card',
            title:"Aadhar Card",
            file:null
        },
        {
            name:'pan_card',
            title:"Pan Card",
            file:null
        },
        {
            name:'passport',
            title:"Passport",
            file:null
        }
    ]
    $scope.temp = {}
    $scope.onChange = function(e){
        var name = e.target; 
        $scope.temp[e.target.id] = {
            name: name.files.item(0).name,
            size: name.files.item(0).size,
            type: name.files.item(0).type,
        };
    }

    // getUserDocuments($rootScope.id).then(res => console.log(res));

    $scope.upload = async function(doc){
        console.log("Uploading started")
        $rootScope.showSpinner();
        const downloadURL = await uploadFiles({id:$rootScope.id,doc:doc});
        await submitDocData(doc,$rootScope.id,downloadURL);
        $rootScope.hideSpinner();
        alert("Submission success");
    }

    $scope.formatBytes = function(bytes, decimals = 2) {
        if (!bytes) return '0 Bytes'
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }
})

app.directive('customOnChange', function() {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var onChangeHandler = scope.$eval(attrs.customOnChange);
        element.on('change', onChangeHandler);
        element.on('$destroy', function() {
          element.off();
        });
  
      }
    };
});

app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);

app.controller('profile-upload',function($scope){
    $scope.documents = [
        {
            name:'aadhar_card',
            title:"Aadhar Card",
            file:null
        },
        {
            name:'pan_card',
            title:"Pan Card",
            file:null
        },
        {
            name:'passport',
            title:"Passport",
            file:null
        }
    ]

    $scope.upload = async function(doc){
        const user_id = 'AjDiqZMuOXboRmVeWlFi'
        console.log(doc);
        uploadFiles({id:user_id,file:$scope.file});
    }
});
// End Profile Page


// Sidebar Page
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
// End Sidebar Page


// Task Page
app.controller('task',function($scope){
    console.log("Task");
}
);

app.component('taskRow',{
templateUrl:"app/task/taskRow/taskRow.comp.html",
controller:function(){
    this.isTaskDone = false;
    this.toggleTaskDone = function(){
        console.log("Toggle");
        this.isTaskDone = !this.isTaskDone;
    }
    console.log("Task");
}
})
// End Task Page

