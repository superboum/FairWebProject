/// <reference path="../bootstrap.d.ts"/>

module FairWebProject.Route
{
  export class Api {
    public static GetReportList(req: any, res: any): void {
      res.send('hello');
    }
  }
}
