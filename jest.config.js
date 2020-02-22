module.exports = {
	testEnvironment: 'node',
	rootDir: 'src',
	testMatch: ['<rootDir>/**/*.test.js'],
	coverageReporters: ['json', 'text'],
	coverageDirectory: '<rootDir>/../coverage',
};
