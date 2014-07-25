/// <reference path="../bootstrap.d.ts"/>

module FairWebProject.Model
{
  export class Answer {
    public offensiveUserId: number;
    public offensiveUserName: string;
    public offensiveUserMessageId: number;

    public offendedUserId: number;
    public offendedUserName: string;
    public offendedUserMessageId: number;
    public offendedUserHashtags: string[];

    public constructor (tweet) {
      this.offensiveUserId = tweet.in_reply_to_status_id;
      this.offensiveUserName = tweet.in_reply_to_screen_name;
      this.offensiveUserMessageId = tweet.in_reply_to_user_id;

      this.offendedUserId = tweet.user.id;
      this.offendedUserName = tweet.user.screen_name;
      this.offendedUserMessageId = tweet.id;
      this.offendedUserHashtags = tweet.entities.hashtags;
      
      return this;
    }

    public save() {
    }
  }
}
