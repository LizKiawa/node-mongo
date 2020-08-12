const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {  //connects mongo client to mongodb server

  assert.strictEqual(err, null);

  console.log('Connected correctly to server');

  const db = client.db(dbname);

  db.dropCollection('campsites', (err, result) => {  //This drops all current collections so u can test with fresh db everytime during leaning. DO NOT add to real world applications.
    assert.strictEqual(err, null);
    console.log('Dropped Collection', result);

    const collection = db.collection('campsites');  //recreates campsites collection

    collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},  //inserting a document into collection
    (err, result) => {
      assert.strictEqual(err, null);  //error must strictly be equal to null to stop, otherwise we continue on
      console.log('Insert Document:', result.ops);  //ops is operations

      collection.find().toArray((err, docs) => {   //retrieve all docs inside the collection
        assert.strictEqual(err, null);
        console.log('Found Documents:', docs);

        client.close();  // close client's connection to mongo db server
      });
    });
  });
});