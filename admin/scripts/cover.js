const BuildUtils = require('that-build-library').BuildUtils

module.exports = Promise.resolve()
	.then(() => BuildUtils.exec('codecov', []))

	.catch(console.error)
