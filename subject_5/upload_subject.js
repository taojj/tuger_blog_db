

load ('./subject_5/time.js');
/*

{ "_id" : ObjectId("54f7f0b274616f129f000000"), 
"subject_id" : 1, 
"title" : "[风云]", 
"subtitle" : "——", 
"introduction" : "引言：", 
"author_id" : 4117241, 
"author_name" : "润土 | 稚一 | 小军", 
"published_at" : ISODate("2015-03-05T05:59:14.579Z"), 
"body" : "...", "body_html" : "...", 
"categories" : [ ], 
"tags" : [ ],
"questions" : [ ], 
"reviews" : [ ], 
"comments" : [ ], 
"attachments" : [ ], 
"status" : 0, 
"page_index" : 1, 
"archive_in_year" : 2005, 
"meta" : { "created_at" : ISODate("2015-03-05T05:59:14.582Z"), "updated_at" : ISODate("2015-03-05T05:59:14.582Z") }, 
"isHidden" : false, 
"labels" : 1 }


*/


var collection = "风云外传";
var chapter = "卖瓷砖篇";

var chapter_array = ["缘起篇","机关篇","服装篇","贸易公司篇","游乐场篇","卖瓷砖篇","广告篇","金融篇"];//,"现状篇"
var id = 1;
chapter_array.forEach(function(chapter) {


	//匹配数组
	var p = db.pages.find({"subject.tags":{"$all":[collection,chapter]}}).sort({"created_at.date":1});

	while(p.hasNext()){
		var temp = p.next();
		
		/*
		var result = {
			"author":temp['author']['name'],
			"created_at":temp['created_at']['day'],
			"title": temp['subject']['title'],
			"tags":temp['subject']['tags'],
			"intro":temp['subject']['intro'],
			"page":temp['page'],
			"order":temp['subject']['order']
		};
		*/


		var key = temp['key'];
		var degree = temp['degree'];

		var subject = temp['subject'];
		var title = subject['title'];
		var subtitle = subject['subtitle']?("——"+subject['subtitle']):("——"+subject['title']);
		var tags = subject['tags'];
		var intro = subject['intro'];
		var author = temp['author'];
		var created_at = temp['created_at'];
		var archived_at_date = temp['created_at']['date'];
		var archived_at_day = date2day2(created_at['date']);
		var content = temp['content'];
		var order = subject['order'];

		var page_id = temp['page']['page_id'];
		var para_day = temp['created_at']['day'];


		var value = {

			"subject_id":"fywz_"+(id++),//主题id
			"title":title,//标题
			"subtitle":subtitle,//副标题

			"author":author,//作者
			"created_at":created_at,//时间戳

			"label":"post",//主题分类：博文，话题，其他
			"order":order,//篇章系列号
			"keywords":tags,//关键词   ["风云外传","金融篇"],//目录
			"categories":[//目录属性
				{"id":1,"name":collection},//一级专题
				{"id":2,"name":chapter}//二级专题
			],
			"intro":intro,//引言描述
			"body":content,//正文内容

			"para_refs":[
				{"para_id":page_id,"created_at_day":para_day,"key":key}//self
			],//包含有哪些paragraph段落

			//"questions":[], 
			//"answers":[],
			//"reviews":[], 
			//"comments":[], 
			//"attachments":[], 

			//edit
			"status":0,//状态：草稿0，发布1，删除2，回收站3
			"archived_at":{"date":archived_at_date ,"day":archived_at_day},//归档日期
			"isHidden" : false


			//votes

		};

		if (key == "p" && degree == 6.1){//针对post进行操作
			db.subjects.insert(value);
			//printjson(value);
		};

		/*
		//
		if (key == "a" && degree == 6.2){
			//
		}
		*/


	};


});//end - forEach


/*

var subject_sample = {

	"subject_id":1,//主题id
	"title":"",//标题
	"subtitle":"——"+"",//副标题

	"author":{"id":"","name":""},//作者
	"created_at":{"date":"","day":""},//时间戳

	"label":"post",//主题分类：博文，话题，其他
	"keywords":temp['tags'],//关键词   ["风云外传","金融篇"],//目录
	"categories":[//目录属性
		{"id":1,"name":"风云外传"},//一级专题
		{"id":2,"name":"金融篇"}//二级专题
	],
	"intro":"",//引言描述
	"body":"",
	"para_refs":[
		{"page_id":111,"created_at_day":""}
	],//包含有哪些paragraph段落
	"questions":[], 
	"reviews":[], 
	"comments":[], 
	"attachments":[], 

	//edit
	"status":0,//状态：草稿0，发布1，删除2，回收站3
	"archived_at":{"date":"","day":"2005-02-08"}//归档日期
	"isHidden" : false


	//votes

};
*/




