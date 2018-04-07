const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PolymerWebpackLoader = require('polymer-webpack-loader');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');

const {NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin} = require('webpack');
const {NamedLazyChunksWebpackPlugin, BaseHrefWebpackPlugin} = require('@angular/cli/plugins/webpack');
const {CommonsChunkPlugin} = require('webpack').optimize;
const {AotPlugin} = require('@ngtools/webpack');


const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'client', '$$_gendir', 'node_modules');

const entryPoints = ["inline", "polyfills", "thatdevthingStyles", "helloworldStyles", "vendor", "thatdevthing", "helloworld", "tdc-www"];
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";

const postcssPlugins = function () {
	// safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
	const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
	const minimizeOptions = {
		autoprefixer: false,
		safe: true,
		mergeLonghand: false,
		discardComments: {remove: (comment) => !importantCommentRe.test(comment)}
	};
	return [
		postcssUrl({
			url: (URL) => {
				// Only convert root relative URLs, which CSS-Loader won't process into require().
				if (!URL.startsWith('/') || URL.startsWith('//')) {
					return URL;
				}
				if (deployUrl.match(/:\/\//)) {
					// If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
					return `${deployUrl.replace(/\/$/, '')}${URL}`;
				}
				else if (baseHref.match(/:\/\//)) {
					// If baseHref contains a scheme, include it as is.
					return baseHref.replace(/\/$/, '') +
						`/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
				}
				else {
					// Join together base-href, deploy-url and the original URL.
					// Also dedupe multiple slashes into single ones.
					return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
				}
			}
		}),
		autoprefixer(),
	].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
};

module.exports = {
	"resolve": {
		"extensions": [
			".ts",
			".js",
            ".html"
		],
		"modules": [
			"./node_modules",
			"./bower_components"
		],
		"symlinks": false
	},
	"resolveLoader": {
		"modules": [
			"./node_modules",
            "./bower_components"
		]
	},
	"entry": {
		"polyfills": [
			"./src/client/angular/polyfills.ts"
		],
		"thatdevthingStyles": [
			"./src/client/angular/thatdevthing/index.scss"
		],
		"thatdevthing": [
			"./src/client/angular/thatdevthing/index.ts"
		],
		"helloworldStyles": [
			"./src/client/angular/helloworld/index.scss"
		],
		"helloworld": [
			"./src/client/angular/helloworld/index.ts"
		],
        "tdc-www": [
            "./src/client/polymer/tdc-www.html"
        ]
	},
	"output": {
		"path": path.join(process.cwd(), "build"),
		"filename": "[name].bundle.js",
		"chunkFilename": "[id].chunk.js"
	},
	"module": {
		"rules": [
			/* Source Map Loader */
			{
				"enforce": "pre",
				"test": /\.js$/,
				"loader": "source-map-loader",
				exclude: [
					path.join(__dirname, 'node_modules', '@angular/compiler')
				]
			},
			/* Files raw */
			{
                "exclude": [
                    path.join(process.cwd(), "src/client/polymer"),
                    path.join(process.cwd(), "bower_components")
                ],
                "test": /\.html$/,
				"loaders": ["raw-loader"]
			},
            /* Files polyer */
            {
                "exclude": [
                    path.join(process.cwd(), "src/client/angular"),
                    path.join(process.cwd(), "src/common/angular")
                ],
                "test": /\.html$/,
                "loaders": ["polymer-webpack-loader"]
            },
            /* Files by URL */
			{
				"test": /\.(eot|svg|cur)$/,
				"loader": "file-loader?name=[name].[ext]"
			},
			/* Files */
			{
				"test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
				"loader": "url-loader?limit=100000"
			},
			/* Internal CSS */
			{
				"exclude": [
					path.join(process.cwd(), "src/client/angular/helloworld/index.scss"),
					path.join(process.cwd(), "src/client/angular/thatdevthing/index.scss")
				],
				"test": /\.css$/,
				"use": [
					"exports-loader?module.exports.toString()",
					{
						"loader": "css-loader",
						"options": {
							"sourceMap": false,
							"importLoaders": 1
						}
					},
					{
						"loader": "postcss-loader",
						"options": {
							"ident": "postcss",
							"plugins": postcssPlugins
						}
					}
				]
			},
			/* Internal  SCSS */
			{
				"exclude": [
					path.join(process.cwd(), "src/client/angular/helloworld/index.scss"),
					path.join(process.cwd(), "src/client/angular/thatdevthing/index.scss")
				],
				"test": /\.scss$|\.sass$/,
				"use": [
					"exports-loader?module.exports.toString()",
					{
						"loader": "css-loader",
						"options": {
							"sourceMap": false,
							"importLoaders": 1
						}
					},
					{
						"loader": "postcss-loader",
						"options": {
							"ident": "postcss",
							"plugins": postcssPlugins
						}
					},
					{
						"loader": "sass-loader",
						"options": {
							"sourceMap": false,
							"precision": 8,
							"includePaths": []
						}
					}
				]
			},
			/* External SCSS */
			{
				"include": [
					path.join(process.cwd(), "src/client/angular/helloworld/index.scss"),
					path.join(process.cwd(), "src/client/angular/thatdevthing/index.scss")
				],
				"test": /\.scss$|\.sass$/,
				"use": [
					"style-loader",
					{
						"loader": "css-loader",
						"options": {
							"sourceMap": false,
							"importLoaders": 1
						}
					},
					{
						"loader": "postcss-loader",
						"options": {
							"ident": "postcss",
							"plugins": postcssPlugins
						}
					},
					{
						"loader": "sass-loader",
						"options": {
							"sourceMap": false,
							"precision": 8,
							"includePaths": []
						}
					}
				]
			},
			/* Typescript Compilation */
			{
				"test": /\.ts$/,
				"loader": "@ngtools/webpack"
			},
			/* Code Coverage Compilation */
			{
				test: /\.(js|ts)$/,
				loader: 'istanbul-instrumenter-loader',
				enforce: 'post',
				query: { esModules: true },
				exclude: /node_modules|\.(e2e|spec)\.ts$/
			}
		]
	},
	"plugins": [
		new NoEmitOnErrorsPlugin(),
		new CopyWebpackPlugin([
			{
				"context": path.join(__dirname, 'src/client'),
				"to": "",
				"from": "fonts/**/*"
			},
			{
				"context": path.join(__dirname, 'src/client'),
				"to": "",
				"from": "images/**/*"
			},
			{
				"context": path.join(__dirname, 'src/client'),
				"to": "",
				"from": "css/*.css"
			},
			{
				"context": path.join(__dirname, 'src/client'),
				"to": "",
				"from": "browserconfig.xml"
			},
			{
				"context": path.join(__dirname, 'src/client'),
				"to": "",
				"from": "favicon.ico"
			},
			{
				"context": path.join(__dirname, 'src/client'),
				"to": "",
				"from": "manifest.json"
			},
			{
				"context": path.join(__dirname, 'src/client'),
				"to": "",
				"from": "index.html"
			}
		], {
			"ignore": [ ".gitkeep"
			],
			"debug": "warning"
		}),
		new ProgressPlugin(),
		new CircularDependencyPlugin({
			"exclude": /(\\|\/)node_modules(\\|\/)/,
			"failOnError": false
		}),
		new NamedLazyChunksWebpackPlugin(),
		new HtmlWebpackPlugin({
			"template": "./src/client/angular/helloworld/index.html",
			"filename": "./helloworld.html",
			"hash": false,
			"inject": true,
			"compile": true,
			"favicon": false,
			"minify": false,
			"cache": true,
			"showErrors": true,
			"chunks": "all",
			"excludeChunks": ["thatdevthing", "thatdevthingStyles"],
			"title": "Hello World",
			"xhtml": true,
			"chunksSortMode": function sort(left, right) {
				let leftIndex = entryPoints.indexOf(left.names[0]);
				let rightindex = entryPoints.indexOf(right.names[0]);
				if (leftIndex > rightindex) {
					return 1;
				}
				else if (leftIndex < rightindex) {
					return -1;
				}
				else {
					return 0;
				}
			}
		}),
		new HtmlWebpackPlugin({
			"template": "./src/client/angular/thatdevthing/index.html",
			"filename": "./thatdevthing.html",
			"hash": false,
			"inject": true,
			"compile": true,
			"favicon": false,
			"minify": false,
			"cache": true,
			"showErrors": true,
			"chunks": "all",
			"excludeChunks": ["helloworld", "helloworldStyles"],
			"title": "That Dev Thing",
			"xhtml": true,
			"chunksSortMode": function sort(left, right) {
				let leftIndex = entryPoints.indexOf(left.names[0]);
				let rightindex = entryPoints.indexOf(right.names[0]);
				if (leftIndex > rightindex) {
					return 1;
				}
				else if (leftIndex < rightindex) {
					return -1;
				}
				else {
					return 0;
				}
			}
		}),
		new BaseHrefWebpackPlugin({}),
		new CommonsChunkPlugin({
			"name": [
				"inline"
			],
			"minChunks": null,
            "chunks": [
                "thatdevthing", "helloworld", "polyfills"
            ]
		}),
		new CommonsChunkPlugin({
			"name": [
				"vendor"
			],
			"minChunks": (module) => {
				return module.resource
					&& (module.resource.startsWith(nodeModules)
						|| module.resource.startsWith(genDirNodeModules)
						|| module.resource.startsWith(realNodeModules));
			},
			"chunks": [
				"thatdevthing", "helloworld"
			]
		}),
		new SourceMapDevToolPlugin({
			"filename": "[file].map[query]",
			"moduleFilenameTemplate": "[resource-path]",
			"fallbackModuleFilenameTemplate": "[resource-path]?[hash]",
			"sourceRoot": "webpack:///"
		}),
		new CommonsChunkPlugin({
			"name": [
				"thatdevthing", "helloworld", "tdc-www"
			],
			"minChunks": 2,
			"async": "common"
		}),
		new NamedModulesPlugin({}),
		new AotPlugin({
			"appPath": "src/client/angular/thatdevthing/index.ts",
			"replaceExport": false,
			"hostReplacementPaths": {
				//"angular/environments/environment.ts": "angular/environments/environment.ts"
			},
			"exclude": [],
			"tsConfigPath": "src/client/angular/tsconfig.app.json",
			"skipCodeGeneration": true
		})
	],
	"node": {
		"fs": "empty",
		"global": true,
		"crypto": "empty",
		"tls": "empty",
		"net": "empty",
		"process": true,
		"module": false,
		"clearImmediate": false,
		"setImmediate": false
	},
	"devServer": {
		"historyApiFallback": true
	}
};
