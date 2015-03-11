
//1.加载json文件
var load_sample = [

	//正文body
	{

		//sort
		//"label":"post",//主题标记post
		"key":"b",//分类标记body
		"num":1,

		//关联标记
		"self":"2007-01-09  17:07:43",//=body timestamp
		"pair":"2007-01-09  17:07:43",//=question timestamp? : null
		//指向主题
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
		//"label":"topic",//subject = topic
		"key":"q",//question
		"num":1,
		//关联标记
		"self":"2007-01-09  17:07:43",//=question timestamp
		"pair":"2007-01-09  17:07:43",//=post/answer timestamp
		//指向主题
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
		//"label":"topic",//subject = topic
		"key":"a",//answer
		"num":1,
		//关联标记
		"self":"2007-01-09  17:07:43",//=answer timestamp
		"pair":"2007-01-09  17:07:43",//=question timestamp
		//指向主题
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
		//"label":"topic",//subject = topic
		"key":"r",//review
		"num":1,

		//关联标记
		"self":"2007-01-09  17:07:43",//=review timestamp
		"pair":"2007-01-09  17:07:43",//=answer timestamp
		//指向主题
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
		//"label":"page_remain",//subject = page_remain
		"key":"c",//comment
		"num":1,

		//关联标记
		"self":"2007-01-09  17:07:43",//=comment timestamp
		"pair":"",//=null
		"parent":"",//page_index

		//addons
		"info_s":{
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
	"info_u":{
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

db.pages.update({"info":{"$ne":null}},{"$rename":{"info":"user_info"}},{multi:true})
WriteResult({ "nMatched" : 313, "nUpserted" : 0, "nModified" : 313 })


*/




//2.forEach遍历
load_sample.forEach(function(input) {

	//2.1拆解信息
	//1a-sort
	//var label = input['label'];
	var key = input['key'];
	var num = input['num'];

	//2b-pair & pair_id
	var pair = input['pair'];
  var pair_date = new Date(pair);
	var pair_id = 0;
	var pr = db.pages.find({"meta.created_at":pair_date});
	while (pr.hasNext()){
		var temp = pr.next();
		pair_id = temp['page_id'];
		printjson(pair_id);
	}

	//3c-parent & parent_id
	var parent = input['parent'];
	var parent_date = new Date(parent);
	var parent_id = 0;
	var pt = db.pages.find({"meta.created_at":parent_date});
	while (pt.hasNext()){
		var temp = pt.next();
		parent_id = temp['page_id'];
		printjson(parent_id);
	}

	//4d-info_for_subject
	var title = input['info_s']['title'];
	var desc = input['info_s']['desc'];
	var tags = input['info_s']['tags'];

	//5e-into_for_email
	var email = input['info_u']['email'];
	var email_2 = input['info_u']['email_2'];
	var qq = input['info_u']['qq'];
	var uname_in_bbs = input['author'];
	var user_label = input['info_u']['label'];
	var show_mail_time = input['self'];
	var user_intro = input['info_u']['intro'];

	//查询数据
	var self_time = input['self'];
	var self_date = new Date(self_time);
	var page = db.pages.find({{"meta.created_at":self_date}});//"page_index":page_index,

	while (page.hasNext()){

		var temp = page.next();

		//page_id & floor_id
		var page_id = temp['page_id'];
		var floor_id = temp['floor_id'];
		var page_index = temp['page_index'];
		var key_exists = temp['key'];
		var tags_exists = temp['tags'];
		if (tags_exists != null){
			tags_exists.forEach(function(tag){
				tags.push(tag);
			});
		};


		printjson({"page_id":page_id,"floor_id":floor_id,"page_index":page_index,"key":key_exists,"tags":tags});

		/*
		//skip key = "r"
		if (key_exists == null) { //key_exists == null 过滤掉key已经存在

		}//end if - key_exists
		*/

		/*
		//依照key进行分类处理

		//2.1 if key=="b" do post update
		if (key=="b") {

			//"$set":value
			var value1 = {//优化数据结构

				//field - for post
				"post_id":page_id,//暂时还用page_id代替
				"title":title?title:"",
				"desc":desc?desc:"",
				"tags":tags?tags:[],
				//"content_html":"",
				"published_at":{"date":self_date,"day":self_time},

				//sort
				"label":"post",
				"key":"b",
				"sequence":{
					"num":num?num:0,
					"date":self_date,
					"floor_id":floor_id,
					"page_num":page_index
				},

				//pair - parent
				"pair":{//=previous
					"timestamp":pair,
					"pair_id":pair_id
				},
				"parent":{//=subject
					"timestamp":parent,
					"parent_id":parent_id
				},

				"degree":6.1
			};

			//"$unset":
			var value2 = {
				"floor_id":1,
				"page_id":1
				"page_index":1,
				"meta.created_at":1
			};

			//printjson();

			db.pages.update({"meta.created_at":self_date},{"$set":value1});
			//db.pages.update({"meta.created_at":self_date},{"$unset":value2});

		}

		//2.2 if key=="q"  do  update topic:question
		} else if (key == "q") {//question

			var value1 = {
				//field - for topic
				"question_id":page_id,//暂时还用page_id代替
				"title":title?title:"",
				"desc":desc?desc:"",
				"tags":tags?tags:[],
				//"content_html":"",
				"published_at":{"date":self_date,"day":self_time},

				//sort
				"label":"topic",
				"key":"q",
				"sequence":{
					"num":num?num:0,
					"date":self_date,
					"floor_id":floor_id,
					"page_num":page_index
				},

				//pair - parent
				"pair":{//=?post : null
					"timestamp":pair,
					"pair_id":pair_id
				},
				"parent":{//=subject
					"timestamp":parent,
					"parent_id":parent_id
				},

				"degree":6.2
			};

			//"$unset":
			var value2 = {
				"floor_id":1,
				"page_id":1
				"page_index":1,
				"meta.created_at":1
			};

			db.pages.update({"meta.created_at":self_date},{"$set":value1});
			//db.pages.update({"meta.created_at":self_date},{"$unset":value2});

		
		//2.3 if key=="a"  do	 update topic:answer
		} else if (key == "a") {//answer

			var value1 = {
				//field - for topic
				"answer_id":page_id,//暂时还用page_id代替
				"title":title?title:"",
				"desc":desc?desc:"",
				"tags":tags?tags:[],
				//"content_html":"",
				"published_at":{"date":self_date,"day":self_time},

				//sort
				"label":"topic",
				"key":"a",
				"sequence":{
					"num":num?num:0,
					"date":self_date,
					"floor_id":floor_id,
					"page_num":page_index
				},

				//pair - parent
				"pair":{//=?question : null
					"timestamp":pair,
					"pair_id":pair_id
				},
				"parent":{//=subject
					"timestamp":parent,
					"parent_id":parent_id
				},

				"degree":6.2
			};

			//"$unset":
			var value2 = {
				"floor_id":1,
				"page_id":1
				"page_index":1,
				"meta.created_at":1
			};

			db.pages.update({"meta.created_at":self_date},{"$set":value1});
			//db.pages.update({"meta.created_at":self_date},{"$unset":value2});


		//2.4 if key=="r"  do	 update topic:review
		} else if (key == "r") {//review

			var value1 = {
				//field - for topic
				"review_id":page_id,//暂时还用page_id代替
				"title":title?title:"",
				"desc":desc?desc:"",
				"tags":tags?tags:[],
				//"content_html":"",
				"published_at":{"date":self_date,"day":self_time},

				//sort
				"label":"topic",
				"key":"r",
				"sequence":{
					"num":num?num:0,
					"date":self_date,
					"floor_id":floor_id,
					"page_num":page_index
				},

				//pair - parent
				"pair":{//=?question : null
					"timestamp":pair,
					"pair_id":pair_id
				},
				"parent":{//=subject
					"timestamp":parent,
					"parent_id":parent_id
				},

				"degree":6.2
			};

			//"$unset":
			var value2 = {
				"floor_id":1,
				"page_id":1
				"page_index":1,
				"meta.created_at":1
			};

			db.pages.update({"meta.created_at":self_date},{"$set":value1});
			//db.pages.update({"meta.created_at":self_date},{"$unset":value2});

			//update user_info
			if (email!=""){
				var user_info = {
					"uname_in_bbs":uname_in_bbs,
					"email":email,
					"email_2":email_2,
					"qq":qq,
					"show_mail_time":show_mail_time,
					"label":user_label,
					"intro":user_intro
				};
				db.pages.update({"meta.created_at":self_date},{"$set":{"user_info":user_info}});

				var user_value = {
					"uname_in_bbs":uname_in_bbs,
					"email":email,
					"email_2":email_2,
					"qq":qq,
					"label":user_label,
					"intro":user_intro
				};

				db.users.update(
					{"uname_in_bbs":uname_in_bbs},
					{
						"$set":user_value,
						"$addToSet":{"show_mail_time":show_mail_time}
					}
				);

			};
			//end-if
		

		//2.5 if key=="c"  do	update 
		} else if (key=="c"){//c_to_page

			var value1 = {
				//field - for page_remain
				"comment_id":page_id,//暂时还用page_id代替
				"title":title?title:"",
				"desc":desc?desc:"",
				"tags":tags?tags:[],
				//"content_html":"",
				"published_at":{"date":self_date,"day":self_time},

				//sort
				"label":"page_remain",
				"key":"c",
				"sequence":{
					"num":num?num:0,
					"date":self_date,
					"floor_id":floor_id,
					"page_num":page_index
				},

				//pair - parent
				"pair":{//=?question : null
					"timestamp":pair,
					"pair_id":pair_id
				},
				"parent":{//=subject
					"page_num":page_index,
					"timestamp":parent,
					"parent_id":parent_id
				},

				"degree":6.3
			};

			//"$unset":
			var value2 = {
				"floor_id":1,
				"page_id":1
				"page_index":1,
				"meta.created_at":1
			};

			db.pages.update({"meta.created_at":self_date},{"$set":value1});
			//db.pages.update({"meta.created_at":self_date},{"$unset":value2});

			
			//update user_info
			if (email&&uname_in_bbs&&show_mail_time){
				var user_info = {
					"uname_in_bbs":uname_in_bbs,
					"email":email,
					"email_2":email_2,
					"qq":qq,
					"show_mail_time":show_mail_time,
					"label":user_label,
					"intro":user_intro
				};
				db.pages.update({"meta.created_at":self_date},{"$set":{"user_info":user_info}});

				var user_value = {
					"uname_in_bbs":uname_in_bbs,
					"email":email,
					"email_2":email_2,
					"qq":qq,
					"label":user_label,
					"intro":user_intro
				};

				db.users.update(
					{"uname_in_bbs":uname_in_bbs},
					{
						"$set":user_value,
						"$addToSet":{"show_mail_time":show_mail_time}
					}
				);

			};//end-if email


		};//end-if key
		//2.7

		*/


	};//end - while has next()


});//end - forEach


//3.output
var output_sample = [

//1-段落正文Post

	{

		//field remain as before
		"user_id":"",
		"user_name":"",
		"content":"",

		//field - for post
		"post_id":page_id,//暂时还用page_id代替
		"title":title?title:"",
		"desc":desc?desc:"",
		"tags":tags?tags:[],
		//"content_html":"",
		"published_at":{"date":self_date,"day":self_time},

		//sort
		"label":"post",
		"key":"b",
		"sequence":{
			"num":num?num:0,
			"date":self_date,
			"floor_id":floor_id,
			"page_num":page_index
		},

		//pair - parent
		"pair":{//=previous
			"timestamp":pair,
			"pair_id":pair_id
		},
		"parent":{//=subject
			"timestamp":parent,
			"parent_id":parent_id
		},

		"degree":6.1//纬度默认


	},

//1-土迷提问Question
	{
		//field remain as before
		"user_id":"",
		"user_name":"",
		"content":"",

		//field - for topic
		"question_id":page_id,//暂时还用page_id代替
		"title":title?title:"",
		"desc":desc?desc:"",
		"tags":tags?tags:[],
		//"content_html":"",
		"published_at":{"date":self_date,"day":self_time},

		//sort
		"label":"topic",
		"key":"q",
		"sequence":{
			"num":num?num:0,
			"date":self_date,
			"floor_id":floor_id,
			"page_num":page_index
		},

		//pair - parent
		"pair":{//=?post : null
			"timestamp":pair,
			"pair_id":pair_id
		},
		"parent":{//=subject
			"timestamp":parent,
			"parent_id":parent_id
		},

		"degree":6.2

	},

//2-润土回复a
	{
		//remain as before
		"content":"",
		"user_id":"",
		"user_name":"",

		//field - for topic
		"answer_id":page_id,//暂时还用page_id代替
		"title":title?title:"",
		"desc":desc?desc:"",
		"tags":tags?tags:[],
		//"content_html":"",
		"published_at":{"date":self_date,"day":self_time},

		//sort
		"label":"topic",
		"key":"a",
		"sequence":{
			"num":num?num:0,
			"date":self_date,
			"floor_id":floor_id,
			"page_num":page_index
		},

		//pair - parent
		"pair":{//=?question : null
			"timestamp":pair,
			"pair_id":pair_id
		},
		"parent":{//=subject
			"timestamp":parent,
			"parent_id":parent_id
		},

		"degree":6.2
	},



//3-相关评论和跟进r

	{
		//remain as before
		"content":"",
		"user_id":"",
		"user_name":"",

		//field - for topic
		"review_id":page_id,//暂时还用page_id代替
		"title":title?title:"",
		"desc":desc?desc:"",
		"tags":tags?tags:[],
		//"content_html":"",
		"published_at":{"date":self_date,"day":self_time},

		//sort
		"label":"topic",
		"key":"r",
		"sequence":{
			"num":num?num:0,
			"date":self_date,
			"floor_id":floor_id,
			"page_num":page_index
		},

		//pair - parent
		"pair":{//=?question : null
			"timestamp":pair,
			"pair_id":pair_id
		},
		"parent":{//=subject
			"timestamp":parent,
			"parent_id":parent_id
		},

		"degree":6.2

	},

//4-无主题指向的一般留言c

	{
		//remain as before
		"content":"",
		"user_id":"",
		"user_name":"",



	}

//5-提供email信息(e)

	{
		//remain as before
		"content":"",
		"user_id":"",
		"user_name":"",

		//field - for page_remain
		"comment_id":page_id,//暂时还用page_id代替
		"title":title?title:"",
		"desc":desc?desc:"",
		"tags":tags?tags:[],
		//"content_html":"",
		"published_at":{"date":self_date,"day":self_time},

		//sort
		"label":"page_remain",
		"key":"c",
		"sequence":{
			"num":num?num:0,
			"date":self_date,
			"floor_id":floor_id,
			"page_num":page_index
		},

		//pair - parent
		"pair":{//=?question : null
			"timestamp":pair,
			"pair_id":pair_id
		},
		"parent":{//=subject
			"page_num":page_index,
			"timestamp":parent,
			"parent_id":parent_id
		},


		"user_info":{
			"uname_in_bbs":uname_in_bbs,
			"email":"",
			"email_2":"",
			"qq":"",
			"born_in_date":{"date":"ISODate","day":"timestamp"},
			"label":["软件行业","IT创业"],
			"intro":""
		},


		"degree":6.3



	}

];

//后续在优化调整数据结构





