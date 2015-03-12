
load('./subject_5/time.js');
var count = 0;
var p = db.pages.find({"created_at.day":{"$exists":true},"page.page_num":270}).sort({"created_at.date":1});//db.pages.find({"created_at.day":{"$in":["",null]}});//
while (p.hasNext()){
	count++;
	var temp = p.next();
	var date = temp['created_at']['date'];
	var day = date2day(date);
	var value = {
		"date":date,
		"day":day
	};
	printjson({"page":temp['page']['page_id'],"created_at":{"date":date,"day":day,"o_day":temp['created_at']['day']}});
//printjson({"page":temp['page']['page_id'],"created_at":{"date":date,"day":temp['created_at']['day']}});
//printjson(temp);
	//db.pages.update({"created_at.date":date},{"$set":{"created_at":value}});

};

printjson(count);



/*
log



mongo 127.0.0.1/tuger_blog emails/get_from_mongo.js > emails/p4_14.json
4_14,3573条

db.pages.update({},{"$rename":{"page_id":"page.page_id","floor_id":"page.floor_id","page_index":"page.page_num"}},{multi:true})
WriteResult({ "nMatched" : 43241, "nUpserted" : 0, "nModified" : 43241 })
> db.pages.find().count()
43241
db.pages.update({},{"$rename":{"user_id":"author.id","user_name":"author.name"}},{multi:true});
WriteResult({ "nMatched" : 43241, "nUpserted" : 0, "nModified" : 43241 })
db.pages.update({},{"$rename":{"meta.created_at":"created_at.date"}},{multi:true});
WriteResult({ "nMatched" : 43241, "nUpserted" : 0, "nModified" : 43241 })
db.pages.update({},{"$rename":{"meta":"subject"}},{multi:true});
WriteResult({ "nMatched" : 43241, "nUpserted" : 0, "nModified" : 43241 })




db.pages.update({},{"$rename":{"user_id":"author.id","user_name":"author.name"}},{multi:true});
db.pages.update({},{"$rename":{"meta.created_at":"created_at.date"}},{multi:true});
db.pages.update({},{"$rename":{"meta":"subject"}},{multi:true});


db.pages.find({"day":{"$exists":true}}).count()
35454
> db.pages.find({"subject":{"$ne":{}}}).count()
10675
> db.pages.find({"subject":{"$ne":{}}}).count()
10675
> db.pages.find({"subject":{"$ne":{}}}).count()
10675
> db.pages.find({"subject":{"$ne":{}}}).count()
10675
> db.pages.find({"subject":{"$ne":{}}}).count()
10675


db.pages.update({},{"$rename":{"day":"created_at.day"}},{multi:true})
WriteResult({ "nMatched" : 43241, "nUpserted" : 0, "nModified" : 43225 })

db.pages.find({"created_at.day":{"$in":["",null]}}).count()
16



剩下的16个，通过robomongo手动更改，怎么都输不上去
MongoDB shell version: 2.6.8
connecting to: 127.0.0.1/tuger_blog
{
	"page" : 17094,
	"created_at" : {
		"date" : ISODate("2007-01-16T07:23:23Z"),
		"day" : "2007-1-16  15:23:23"
	}
}
{
	"page" : 20263,
	"created_at" : {
		"date" : ISODate("2007-03-22T05:07:21Z"),
		"day" : "2007-3-22  13:7:21"
	}
}
{
	"page" : 23214,
	"created_at" : {
		"date" : ISODate("2007-05-16T12:11:07Z"),
		"day" : "2007-5-16  20:11:7"
	}
}
{
	"page" : 47016,
	"created_at" : {
		"date" : ISODate("2008-08-13T14:48:33Z"),
		"day" : "2008-8-13  22:48:33"
	}
}
{
	"page" : 48013,
	"created_at" : {
		"date" : ISODate("2008-08-26T00:40:28Z"),
		"day" : "2008-8-26  8:40:28"
	}
}
{
	"page" : 61181,
	"created_at" : {
		"date" : ISODate("2009-01-13T16:00:00Z"),
		"day" : "2009-1-14  0:0:0"
	}
}
{
	"page" : 62008,
	"created_at" : {
		"date" : ISODate("2009-01-13T16:00:00Z"),
		"day" : "2009-1-14  0:0:0"
	}
}
{
	"page" : 74106,
	"created_at" : {
		"date" : ISODate("2009-05-09T04:58:18Z"),
		"day" : "2009-5-9  12:58:18"
	}
}
{
	"page" : 88080,
	"created_at" : {
		"date" : ISODate("2009-09-10T02:44:39Z"),
		"day" : "2009-9-10  10:44:39"
	}
}
{
	"page" : 194023,
	"created_at" : {
		"date" : ISODate("2011-04-27T07:36:27Z"),
		"day" : "2011-4-27  15:36:27"
	}
}
{
	"page" : 249048,
	"created_at" : {
		"date" : ISODate("2012-04-25T15:11:15Z"),
		"day" : "2012-4-25  23:11:15"
	}
}
{
	"page" : 300017,
	"created_at" : {
		"date" : ISODate("2013-07-25T06:26:33Z"),
		"day" : "2013-7-25  14:26:33"
	}
}
{
	"page" : 331002,
	"created_at" : {
		"date" : ISODate("2014-07-07T08:44:59Z"),
		"day" : "2014-7-7  16:44:59"
	}
}
{
	"page" : 12132,
	"created_at" : {
		"date" : ISODate("2006-09-05T09:17:53Z"),
		"day" : "2006-9-5  17:17:53"
	}
}
{
	"page" : 12162,
	"created_at" : {
		"date" : ISODate("2006-09-07T08:24:59Z"),
		"day" : "2006-9-7  16:24:59"
	}
}
{
	"page" : 12183,
	"created_at" : {
		"date" : ISODate("2006-09-07T08:24:59Z"),
		"day" : "2006-9-7  16:24:59"
	}
}

{ "_id" : ObjectId("5426cb323232acbf03b8086b"), 
"content" : "好文采", 
"__v" : 0, 
"degree" : 2, 
"page" : { "page_id" : 320011, "floor_id" : 31911, "page_num" : 320 }, 
"author" : { "id" : "80721581", "name" : "孟东藏" }, 
"created_at" : { "date" : ISODate("2014-03-12T23:20:52Z"), "day" : "2014-03-13  07:20:52" } }

>



*/








