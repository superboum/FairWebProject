/// <reference path="../bootstrap.d.ts"/>

module FairWebProject.Model
{
  var Twit = require('twit');
  
  export class Report {
    public constructor() {
      var T = new Twit({
        consumer_key:         FairWebProject.Config.Twitter.consumer_key
      , consumer_secret:      FairWebProject.Config.Twitter.consumer_secret
      , access_token:         FairWebProject.Config.Twitter.access_token
      , access_token_secret:  FairWebProject.Config.Twitter.access_token_secret
      });

      var stream = T.stream('statuses/filter', { track: '#FairWebProject' });
      stream.on('tweet', function (tweet) {
        console.log(tweet);
      });
    }
  }
}

var r = new FairWebProject.Model.Report();

setTimeout(function() {
    console.log('Quit');
}, 300000000);

