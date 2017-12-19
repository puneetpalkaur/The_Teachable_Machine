angular.module('TeachableMachine', ['ui.bootstrap','ngRoute','ngAnimate']);

angular.module('TeachableMachine').config(function($routeProvider) {
      $routeProvider
        .when("/main", {
            templateUrl : "partial/MainPage/MainPage.html"
        })
    /* Add New Routes Above */
    $routeProvider.otherwise({redirectTo:'/home'});

});

angular.module('TeachableMachine').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
