/// <reference path="../bootstrap.d.ts"/>

module FairWebProject.Route
{
  export class Api {
    public static GetReportList(req: any, res: any): void {
      Model.Report.getList(function(err,doc) {
        res.send(doc);
      });
    }
  }
}
