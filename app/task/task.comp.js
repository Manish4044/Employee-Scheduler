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