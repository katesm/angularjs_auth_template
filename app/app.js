(function () {
    var app = angular.module('app', ['ui.router']);
    var user = undefined;

    app.config(function ($stateProvider, $urlServiceProvider, $locationProvider) {
        //Can't find location send to home page
        $urlServiceProvider.rules.otherwise({
            state: 'home'
        });
        //Home
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/app/views/default.html',
            controller: function ($scope) {
                $scope.message = "This is the home page";
                $scope.heading = "Home";
            },
           

        });
        //Contact
        $stateProvider.state('contact', {
            url: '/contact',
            templateUrl: '/app/views/default.html',
            controller: function ($scope) {
                $scope.message = "This is the contact page";
                $scope.heading = "Contact";
            }
          

        });

        //About
        $stateProvider.state('about', {
            url: '/about',
            templateUrl: '/app/views/default.html',
            controller: function ($scope) {
                $scope.message = "This is the about page";
                $scope.heading = "About";
            }
            
        });

        //Users 
        $stateProvider.state('users', {
            url: '/users',
            templateUrl: '/app/views/users.html',
            controller: function ($scope) {
                $scope.currentUser = user;
                $scope.myUsers = [{
                        email: 'eric.poynter@eku.edu',
                        firstName: 'Eric',
                        lastName: 'Poynter',
                        middleName: 'R',
                        userId: 64
                    },
                    {
                        email: 'robert.wine@eku.edu',
                        firstName: 'Bob',
                        lastName: 'Wine',
                        middleName: "",
                        userId: 65
                    },
                    {
                        email: 'corrie.rice@eku.edu',
                        firstName: 'Corrie',
                        lastName: 'Rice',
                        middleName: "",
                        userId: 63
                    }
                ];
            }
   
        });

        //Login
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: '/app/views/login.html',
            controller: ['$scope', 'auth', '$state', function ($scope, auth, $state) {
                $scope.login = function () {
                    if ($scope.username && $scope.password) {
                        auth.login($scope.username, $scope.password)
                            .then(function (response) {
                                console.log(response);
                                if (response.data.success) {
                                    //User info to use in app
                                    user = response.data.user;
                                    //Send them on to users page
                                    $state.go('users');
                                } else {
                                    $scope.error = response.data.message;
                                }

                            })
                            .catch(function (err) {

                            })
                    }

                }

            }]
           

        });




        $locationProvider.html5Mode(true);
        //<base href="/">  You must add this to the head tag and have server return back index page

        /*
        Call $state.go(). High-level convenience method. Learn More
        Click a link containing the ui-sref directive. Learn More
        Navigate to the url associated with the state. Learn More.
        */

    });



    app.run(function ($rootScope, $state, auth, $trace, $transitions) {

        //https://ui-router.github.io/ng1/docs/latest/
        
        //Check to see if authenticated already
        $trace.enable('TRANSITION');
        $transitions.onStart({
            to: 'users'//going to users state its auth
        }, function (trans) {
            var $state = trans.router.stateService;
            

            // If the user is not authenticated
            if (user == null) {
                return $state.target("login");
           
            }
        });
    });
})();