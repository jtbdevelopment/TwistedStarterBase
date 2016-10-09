'use strict';

/**
 * @ngdoc overview
 * @name twsUI
 * @description
 * # twsUI
 *
 * Main module of the application.
 */

function endsWith(str, suffix) {
    return (str.substr(str.length - suffix.length, suffix.length) === suffix);
}

//  TODO - eliminate when you have real services
angular.module('twsUI.services', []);

angular.module('twsUIBackground', ['twsUI.services', 'twsUI'])
//  Separate module to avoid interfering with tests
    .run(function ($rootScope, $location) {
        $rootScope.$on('gameUpdated', function (message, oldGame, newGame) {
            if (endsWith($location.path(), oldGame.id) && oldGame.gamePhase !== newGame.gamePhase) {
                $location.path('/game/' + newGame.gamePhase.toLowerCase() + '/' + newGame.id);
            }
        });
    });

angular
    .module('twsUI', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'ui.select',
        'coreGamesUi',
        'coreGamesBootstrapUi'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: 'views/main.html'
            })
            .when('/help', {
                templateUrl: 'views/help.html',
                controller: 'HelpCtrl',
                controllerAs: 'help'
            })
            .when('/signin', {
                templateUrl: 'views/core-bs/sign-in/sign-in.html',
                controller: 'CoreBootstrapSignInCtrl',
                controllerAs: 'signIn'
            })
            .when('/signedin', {
                templateUrl: 'views/core-bs/sign-in/signed-in.html',
                controller: 'CoreBootstrapSignedInCtrl',
                controllerAs: 'signedIn'
            })
            .when('/admin', {
                templateUrl: 'views/core-bs/admin/admin.html',
                controller: 'CoreAdminCtrl',
                controllerAs: 'admin'
            })
            .when('/profile', {
                templateUrl: 'views/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'profile'
            })
            .when('/create', {
                templateUrl: 'views/create.html',
                controller: 'CreateGameCtrl',
                controllerAs: 'create'
            })
            .when('/game/challenged/:gameID', {
                templateUrl: 'views/phases/playerList.html',
                controller: 'PlayerListCtrl',
                controllerAs: 'list'
            })
            .when('/game/declined/:gameID', {
                templateUrl: 'views/phases/playerList.html',
                controller: 'PlayerListCtrl',
                controllerAs: 'list'
            })
            .when('/game/quit/:gameID', {
                templateUrl: 'views/phases/playerList.html',
                controller: 'PlayerListCtrl',
                controllerAs: 'list'
            })
            .when('/game/roundover/:gameID', {
                templateUrl: 'views/phases/playerList.html',
                controller: 'PlayerListCtrl',
                controllerAs: 'list'
            })
            .when('/game/nextroundstarted/:gameID', {
                templateUrl: 'views/phases/playerList.html',
                controller: 'PlayerListCtrl',
                controllerAs: 'list'
            })
            //  TODO
            // .when('/game/playing/:gameID', {
            //     templateUrl: 'views/phases/play.html',
            //     controller: 'PlayCtrl',
            //     controllerAs: 'play'
            // })
            // .when('/game/setup/:gameID', {
            //     templateUrl: 'views/phases/setup.html',
            //     controller: 'SetupCtrl',
            //     controllerAs: 'setup'
            // })
            .otherwise({
                redirectTo: '/signin'
            });
    });
