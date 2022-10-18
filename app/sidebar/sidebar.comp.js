var sidebar = angular.module('sidebar',['ngAvatar']);

sidebar.component('sidebar',{
    templateUrl:'app/sidebar/sidebar.comp.html',
    controller: function(){
        var $ctrl = this;
        $ctrl.showSidebar = false;
        
        $ctrl.toggleSidebar = function() {
            console.log("Toggle");
            $ctrl.showSidebar = !$ctrl.showSidebar;
        }
        
    }
})

sidebar.component('navbar',{
    templateUrl:"app/navbar/navbar.comp.html",
    controller:function(){
        var $ctrl = this;
        console.log("Navbar loaded")
    }
})