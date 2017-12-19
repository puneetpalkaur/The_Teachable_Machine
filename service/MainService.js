angular.module('TeachableMachine').factory('MainService',function($http,$q) {

    var baseUrl = 'http://localhost:5000';
    var MainService = {};
        MainService.collectURL = baseUrl + '/collect';
        MainService.trainURL = baseUrl + '/train';
        MainService.predictURL = baseUrl +'/predict';

        MainService.collectImgs = function (dataToSend) {
        var deferred = $q.defer();
        $http.post(MainService.collectURL, dataToSend).
        success(function (data) {
            deferred.resolve(data);
        }).error(deferred.reject);
        return deferred.promise;
    };
    MainService.trainModel = function (dataToSend) {
        var deferred = $q.defer();
        $http.post(MainService.trainURL, dataToSend).
        success(function (data) {
            deferred.resolve(data);
        }).error(deferred.reject);
        return deferred.promise;
    };
    MainService.predict = function (dataToSend) {
        var deferred = $q.defer();
        $http.post(MainService.predictURL, dataToSend).
        success(function (data) {
            deferred.resolve(data);
        }).error(deferred.reject);
        return deferred.promise;
    };


    return MainService;
});
