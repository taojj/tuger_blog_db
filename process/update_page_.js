load ('./process/read_para_.js');

/*
read_para:
从手动处理后的json读取相关字段，返回下一道工序所需的参数
update_page:
将手动更改后的json数据，更新到原页面中
*/

//读取json文件
var paras = read_json_array();

//遍历array
paras.forEach(function(page){

	//1.更新page
	//update_page(page);

	//2.检查page
	check_page(page);
	

});



//update_page 
function update_page(page){

	var created_at_day = page['created_at'];
	var created_at_date = new Date(created_at_day);

	var key = page['key'];
	var subject = page['subject'];
	var group = page['group'];
	
	if (key=="p" && subject!=null){//post

		var value_post = {
			//"content":page['content'],
			"subject":page['subject'],
			"key":page['key'],
			"degree":page['degree']
		};

		//printjson(value_post);
		db.pages.update({"created_at.date":created_at_date},{"$set":value_post});	
		if (page['content']){
			db.pages.update({"created_at.date":created_at_date},{"$set":{"content":page['content']}});
		}


	} else { // q a r c

		if (group != null && key != "p"){

			var value_a = {
				"content":page['content'],
				"group":page['group'],
				"key":key,
				"degree":page['degree']
			};

			//更新当下的A的group属性			"group":{"pair":"","parent":""},
			//printjson(value_a);
			db.pages.update({"created_at.date":created_at_date},{"$set":value_a});


			//更新对应Q的group属性  "group":{"pair":"","parent":""},
			var pair = group['pair'];//Question的day

			var value_q = {
				"group":{
					"pair":created_at_day,//Answer的day
					"parent":page['group']['parent']
				},
				"key":key,
				"degree":6.2
			}
			if (pair != ""){
				db.pages.update({"created_at.day":pair},{"$set":value_q});
				//printjson(value_q);				
			}

		};
	}//end-if key

}

function check_page(page){
	var created_at_day = page['created_at'];
	var p_new = db.pages.find({"created_at.day":created_at_day});
	while(p_new.hasNext()){
		var temp = p_new.next();
		var subject = temp['subject'];
		var key = temp['key'];
		if (key == "a"){
			//printjson(temp);
			//db.pages.update({"created_at.day":created_at_day},{"$unset":{"subject":1}});
			//db.pages.update({"created_at.day":created_at_day},{"$unset":{"pair":1}});
		};
		if (key == "p"){
			printjson(temp);			
		}

	}
}


/*

{ "_id" : ObjectId("5426c5a43232acbf03b77c4d"), 
"content" : "润土大哥危险了！！！　　　　小弟夜观天象，大哥本命大劫已现　　　　身边的得力之人将弃大哥而去，惊天陷阱将困住大哥　　　　大哥慎重！", 
"__v" : 0, 
"degree" : 6.2, 
"page" : { "page_id" : 14138, "floor_id" : 1438, "page_num" : 14 }, 
"author" : { "id" : "9670505", "name" : "年轻的东方朔" }, 
"created_at" : { "date" : ISODate("2006-11-16T03:35:53Z"), "day" : "2006-11-16  11:35:53" }, 
"group" : { "pair" : "2006-11-16  12:38:51", "parent" : "2006-11-13  11:37:02" }, 
"key" : "q" }



{ "_id" : ObjectId("5426c5a43232acbf03b77c4f"), 
"content" : "作者：年轻的东方朔　回复日期：2006-11-16　11:35:53　   　　　　润土大哥危险了！！！　　　　　　　　小弟夜观天象，大哥本命大劫已现　　　　　　　　身边的得力之人将弃大哥而去，惊天陷阱将困住大哥　　　　　　　　大哥慎重！　　--------------------------------------------------　　谢谢各位朋友的关心，周二晚上小军主笔写完两位朋友的悼词后，我俩去洗澡休息，感慨万千，周三我们送走了至亲的朋友，小军的悼词非常感人，许多亲朋好友说是参加许多丧礼以来最好的悼词，是啊，只有最亲最爱的人，才能写出感人的悼词啊。　　　　下面即将进入公司的资产清算期，许多朋友看我跟缪总的关系，以为我也深陷债务的清理，但我告诉他们我与公司没有金钱利益关系时，他们惊讶了。其实，我觉得君子之交谈如水比较好，朋友困难的时候，给予力所能及的帮助是最好的，从公司的成立之初，我就没有想在缪总这里得到什么利益，即使缪总多次说过可以把小的风险小的投资业务送给我做，我也知道这样我可以每年赚十几万元，可是我却一直没有去做，没有去贪这十几万的金钱。", 
"__v" : 0, 
"degree" : 6.2, 
"page" : { "page_id" : 14140, "floor_id" : 1440, "page_num" : 14 }, 
"author" : { "id" : "4117241", "name" : "目光呆滞的润土" }, 
"created_at" : { "date" : ISODate("2006-11-16T04:38:51Z"), "day" : "2006-11-16  12:38:51" }, 
"key" : "a", 
"group" : { "pair" : "2006-11-16  11:35:53", "parent" : "2006-11-13  11:37:02" } }


*/


