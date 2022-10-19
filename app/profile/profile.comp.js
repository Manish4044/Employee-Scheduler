import {uploadFiles, submitDocData, userSnapshot} from '../core/service/firebase.js'
// var profile = angular.module('profile',[])

app.controller('profile',function($scope){
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
        console.log("DOcument")
        const user_id = 'AjDiqZMuOXboRmVeWlFi'
        console.log(doc);
        // uploadFiles({id:user_id,file:$scope.file});
    }
})

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