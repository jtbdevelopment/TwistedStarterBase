'use strict';

/**
 * @ngdoc function
 * @name twsUI.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the twsUI
 */
angular.module('twsUI').controller('MenuCtrl',
    ['$scope', 'jtbGameCache', 'jtbGameClassifier',
        function ($scope, jtbGameCache, jtbGameClassifier) {
            var controller = this;

            controller.phases = [];
            controller.phaseStyles = {};
            controller.phaseLabels = {};
            controller.phaseDescriptions = {};
            controller.phaseCollapsed = {};
            controller.games = {};
            controller.descriptions = {};

            controller.phaseGlyphicons = jtbGameClassifier.getIcons();
            controller.phases = [];
            angular.forEach(jtbGameClassifier.getClassifications(), function (value) {
                controller.phases.push(value);
                controller.phaseLabels[value] = value;
                controller.phaseDescriptions[value] = value;
                controller.games[value] = [];
                controller.phaseCollapsed[value] = false;
                //  TODO - why multiple replace
                controller.phaseStyles[value] = value.toLowerCase().replace(' ', '-').replace(' ', '-').replace('.', '');
            });

            function updateGames() {
                angular.forEach(controller.phases, function (phase) {
                    controller.games[phase] = jtbGameCache.getGamesForPhase(phase);
                    angular.forEach(controller.games[phase], function (game) {
                        //  TODO
                        controller.descriptions[game.id] = 'TODO';
                    });
                });
            }

            $scope.$on('gameCachesLoaded', function () {
                updateGames();
            });

            $scope.$on('gameRemoved', function () {
                updateGames();
            });

            $scope.$on('gameAdded', function () {
                updateGames();
            });

            $scope.$on('gameUpdated', function () {
                updateGames();
            });
        }
    ]
);
