'use strict';

angular.module('tsbUI')
    .controller('ProfileCtrl',
        ['jtbPlayerService',
            function (jtbPlayerService) {
                var controller = this;
                controller.player = jtbPlayerService.currentPlayer();
            }
        ]
    );
