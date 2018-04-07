module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular/cli'],
		plugins: [
			require('karma-jasmine'),
			require('karma-phantomjs2-launcher'),
			require('karma-coverage-istanbul-reporter'),
			require('@angular/cli/plugins/karma')
		],
		client: {
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},
		coverageIstanbulReporter: {
			reports: ['html', 'lcovonly'],
			dir: 'coverage/client',
			skipFilesWithNoCoverage: false,
			fixWebpackSourcePaths: true,
			includeAllSources: true
		},
		angularCli: {
			environment: 'dev',
			codeCoverage: true
		},
		reporters: ['progress', 'coverage-istanbul'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['PhantomJS2'],
		customLaunchers: {
			'PhantomJS2_custom': {
				base: 'PhantomJS2',
				options: {
					windowName: 'my-window',
					settings: {
						webSecurityEnabled: false
					},
				},
				flags: ['--load-images=true'],
				debug: true
			}
		},
		proxies: {
			'/images': 'http://localhost:9876/images',
			'/fonts': 'http://localhost:9876/fonts'
		},
		phantomjsLauncher: {
			exitOnResourceError: false
		},
		singleRun: true
	});
};
