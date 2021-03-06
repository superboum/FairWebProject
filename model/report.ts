/// <reference path="../bootstrap.d.ts"/>

module FairWebProject.Model
{
  var Twit = require('twit');
  
  export class Report {

    public static base;

    public static init() {
      var T = new Twit({
        consumer_key:         Config.Twitter.consumer_key
      , consumer_secret:      Config.Twitter.consumer_secret
      , access_token:         Config.Twitter.access_token
      , access_token_secret:  Config.Twitter.access_token_secret
      });

      var connecting = false;

      var stream = T.stream('statuses/filter', { track: Config.Twitter.hashtag });
      console.log('[FWP.MOD.REP] Stream registered for '+Config.Twitter.hashtag);

      stream.on('disconnect', function (disconnectMessage) {
        console.log('[FWP.MOD.REP] Disconnected from Twitter '+disconnectMessage);
      });

      stream.on('connect', function (request) {
        console.log('[FWP.MOD.REP] Attempting a connection to Twitter');
        connecting = true;
      })

      stream.on('connected', function (response) {
        if (connecting) {
          console.log('[FWP.MOD.REP] Connection to Twitter OK');
        }
        connecting = false;
      })
      stream.on('tweet', function (tweet) {
        console.log('[FWP.MOD.REP] A new tweet arrived');
        (new Answer(tweet)).save();
      });
    }

    public static getList(callback: (err,doc) => void) {
      var groupCriteria = {};
      groupCriteria['keys'] = ['offensiveUser.statusId', 'offensiveUser.userId'];
      groupCriteria['condition'] = {};
      groupCriteria['initial'] = {'reported': 0};
      groupCriteria['reduce'] = "function (obj, prev) { prev.reported++; }";

      Tool.Database.requestByGroup('fwp_answer',groupCriteria,0,function(err, doc) {
        callback(err,doc);
      });
    }
  }
}
