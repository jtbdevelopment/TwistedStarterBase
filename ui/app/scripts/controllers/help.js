'use strict';

angular.module('tsbUI')
    .controller('HelpCtrl',
        ['$http',
            function ($http) {
                var controller = this;

                controller.proxyTest = 'Waiting';
                //  As a template, this proves your proxy connect service is working.
                $http.get('/api/social/apis', {cache: true}).then(
                    function (response) {
                        console.log(JSON.stringify(response));
                        controller.proxyTest = JSON.stringify(response);
                    },
                    function (data, status) {
                        controller.proxyTest = 'Failed:  data=' + JSON.stringify(data) + ', status=' + status;
                    }
                );

            }
        ]
    );
