"use strict";

var Gremlin = require('gremlin');
var config = require("./config");
var async = require('async');

const client = Gremlin.createClient(
    443, 
    config.endpoint, 
    { 
        "session": false, 
        "ssl": true, 
        "user": `/dbs/${config.database}/colls/${config.collection}`,
        "password": config.primaryKey
    }
);


function dropGraph()
{
    console.log('Running Drop');
    client.execute('g.V().drop()', { }, (err, results) => {
        if (err) return console.error(err);
        console.log("Result: %s\n", JSON.stringify(results));
    });
}

function addVertex1()
{
    console.log('Running Add Vertex1'); 
    client.execute("g.addV('person').property('id', 'thomas').property('firstName', 'Thomas').property('age', 44).property('userid', 1)", { }, (err, results) => {
      if (err) return console.error(err);
      console.log("Result: %s\n", JSON.stringify(results));
    });
}

function addVertex2()
{
    console.log('Running Add Vertex2'); 
    client.execute("g.addV('person').property('id', 'mary').property('firstName', 'Mary').property('lastName', 'Andersen').property('age', 39).property('userid', 2)", { }, (err, results) => {
      if (err) return console.error(err);
      console.log("Result: %s\n", JSON.stringify(results));
    });
}

function addEdge()
{
    console.log('Running Add Edge'); 
    client.execute("g.V('thomas').addE('knows').to(g.V('mary'))", { }, (err, results) => {
      if (err) return console.error(err);
      console.log("Result: %s\n", JSON.stringify(results));
    });
}

function countVertices()
{
    console.log('Running Count'); 
    client.execute("g.V().count()", { }, (err, results) => {
      if (err) return console.error(err);
      console.log("Result: %s\n", JSON.stringify(results));
      console.log("Finished");
    });
}

async.waterfall([
    dropGraph,
    addVertex1,
    addVertex2,
    addEdge
], countVertices);
