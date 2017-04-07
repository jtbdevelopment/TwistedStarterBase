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
            'PhantomJS'
        ],
        frameworks: [
            'jasmine', 'karma-typescript'
        ],
        files: [
            {pattern: 'src/index.spec.ts'},
            {pattern: 'src/app/**/*.+(ts|html)'},
            {pattern: 'src/**/*.png', included: false, watched: false, served: true, nocache: false}
        ],
        preprocessors: {
            '**/*.ts': ['karma-typescript']
        },
        reporters: ['progress', 'karma-typescript'],
        proxies: {
            '/images/': '/base/src/images/'
        },
        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },
        plugins: [
            require('karma-jasmine'),
            require('karma-junit-reporter'),
            require('karma-typescript'),
            require('karma-phantomjs-launcher')
        ]
    };

    config.set(configuration);
};
