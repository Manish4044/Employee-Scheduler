import {uploadFiles} from '../core/service/firebase.js'
var profile = angular.module('profile',[])

profile.component('profile',{
    templateUrl:'app/profile/profile.comp.html',
    controller:function(){
        var $ctrl = this;
        $ctrl.file;
        $ctrl.isVisible = true;
        $ctrl.toggleVisible = function(){
            $ctrl.isVisible = !$ctrl.isVisible;
        }

        $ctrl.submit = function(e){
            $ctrl.file = e.target.file;
            console.log($ctrl.file);
            const url = uploadFiles($ctrl.file);
        }
    }
})