
var sample = [
	{
		"year":2005,
		"page":{"start":2,"end":20},
		"day":{"start":"2005-01-01  11:00:01","end":"2005-12-31 23:59:59"}
	},

];

var years = [
	{
		"year":2005,
		"day":{"start":"2005-01-01  00:00:00","end":"2005-12-31 23:59:59"}
	},
	{
		"year":2006,
		"day":{"start":"2006-01-01  00:00:00","end":"2006-12-31 23:59:59"}
	},
	{
		"year":2007,
		"day":{"start":"2007-01-01  00:00:00","end":"2007-12-31 23:59:59"}
	},
	{
		"year":2008,
		"day":{"start":"2008-01-01  00:00:00","end":"2008-12-31 23:59:59"}
	},	
	{
		"year":2009,
		"day":{"start":"2009-01-01  00:00:00","end":"2009-12-31 23:59:59"}
	},
	{
		"year":2010,
		"day":{"start":"2010-01-01  00:00:00","end":"2010-12-31 23:59:59"}
	},
	{
		"year":2011,
		"day":{"start":"2011-01-01  00:00:00","end":"2011-12-31 23:59:59"}
	},
	{
		"year":2012,
		"day":{"start":"2012-01-01  00:00:00","end":"2012-12-31 23:59:59"}
	},
	{
		"year":2013,
		"day":{"start":"2013-01-01  00:00:00","end":"2013-12-31 23:59:59"}
	},
	{
		"year":2014,
		"day":{"start":"2014-01-01  00:00:00","end":"2014-12-31 23:59:59"}
	},
	{
		"year":2015,
		"day":{"start":"2015-01-01  00:00:00","end":"2015-12-31 23:59:59"}
	}

];



var pages = [];
years.forEach(function(year){
	var query = {
		"created_at.date":{"$gte":new Date(year['day']['start']),"$lte":new Date(year['day']['end'])}
	};
	var sort = {
		"created_at.date":1
	}
	var p = db.pages.find(query).sort(sort);

	var days = [];
	var page_nums = [];
	while(p.hasNext()){
		var temp = p.next();
		//printjson(temp);
		var day = temp['created_at']['day'];
		days.push(day);

		var page_num = temp['page']['page_num'];
		page_nums.push(page_num);

	};

	var year_current = {
		"year":year['year'],
		"day":{"start":days[0],"end":days[days.length-1]},
		"page":{"start":page_nums[0],"end":page_nums[page_nums.length-1]},
		"count":days.length
	};
	pages.push(year_current);


});

printjson(pages);

var out_sample = [
	{
		"year" : 2005,
		"day" : {
			"start" : "2005-10-22  10:06:00",
			"end" : "2005-12-31  23:20:21"
		},
		"page" : {
			"start" : 1,
			"end" : 3
		},
		"count" : 989
	},
	{
		"year" : 2006,
		"day" : {
			"start" : "2006-01-01  09:47:43",
			"end" : "2006-12-31  20:19:25"
		},
		"page" : {
			"start" : 3,
			"end" : 16
		},
		"count" : 4714
	},
	{
		"year" : 2007,
		"day" : {
			"start" : "2007-01-01  06:46:28",
			"end" : "2007-12-31  22:37:25"
		},
		"page" : {
			"start" : 16,
			"end" : 30
		},
		"count" : 5065
	},
	{
		"year" : 2008,
		"day" : {
			"start" : "2008-01-01  01:11:32",
			"end" : "2008-12-31  23:53:23"
		},
		"page" : {
			"start" : 30,
			"end" : 60
		},
		"count" : 5499
	},
	{
		"year" : 2009,
		"day" : {
			"start" : "2009-01-01  01:51:45",
			"end" : "2009-12-31  23:30:26"
		},
		"page" : {
			"start" : 60,
			"end" : 115
		},
		"count" : 7081
	},
	{
		"year" : 2010,
		"day" : {
			"start" : "2010-01-01  00:00:44",
			"end" : "2010-12-31  22:17:03"
		},
		"page" : {
			"start" : 115,
			"end" : 177
		},
		"count" : 5469
	},
	{
		"year" : 2011,
		"day" : {
			"start" : "2011-01-01  00:10:16",
			"end" : "2011-12-31  23:32:00"
		},
		"page" : {
			"start" : 177,
			"end" : 232
		},
		"count" : 4548
	},
	{
		"year" : 2012,
		"day" : {
			"start" : "2012-01-01  00:16:05",
			"end" : "2012-12-31  23:47:21"
		},
		"page" : {
			"start" : 232,
			"end" : 276
		},
		"count" : 3621
	},
	{
		"year" : 2013,
		"day" : {
			"start" : "2013-01-01  00:25:51",
			"end" : "2013-12-31  22:53:14"
		},
		"page" : {
			"start" : 276,
			"end" : 312
		},
		"count" : 3229
	},
	{
		"year" : 2014,
		"day" : {
			"start" : "2014-01-01  00:03:27",
			"end" : "2014-12-31  23:37:44"
		},
		"page" : {
			"start" : 312,
			"end" : 347
		},
		"count" : 2735
	},
	{
		"year" : 2015,
		"day" : {
			"start" : "2015-01-01  07:14:12",
			"end" : "2015-03-04  11:55:19"
		},
		"page" : {
			"start" : 347,
			"end" : 350
		},
		"count" : 289
	}
];




