(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('app')
        .component('navComponent', {
            templateUrl:'/app/nav/nav.html',
            //templateUrl: 'templateUrl',
            controller: function(){},
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

})();