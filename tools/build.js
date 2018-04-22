const fs = require('fs');
const del = require('del');
const process = require('child_process');

console.log('Deleting /dist folder');
del(['./dist/*']).then(() => {
	
	console.log('Transpiling');
	process.exec('ngc src/index', () => {
		
		console.log('Rolling up');
		process.exec('rollup -c tools/rollup.config.js', () => {
			
			console.log('Uglifying');
			process.exec('uglifyjs dist/bundles/dial.umd.js --screw-ie8 --compress --mangle --comments --output dist/bundles/dial.umd.min.js', () => {
				
				console.log('Updating package.json version');
				let packageJson = JSON.parse(fs.readFileSync('./package.json').toString());
				let v = packageJson.version.split('.');
				v[2] = (parseInt(v[2]) + 1) + '';
				packageJson.version = v.join('.');
				fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
				
				console.log('Copying package.json file');
				packageJson.main = "bundles/dial.umd.js",
				packageJson.module = "index.js",
				packageJson.typings = "index.d.ts",
				delete packageJson.devDependencies;
				delete packageJson.scripts;
				fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 2));
				fs.writeFileSync('./dist/README.md', (fs.readFileSync('./README.md').toString()));
				fs.writeFileSync('./dist/LICENSE', (fs.readFileSync('./LICENSE').toString()));
				fs.writeFileSync('./dist/LICENSE', (fs.readFileSync('./LICENSE').toString()));
				fs.writeFileSync('./dist/dial/dial.component.html', (fs.readFileSync('./src/dial/dial.component.html').toString()));
				fs.writeFileSync('./dist/dial/dial.component.css', (fs.readFileSync('./src/dial/dial.component.css').toString()));
				
				console.log('Done');
				
			});
		});
	});
});


