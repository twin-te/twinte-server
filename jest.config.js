process.env.PG_DATABASE = 'twinte_test'
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts'
}
