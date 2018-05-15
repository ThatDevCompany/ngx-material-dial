import {BuildUtils} from 'that-dev-library/build';

BuildUtils
	.exec('LINTING', 'tslint', ['-p', 'tsconfig.json', '--fix'])
	.subscribe();
