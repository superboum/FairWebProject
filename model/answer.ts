/// <reference path="../bootstrap.d.ts"/>

module FairWebProject.Model
{

  export class Answer {
    public offensiveUser: any;

    public offendedUser: any;

    public constructor (tweet) {
      this.offensiveUser = {};
      this.offensiveUser['statusId'] = tweet.in_reply_to_status_id;
      this.offensiveUser['userId'] = tweet.in_reply_to_user_id;

      this.offendedUser = {};
      this.offendedUser['identity'] = tweet.user;
      this.offendedUser.status = {};
      this.offendedUser.status.id = tweet.id;
      this.offendedUser.status.text = tweet.text;
      this.offendedUser.status.hastags = tweet.entities.hashtags;
      this.offendedUser.status.sensisitive = tweet.possibly_sensitive;
      this.offendedUser.status.filter_level = tweet.filter_level;
      this.offendedUser.status.lang = tweet.lang;
      
      return this;
    }

    public save() {
      if (this.offensiveUser.statusId == null || this.offensiveUser.userId == null) {
        console.log('[FWP.MOD.ANS] Should be an answer');
      } else {
        Tool.Database.save(this, 'fwp_answer');
      }
    }
  }
}
