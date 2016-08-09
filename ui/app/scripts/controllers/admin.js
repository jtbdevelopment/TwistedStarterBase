'use strict';

angular.module('twsUI').controller('AdminCtrl',
    ['$http', //'$location', 'jtbPlayerService',
        function ($http/*, $location, jtbPlayerService*/) {
            var controller = this;
            //$scope.searchText = '';
            //$scope.players = [];
            //$scope.selected = {};
            controller.playerCount = 0;
            controller.gameCount = 0;
            controller.playersCreated24hours = 0;
            controller.playersCreated7days = 0;
            controller.playersCreated30days = 0;
            controller.playersLastLogin24hours = 0;
            controller.playersLastLogin7days = 0;
            controller.playersLastLogin30days = 0;
            controller.gamesLast24hours = 0;
            controller.gamesLast7days = 0;
            controller.gamesLast30days = 0;

            var time = Math.floor((new Date()).getTime() / 1000);
            var dayInSeconds = 86400;
            var time24 = time - (dayInSeconds);
            var time7 = time - (dayInSeconds * 7);
            var time30 = time - (dayInSeconds * 30);

            $http.get('/api/player/admin/playerCount').success(function (data) {
                controller.playerCount = data;
            });

            $http.get('/api/player/admin/gameCount').success(function (data) {
                controller.gameCount = data;
            });

            $http.get('/api/player/admin/playersCreated/' + time24).success(function (data) {
                controller.playersCreated24hours = data;
            });
            $http.get('/api/player/admin/playersCreated/' + time7).success(function (data) {
                controller.playersCreated7days = data;
            });
            $http.get('/api/player/admin/playersCreated/' + time30).success(function (data) {
                controller.playersCreated30days = data;
            });

            $http.get('/api/player/admin/playersLoggedIn/' + time24).success(function (data) {
                controller.playersLastLogin24hours = data;
            });
            $http.get('/api/player/admin/playersLoggedIn/' + time7).success(function (data) {
                controller.playersLastLogin7days = data;
            });
            $http.get('/api/player/admin/playersLoggedIn/' + time30).success(function (data) {
                controller.playersLastLogin30days = data;
            });

            $http.get('/api/player/admin/gamesSince/' + time24).success(function (data) {
                controller.gamesLast24hours = data;
            });

            $http.get('/api/player/admin/gamesSince/' + time7).success(function (data) {
                controller.gamesLast7days = data;
            });

            $http.get('/api/player/admin/gamesSince/' + time30).success(function (data) {
                controller.gamesLast30days = data;
            });

            /*
             $http.get('/api/player/admin').success(function (data) {
             $scope.players = data;

             }).error(function (data, status, headers, config) {
             console.error(data + status + headers + config);
             $location.path('/error');
             });

             $scope.changeUser = function () {
             jtbPlayerService.overridePID($scope.selected.id);
             $location.path('/');
             };
             $scope.revertUser = function () {
             jtbPlayerService.overridePID(jtbPlayerService.realPID());
             $location.path('/');
             };
             */
        }]);
