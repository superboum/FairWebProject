/// <reference path="../bootstrap.d.ts"/>

module FairWebProject.Tool
{
  var mongodb = require('mongodb');

  export class Database {

    private static db: any;

    public static init(callback: (err: any) => void) {
      mongodb.MongoClient.connect(Config.Mongo.url, function(err, db) {
        Database.db = db;
        callback(err);
      });
    }

    public static save(object: any, collectionName: string) {
      Database.db.collection(collectionName, function (err, collection) {
        collection.insert(object, function(err) {
          if(err) { console.log('[FWP.TOO.DAT] '+err); }
          else { console.log('[FWP.TOO.DAT] Successfully inserted object in '+collectionName); }
        });
      });
    }

  }
}
/*
console.log('Run');
FairWebProject.Tool.Database.init(null);

setTimeout(function() {
    console.log('Quit');
}, 300000000);*/
