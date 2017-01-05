'use strict';

angular.module('tsbUI.services').factory('jtbGameClassifier',
    ['jtbPlayerService',
        function (jtbPlayerService) {
            var YOUR_TURN = 'Your move.';
            var THEIR_TURN = 'Their move.';
            var OLDER = 'Older games.';

            var icons = {};
            icons[YOUR_TURN] = 'play';
            icons[THEIR_TURN] = 'pause';
            icons[OLDER] = 'stop';

            return {
                getClassifications: function () {
                    return [YOUR_TURN, THEIR_TURN, OLDER];
                },

                getClassification: function (game) {

                    //  TODO - if this game has a setup phase
                    //  TODO - other nuances in phases
                    var action = game.gamePhase === 'Playing' || game.gamePhase === 'RoundOver';
                    if (game.gamePhase === 'Challenged') {
                        action = game.playerStates[jtbPlayerService.currentPlayer().md5] === 'Pending';
                    }
                    if (action) {
                        return YOUR_TURN;
                    }

                    if (game.gamePhase === 'Declined' || game.gamePhase === 'Quit' || game.gamePhase === 'NextRoundStarted') {
                        return OLDER;
                    }

                    return THEIR_TURN;
                },

                getIcons: function () {
                    return icons;
                }
            };
        }
    ]
);