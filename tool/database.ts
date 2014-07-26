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
        if(err) { console.log('[FWP.TOO.DAT] Error -> '+err); }
        else {
          collection.insert(object, function(err) {
            if(err) { console.log('[FWP.TOO.DAT] Error -> '+err); }
            else { console.log('[FWP.TOO.DAT] Successfully inserted object in '+collectionName); }
          });
        }
      });
    }

    public static request(collectionName: string, criteria:any, limit: number, callback: (err: any, doc: any) => void) {
      Database.db.collection(collectionName, function(err, collection) {
        if(err) { console.log('[FWP.TOO.DAT] Error -> '+err); }
        else {
          collection.find(criteria).limit(limit).toArray(function(err, docs) {
            callback(err, docs);
            if(err) { console.log('[FWP.TOO.DAT] Error -> '+err); }
            else { console.log('[FWP.TOO.DAT] Successfuly requested objects in '+collectionName+' with criteria '+criteria); }
          });
        }
      });
    }

    public static requestByGroup(collectionName: string, groupCriteria: any, limit: number, callback: (err: any, doc: any) => void) {
      Database.db.collection(collectionName, function(err, collection) {
        if(err) { console.log('[FWP.TOO.DAT] Error -> '+err); }
        else {
          collection.group(groupCriteria.keys, groupCriteria.condition, groupCriteria.initial, groupCriteria.reduce, function(err, docs) {
            callback(err, docs);
            if(err) { console.log('[FWP.TOO.DAT] Error -> '+err); }
            else { console.log('[FWP.TOO.DAT] Successfuly requested grouped objects in '+collectionName); }
          });
        }
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
