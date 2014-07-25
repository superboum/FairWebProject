/// <reference path="../bootstrap.d.ts"/>

module FairWebProject.Model
{
  var Twit = require('twit');
  
  export class Report {

    public static base;

    public static init() {
      var T = new Twit({
        consumer_key:         FairWebProject.Config.Twitter.consumer_key
      , consumer_secret:      FairWebProject.Config.Twitter.consumer_secret
      , access_token:         FairWebProject.Config.Twitter.access_token
      , access_token_secret:  FairWebProject.Config.Twitter.access_token_secret
      });

      var stream = T.stream('statuses/filter', { track: FairWebProject.Config.Twitter.hashtag });
      console.log('stream registered');
      stream.on('tweet', function (tweet) {
        (new FairWebProject.Model.Answer(tweet)).save();
      });
    }
  }
}

console.log('Run');
FairWebProject.Model.Report.init();

setTimeout(function() {
    console.log('Quit');
}, 300000000);

