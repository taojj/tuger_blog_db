load('./emails/time.js');


var pages_array = [4,5,6,7,8,9,10,11,12,13,14];

var count = 0;


//按照页面数遍历
pages_array.forEach(function(page_index){

	//cretina
	var start = new Date("2006-01-16  23:21:12");//第4页开始
	var end = new Date("2007-01-12  11:18:19");//第16页结束，2006全年部分

	var query = {
		"page_index":page_index,
		"meta.created_at":{"$gte":start,"$lte":end},
		"user_name":{"$nin":["目光呆滞的润土","目光呆滞的小军"]}

	};

	var sort = {
		"meta.created_at":1
	}


	//query,obj,upsert,multi
	var page = db.pages.find(query).sort(sort);
	while (page.hasNext()){
		count++;
		var temp = page.next();
		var result = {
			"uname_in_bbs":temp['user_name'],
			"email":temp['content'],
			"email_2":"",
			"email_3":"",
			"qq":0,
			"label":[],
			"tags":[],
			"intro":"",
			"show_mail_time":date2day(temp['meta']['created_at'])
		};
		printjson(result);
		printjson(',');

	};//end while


	//show results

});

printjson(count);//3573
/*

mongo 127.0.0.1/tuger_blog emails/get_from_mongo.js > emails/p4_14.json
4_14,3573条

*/









