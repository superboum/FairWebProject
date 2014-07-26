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

      var stream = T.stream('statuses/filter', { track: Config.Twitter.hashtag });
      console.log('[FWP.MOD.REP] Stream registered');

      stream.on('tweet', function (tweet) {
        (new Answer(tweet)).save();
      });
    }

    public static getList() {
    }
  }
}
/*
console.log('Run');
FairWebProject.Model.Report.init();

setTimeout(function() {
    console.log('Quit');
}, 300000000);
*/
