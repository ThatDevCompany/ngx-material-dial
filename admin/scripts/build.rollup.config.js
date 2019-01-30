export default {
	input: 'dist/index.js',
	output: {
		file: 'dist/bundles/dial.umd.js',
		format: 'umd',
		name: 'ng.dial',
		sourcemap: false,
		globals: {
			'@angular/core': 'ng.core'
		}
	}
}
