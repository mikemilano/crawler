#!/usr/bin/env node

var Crawler = require('crawler');
var s = process.argv[2];

if (s == undefined) {
  console.log('Usage: ./crawl.js [search]');
  process.exit();
}

var c = new Crawler({
  maxConnections: 1,
  rateLimits: 1000,
  callback: function(err, result, $) {
    console.log(result.uri);
    $('a').each(function(index, a) {
      var toQueueUrl = $(a).attr('href');
      c.queue(toQueueUrl);
    });
  }
});

c.queue('https://www.google.com/#safe=off&q=' + s);

