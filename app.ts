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
      console.log('Starting server on port: ' + port);
      this.setupRoutes();
      this.app.listen(port, onstart);
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
    console.log('Server started');
});
