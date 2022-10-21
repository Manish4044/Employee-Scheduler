import {uploadFiles, submitDocData, userSnapshot, getUserDocuments} from '../core/service/firebase.js'

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