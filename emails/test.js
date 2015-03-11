load ('./emails/time.js');
var json = load('./users/email_001.json');
var now = now2timestamp();



var timestamp = "2005-11-16  10:19:42";
var d = day2date(timestamp);
var timestamp_new = date2day(d);
printjson(timestamp);
printjson(d);
printjson(timestamp_new);
printjson(json);

