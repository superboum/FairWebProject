/// <reference path="./bootstrap.d.ts"/>

module FairWebProject
{
  var express: any     = require('express');
  var path:    any     = require('path');
  var http:    any     = require('http');
  var querystring: any = require('querystring');
 
  export class App {
    private app: any;

    constructor() {
      this.app = express();
    }
    
    public start(port: number, onstart: () => void): void {
      console.log('[FWP.ROO.APP] Starting server on port: ' + port);
      this.setupTools();
      this.setupModels();
      this.setupRoutes();
      this.app.listen(port, onstart);
    }

    private setupTools(): void {
      Tool.Database.init(function(err) {
        if (err) { console.log('[FWD.ROO.APP] ' + err); }
        else { console.log('[FWP.ROO.APP] Database connection OK'); }
      });
    }

    private setupModels(): void {
      Model.Report.init();
    }

    private setupRoutes(): void {
      this.app.use(this.app.router);
      this.app.use(express.static(path.join(__dirname, '../public')));

      this.app.get('/api/report', FairWebProject.Route.Api.GetReportList);
    }

  }
}


var portNumber = <number>process.env.PORT || 3000; 

(new FairWebProject.App()).start(portNumber, () => {
    console.log('[FWP.ROO.APP] Server started');
});
