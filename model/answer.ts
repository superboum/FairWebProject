/// <reference path="../bootstrap.d.ts"/>

module FairWebProject.Model
{

  export class Answer {
    public offensiveUser: any;

    public offendedUser: any;

    public constructor (tweet) {
      this.offensiveUser = {};
      this.offensiveUser['id'] = tweet.in_reply_to_status_id;
      this.offensiveUser['messageId'] = tweet.in_reply_to_user_id;

      this.offendedUser = {};
      this.offendedUser['identity'] = tweet.user;
      this.offendedUser.message = {};
      this.offendedUser.message.id = tweet.id;
      this.offendedUser.message.text = tweet.text;
      this.offendedUser.message.hastags = tweet.entities.hashtags;
      this.offendedUser.message.sensisitive = tweet.possibly_sensitive;
      this.offendedUser.message.filter_level = tweet.filter_level;
      this.offendedUser.message.lang = tweet.lang;
      
      return this;
    }

    public save() {
      Tool.Database.save(this, 'fwp_answer');
    }
  }
}
