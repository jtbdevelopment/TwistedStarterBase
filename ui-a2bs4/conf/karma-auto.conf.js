const conf = require('./gulp.conf');

module.exports = function (config) {
    const configuration = {
        basePath: '../',
        singleRun: false,
        autoWatch: true,
        logLevel: 'INFO',
        junitReporter: {
            outputDir: 'test-reports'
        },
        browsers: [
            //'Chrome'
            'PhantomJS'
        ],
        frameworks: [
            'jasmine'
        ],
        files: [
            'node_modules/es6-shim/es6-shim.js',
            conf.path.src('index.spec.ts')
        ],
        preprocessors: {
            [conf.path.src('index.spec.ts')]: [
                'webpack'
            ]
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },
        webpack: require('./webpack-test.conf'),
        webpackMiddleware: {
            noInfo: true
        },
        plugins: [
            require('karma-jasmine'),
            require('karma-junit-reporter'),
            require('karma-coverage'),
//      require('karma-chrome-launcher'),
            require('karma-phantomjs-launcher'),
            require('karma-webpack')
        ]
    };

    config.set(configuration);
};
