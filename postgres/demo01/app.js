"use strict";

var express = require('express');
var pg = require('pg');

var app = express();
var config = {
	port : process.env.POSTGRESDB_PORT_5432_TCP_PORT,
	ip : process.env.POSTGRESDB_PORT_5432_TCP_ADDR,
	pw : process.env.POSTGRESDB_ENV_POSTGRES_PASSWORD
};

console.log(process.env);

var connectionString = process.env.DATABASE_URL || 'postgres://postgres:'+config.pw+'@'+config.ip+':'+config.port+'/booktown';


app.get('/', function (req, res) {

  var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
    	// Handle Errors
        if(err) {
          console.log(err);
        }
        // SQL Query > Select Data
        var query = client.query('select * from books');

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });
    });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
