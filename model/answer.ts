/// <reference path="../bootstrap.d.ts"/>

module FairWebProject.Model
{

  export class Answer {
    public offensiveUser: any;

    public offendedUser: any;

    public constructor (tweet) {
      this.offensiveUser = {};
      this.offensiveUser['statusId'] = tweet.in_reply_to_status_id_str
      this.offensiveUser['userId'] = tweet.in_reply_to_user_id_str;
      this.offensiveUser['username'] = tweet.in_reply_to_screen_name;

      this.offendedUser = {};
      this.offendedUser['userId'] = tweet.user.id_str;
      this.offendedUser['username'] = tweet.user.screen_name;
      this.offendedUser['statusId'] = tweet.id_str;
      this.offendedUser['hashtags'] = this.extractHashtags(tweet.entities.hashtags);
      this.offendedUser['sensisitive'] = tweet.possibly_sensitive;
      this.offendedUser['filter_level'] = tweet.filter_level;
      this.offendedUser['lang'] = tweet.lang;
      
      return this;
    }

    private extractHashtags(obj: any) {
      var r = []
      obj.forEach(function(entry) {
        if (Config.Twitter.hashtag.indexOf(entry.text) == -1) {
          r.push(entry.text);
        }
      });
      return r;
    }

    public save() {
      if (this.offensiveUser.statusId == null || this.offensiveUser.userId == null) {
        console.log('[FWP.MOD.ANS] Should be an answer');
      } else {
        console.log('[FWP.MOD.ANS] Register an answer to '+this.offensiveUser.username);
        Tool.Database.save(this, 'fwp_answer');
      }
    }
  }
}
