var pg = require('pg');
var postgresUrl = 'postgres://localhost/twitterdb';
var client = new pg.Client(postgresUrl);

// connect to our database
client.connect();

module.exports = client;
