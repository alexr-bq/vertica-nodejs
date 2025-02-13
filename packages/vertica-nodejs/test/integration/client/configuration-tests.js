'use strict'
var helper = require('./test-helper')
var vertica = helper.vertica

var suite = new helper.Suite()

// clear process.env
var realEnv = {}
for (var key in process.env) {
  realEnv[key] = process.env[key]
  if (!key.indexOf('PG')) delete process.env[key]
}

suite.test('default values are used in new clients', function () {
  assert.same(vertica.defaults, {
    user: process.env.USER,
    database: undefined,
    password: null,
    port: 5433,
    rows: 0,
    max: 10,
    binary: false,
    idleTimeoutMillis: 30000,
    client_encoding: '',
    tls_mode: 'disable',
    application_name: undefined,
    fallback_application_name: undefined,
    parseInputDatesAsUTC: false,
  })

})

// Commenting out test for now as it doesn't work with env vars set
/* 
suite.test('modified values are passed to created clients', function () {
  vertica.defaults.user = 'boom'
  vertica.defaults.password = 'zap'
  vertica.defaults.database = 'pow'
  vertica.defaults.port = 1234
  vertica.defaults.host = 'blam'

  var client = new Client()
  assert.same(client, {
    user: 'boom',
    password: 'zap',
    database: 'pow',
    port: 1234,
    host: 'blam',
  })
})

suite.test('database defaults to user when user is non-default', () => {
  {
    vertica.defaults.database = undefined

    const client = new Client({
      user: 'foo',
    })

    assert.strictEqual(client.database, 'foo')
  }

  {
    vertica.defaults.database = 'bar'

    const client = new Client({
      user: 'foo',
    })

    assert.strictEqual(client.database, 'bar')
  }
})
*/

suite.test('cleanup', () => {
  // restore process.env
  for (var key in realEnv) {
    process.env[key] = realEnv[key]
  }
})
