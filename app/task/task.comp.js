var task = angular.module('task',[]);

task.component('task',{
    templateUrl:"app/task/task.comp.html",
    controller:function(){
        var $ctrl = this;
        console.log("Task");
    }
})
task.component('taskRow',{
    templateUrl:"app/task/taskRow/taskRow.comp.html",
    controller:function(){
        var $ctrl = this;
        $ctrl.isTaskDone = false;
        $ctrl.toggleTaskDone = function(){
            console.log("Toggle");
            $ctrl.isTaskDone = !$ctrl.isTaskDone;
        }
        console.log("Task");
    }
})