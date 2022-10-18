import {uploadFiles} from '../core/service/firebase.js'

var uploadForm = angular.module('uploadForm',[]);

uploadForm.component('uploadForm',{
    templateUrl:'app/uploadForm/uploadForm.comp.html',
    controller:function(){
        var $ctrl = this;
        
        $ctrl.message = "WOW";
        $ctrl.submit = function(e){
            e.preventDefault()
            const file = e.target.files;
            console.log(file);
            // const url = uploadFiles(file);
        }
    }
})