angular.module('TeachableMachine').factory('MainService',function($http,$q) {

    var baseUrl = 'http://localhost:5000';
    var MainService = {};
        MainService.mainPage = baseUrl + '/main';
        MainService.predictPage = baseUrl +'/predict';
        MainService.trainmodel = function (dataToSend) {
        var deferred = $q.defer();
        $http.post(MainService.mainPage, dataToSend).
        success(function (data) {
            deferred.resolve(data);
        }).error(deferred.reject);
        return deferred.promise;
    };
    MainService.predict = function (dataToSend) {
        var deferred = $q.defer();
        $http.post(MainService.predictPage, dataToSend).
        success(function (data) {
            deferred.resolve(data);
        }).error(deferred.reject);
        return deferred.promise;
    };


    return MainService;
});
