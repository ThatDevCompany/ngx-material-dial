import {BuildUtils} from 'that-dev-library/build';

BuildUtils
	.clean('dist/')
	.flatMap(() => BuildUtils.exec('Transpiling', 'ngc', [
		'src/index'
	]))
	.flatMap(() => BuildUtils.exec('Inlining', 'ng-asset-inline', [
		'dist/dial',
		'src/dial'
	]))
	.flatMap(() => BuildUtils.exec('Rolling Up', 'rollup', [
		'-c', 'scripts/build.rollup.config.js'
	]))
	.flatMap(() => BuildUtils.exec('Rolling Up', 'uglifyjs', [
		'dist/bundles/dial.umd.js',
		'--screw-ie8',
		'--compress',
		'--mangle',
		'--comments',
		'--output dist/bundles/dial.umd.min.js'
	]))
	.flatMap(() => BuildUtils.copy('README.md', 'dist'))
	.flatMap(() => BuildUtils.copy('LICENSE', 'dist'))
	.subscribe();
