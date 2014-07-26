$( document ).ready(function() {
  $.get( "api/report", function( data ) {
    data.forEach(function(report) {
      $("#timeline").append('<h3>'+report.reported+' offended people</h3><blockquote class="twitter-tweet"><a href="https://twitter.com/'+report['offensiveUser.userId']+'/statuses/'+report['offensiveUser.statusId']+'">View on Twitter</a></blockquote><hr>');
    });
    twttr.widgets.load();
  });
});
