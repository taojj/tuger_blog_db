
/*
print_json:
按照指定条件，从数据库中读取原始page数据，输出到json文件，进行手动处理
query(page_array,start,end).sort({"created_at.date":1})

*/


load('./process/time.js');

/*
var pages_array = [12,13,14,15];//风云外传
var start = new Date("2006-09-04  11:07:19");//风云外传，第4页开始
var end = new Date("2006-12-12  09:37:41");//第16页结束，2006全年部分
*/

var pages_array = [1,2,3];//风云自传
var start = new Date("2005-10-22  10:06:00");//第1页开始
var end = new Date("2005-12-31  23:20:21");//第3页结束,2005全年
var count = 0;



//按照页面数遍历
pages_array.forEach(function(page_num){

	var query = {
		//"author.name":{"$in":["目光呆滞的润土","目光呆滞的小军"]},
		"created_at.date":{"$gte":start,"$lte":end},
		"page.page_num":page_num

	};

	var sort = {
		"created_at.date":1
	};

	var p = db.pages.find(query).sort(sort);
	while (p.hasNext()){
		var temp = p.next();
		var subject = temp['subject'];

		if (!subject){
			subject = {
				"title":"",
				"subtitle":"",
				"categories":[""],
				"keywords":[],
				"intro":"",
				"published_at":{"day":temp['created_at']['day']},
				"para_refs":[
					{"key":"p","day":temp['created_at']['day']},//自己
					{"key":"a","day":""},
					{"key":"q","day":""}
				],
				"order":1
			};

		}

		var result = {
			"author":temp['author']['name'],
			"created_at":temp['created_at']['day'],
			"subject":subject,
			"content":temp['content'],
			"tags":temp['tags']?temp['tags']:[],
			"group":temp['group']?temp['group']:{
				"pair":"",
				"parent":""
			},
			"key":temp['key']?temp['key']:"p",
			"degree":temp['degree']?temp['degree']:6.3

		};

		printjson(result);

	};

});


