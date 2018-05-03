import {BuildUtils} from 'that-build-library';

BuildUtils
	.npmPublish('dist', (pkg) => {
		delete pkg.scripts;
		pkg.main = 'bundles/dial.umd.js';
		pkg.module = 'index.js';
		pkg.typings = 'index.d.ts';
	})
	.subscribe();
