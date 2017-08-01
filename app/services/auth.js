(function () {
    'use strict';

    angular
        .module('app')
        .factory('auth', ['$http', function ($http) {
            return {
                login: function (username, password) {
                    //Place your auth service here
                    return $http.post('', {username : username, password : password});
                   

                 }
                 //, 
                // register: function (model) {
                //     return $http.post('/account/register', register);
                // },
                // forgotPassword: function (model) {
                //     return $http.post('/account/forgotPassword', model);


                // }
            }
        }]);




})();