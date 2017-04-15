/* eslint-env node, protractor */
/* eslint-disable space-before-blocks */
/* eslint-disable arrow-parens */
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

const suites = {};
glob.sync('src/**/*.e2e.js', {nonull: false}).forEach(filepath => {
	const suiteId = path.basename(filepath, '.e2e.js');
	suites[suiteId] = filepath;
});

const entry = {};
glob.sync('src/**/e2e/*.js', {nonull: false, realpath: true}).forEach(filepath => {
	const testId = path.basename(filepath, '.js');
	const suiteId = path.basename(path.join(filepath, '../..'));
	const id = `${suiteId}--${testId}`;
	entry[id] = filepath;
});

let server;
exports.config = {
	directConnect: true,
	allScriptsTimeout: 15000,
	// multiCapabilities: [
	// 	{browserName: 'firefox'},
	// 	{browserName: 'chrome'}
	// ],
	capabilities: {
		browserName: 'chrome'
	},
	suites,
	jasmineNodeOpts: {
		showColors: true
	},
	onPrepare(){
		browser.ignoreSynchronization = true;
	},
	beforeLaunch(){
		const testsConfig = webpackConfig();
		testsConfig.entry = entry;
		const compiler = webpack(testsConfig);
		server = new WebpackDevServer(compiler, testsConfig.devServer);

		//
		// TODO middleware to add pages that load a specific e2e test
		//

		server.listen(8001, '127.0.0.1', () => {
			console.log('Starting server on http://localhost:8080');
		});
	},
	onComplete(){
		server.close();
		server = false;
	}
};
