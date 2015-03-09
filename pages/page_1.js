
//1.加载json文件
var load_sample = [

	//正文body
	{

		//sort
		"label":"post",//subject = post
		"key":"b",//body

		//timestamp
		"self":"2007-01-09  17:07:43",//=body timestamp
		"pair":"2007-01-09  17:07:43",//=question timestamp? : null
		"parent":"2007-01-09  17:07:43",//=body timestamp

		//addons
		"info":{
			//to b/q/a
			"title":"",
			"tags":["","",""],
			"desc":"",

			//to r(email)
			"uname_in_bbs":"",
			"email":"",
			"email_2":"",
			"qq":0,
			"show_mail_time":"",
			"label":[],
			"intro":""

		}

	},

	//问题q
	{
		//sort
		"label":"topic",//subject = topic
		"key":"q",//question

		//timestamp
		"self":"2007-01-09  17:07:43",//=question timestamp
		"pair":"2007-01-09  17:07:43",//=post/answer timestamp
		"parent":"2007-01-09  17:07:43",//=answer timestamp

		//addons
		"info":{
			//to b/q/a
			"title":"",
			"tags":["","",""],
			"desc":"",
			
			//to r(email)
			"uname_in_bbs":"",
			"email":"",
			"email_2":"",
			"qq":0,
			"show_mail_time":"",
			"label":[],
			"intro":""
	},
	//答复a
	{
		//sort
		"label":"topic",//subject = topic
		"key":"a",//answer

		//timestamp
		"self":"2007-01-09  17:07:43",//=answer timestamp
		"pair":"2007-01-09  17:07:43",//=question timestamp
		"parent":"2007-01-09  17:07:43",//subject myself? self timestamp

		//addons
		"info":{
			//to b/q/a
			"title":"",
			"tags":["","",""],
			"desc":"",
			
		}
	},
	//评论r
	{
		//sort
		"label":"topic",//subject = topic
		"key":"r",//review

		//timestamp
		"self":"2007-01-09  17:07:43",//=review timestamp
		"pair":"2007-01-09  17:07:43",//=answer timestamp
		"parent":"2007-01-09  17:07:43",//answer timestamp

		//addons
		"info":{
			//to b/q/a
			"title":"",
			"tags":["","",""],
			"desc":"",
			
			//to r(email)
			"uname_in_bbs":"",
			"email":"",
			"email_2":"",
			"qq":0,
			"show_mail_time":"",
			"label":[],
			"intro":""
	},

	//一般留言（无主题指向）c
	{
		//sort
		"label":"page_remain",//subject = page_remain
		"key":"c",//comment

		//timestamp
		"self":"2007-01-09  17:07:43",//=comment timestamp
		"pair":"",//=null
		"parent":"",//page_index

		//addons
		"info":{
			//to b/q/a
			"title":"",
			"tags":["","",""],
			"desc":"",
			
			//to r(email)
			"uname_in_bbs":"",
			"email":"",
			"email_2":"",
			"qq":0,
			"show_mail_time":"",
			"label":[],
			"intro":""
	}

];


//prepare
/*
> db.pages.update({},{"$unset":{"belongs_to_ship":1}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.pages.update({},{"$unset":{"belongs_to_ship":1}},{multi:true})
WriteResult({ "nMatched" : 43234, "nUpserted" : 0, "nModified" : 43233 })
>

> db.pages.find({"key":"e"}).count()
313
> db.pages.update({"key":"e"},{"$set":{"key":"r"}},{multi:true})
WriteResult({ "nMatched" : 313, "nUpserted" : 0, "nModified" : 313 })
>


*/

var page_index = 16;

//2.forEach遍历
load_sample.forEach(function(input) {

	var key = input['key'];
	var title = input['info']['title'];
	var tags = input['tags'];
	var pair = input['pair'];

	//find parent page_id according to parent_timestamp
	var parent = new Date(input['parent']);
	var parent_id = 0;
	var p = db.pages.find({"meta.created_at":parent});
	while (p.hasNext()){
		var temp = p.next();
		parent_id = temp['page_id'];

		printjson(parent_id);
	}

	//find pair page_id according to self_timestamp
  var pair = new Date(input['pair']);
	var pair_id = 0;
	var s = db.pages.find({"meta.created_at":pair});
	while (s.hasNext()){
		var temp = s.next();
		pair_id = temp['page_id'];

		printjson(pair_id);
	}

	//exists?
	var self_d = new Date(input['self']);
	var page = db.pages.find({{"page_index":page_index,"meta.created_at":self_d}});//"page_index":page_index,

	while (page.hasNext()){

		var temp = page.next();
		var self_id = temp['page_id'];
		printjson(temp['page_id']);


		//update

		//2.1 if key=="q"  do "key":"q","parent":{"timestamp":"","page_id":16030},
		if (key == "q") {//question
			db.pages.update({"page_index":page_index,"meta.created_at":self_d},{"$set":{"key":"q","parent":{"timestamp":parent,"page_id":parent_id},"pair":{"timestamp":pair,"page_id":pair_id},"tags":tags}});
			db.pages.update({"page_index":page_index,"meta.created_at":self_d},{"$set":{"degree":6}});
			//printjson();
		
		//2.2 if key=="a"  do	"key":"a","parent":{"timestamp":"","page_id":16030},"tags":["思辨篇","",""],"subject_id":"timestamp"
		} else if (key == "a") {//answer
			db.pages.update({"page_index":page_index,"meta.created_at":self_d},{"$set":{"key":"a","parent":{"timestamp":parent,"page_id":parent_id},"pair":{"timestamp":pair,"page_id":pair_id},"tags":tags,"title":title,"degree":5,"subject_id":parent}});
			printjson();
		

		//2.3 if key=="r"  do			"key":"r",		"parent":{"timestamp":"","page_id":16030},
		} else if (key == "r") {//review
			db.pages.update({"page_index":page_index,"meta.created_at":self_d},{"$set":{"key":"r","parent":{"timestamp":parent,"page_id":parent_id},"pair":{"timestamp":pair,"page_id":pair_id},"tags":tags});
			db.pages.update({"page_index":page_index,"meta.created_at":self_d},{"$set":{"degree":6}});
			printjson();
		

		//2.4 if key=="c"  do			"key":"cp","parent":{"page_index":16,"page_id":16030},"tags":["思辨篇","",""]
		} else if (key=="c"){//c_to_page
			db.pages.update({"page_index":page_index,"meta.created_at":self_d},{"$set":{"key":"c","parent":{"page_index":page_index,"page_id":self_id},"tags":tags}});
			db.pages.update({"page_index":page_index,"meta.created_at":self_d},{"set":{"degree":7}});
		  printjson();

		//2.5 if key=="e" do     
		} else if (key=="e") {

		}


	};


});


//3.output
var output_sample = [


//1-土迷提问Question
	{
		//remain as before
		"content":"",
		"user_id":"",
		"user_name":"",
		"page_id":16001,
		"floor_id":1501,
		"page_index":16,
		"meta":{"created_at":"date"},
		//remove/unset field
		"degree":6,//纬度属性
		//set new field
		"key":"q",
		"pair":{"timestamp":"","page_id":16035},
		"parent":{"timestamp":"","page_id":16030},
		"tags":["思辨篇","姑苏烟",""],
		//:暂无subject_id,但日后subject与回应answer采用相同timestamp
		//"subject_id":"timestamp"
	},

//2-润土回复a
	{
		//remain as before
		"content":"",
		"user_id":"",
		"user_name":"",
		"page_id":16001,
		"floor_id":1501,
		"page_index":16,
		"meta":{"created_at":"date"},

		//update field
		"degree":5,//5五级分类关系,延续category

		//set new field
		"key":"a",
		"pair":{"timestamp":"","page_id":16022},
		"parent":{"timestamp":"","page_id":16030},
		"tags":["思辨篇","",""],
		"title":"《时机》",
		//:[optional]subject_id,但日后subject与回应answer采用相同timestamp
		"subject_id":"timestamp"
	},



//3-相关评论和跟进r

	{
		//remain as before
		"content":"",
		"user_id":"",
		"user_name":"",
		"page_id":16001,
		"floor_id":1501,
		"page_index":16,
		"meta":{"created_at":"date"},

		//remove/unset field
		"degree":6,//纬度属性,先设置上

		//set new field
		"key":"r",
		"pair":{"timestamp":"","page_id":16022},
		"parent":{"timestamp":"","page_id":16030},
		"tags":["思辨篇","奇怪的梦",""],
		//:暂无subject_id,但日后subject与回应answer采用相同timestamp
		//"subject_id":"timestamp"
	},

//4-无主题指向的一般留言c

	{
		//remain as before
		"content":"",
		"user_id":"",
		"user_name":"",
		"page_id":16001,
		"floor_id":1501,
		"page_index":16,
		"meta":{"created_at":"date"},
		//remove/unset field
		"degree":7,//无纬度属性
		//set new field
		"key":"cp",//一般留言,page相关即可
		"parent":{"page_index":16,"page_id":16030},//current page_id
		"tags":["思辨篇","",""]//提出关键词，热词，便于日后检索
		//:暂无subject_id,但日后subject与回应answer采用相同timestamp
		//"subject_id":"timestamp"
	}

//5-提供email信息(e)

	{
		//remain as before
		"content":"",
		"user_id":"",
		"user_name":"",
		"page_id":16001,
		"floor_id":1501,
		"page_index":16,
		"meta":{"created_at":"date"},
		//remove/unset field
		"degree":6,//纬度属性
		//set new field
		"key":"e",//email
		"pair":{"timestamp":"","page_id":16022},
		"parent":{"timestamp":"","page_id":16030},
		"info":{
			"email":"",
			"email_2":"",
			"qq":"",
			"born_in_date":{"date":"ISODate","day":"timestamp"},
			"label":["软件行业","IT创业"],
			"intro":""
		}

	}

];

//后续在优化调整数据结构





