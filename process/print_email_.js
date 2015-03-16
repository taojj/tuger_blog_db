
/*
将page打印成要提炼email的格式
如果已经整理过，则打印出来
目前已经完成：
第1,2,3页上的email提取(拷贝页面到json），石油篇
var users = [
{"page_num":1,"start":"2005-10-27  11:57:24","end":"2005-11-16  18:43:52"},
{"page_num":2,"start":"2005-11-17  00:10:05","end":"2005-12-19  13:05:59"},
{"page_num":3,"start":"2005-12-19  16:07:36","end":"2006-01-16  22:51:48"},

{"page_num":296,"start":"2013-07-05  02:06:38","end":"2013-11-14  00:18:55"},

];
第296页上的email提取（拷贝字段到json），思维导图
第308页上的email提取（拷贝字段到json）
*/



var pages_array1 = [1,2,3];
var pages_array = [4,5,6,7,8,9,10,11,12,13,14,15,16];//4-16页上的email更新掉


pages_array.forEach(function(page_num) {


	//print_page(page_num);

});


print_page();
function print_page(){//page_num){

	var query = {
		//"user.name":user,
		//"page.page_num":page_num
		"author.name":{"$in":['目光呆滞的润土','目光呆滞的小军','稚一','目光炯炯的小军']}

	};
	var sort = {
		"created_at.date":1
	};
	var count = 0;
	var pu= db.pages.find(query).sort(sort);
	while(pu.hasNext()){
		var temp = pu.next();
		var info = temp['userinfo'];
		if(!info){
			info = {
				"name" : temp['author']['name'] ,
				"show_mail_time" : temp['created_at']['day'], 
				"email" : temp['content'], 
				"email_2" : "", 
				"qq" : 0, 
				"label" : [ ], 
				"intro" : "", 
				"tags" : [ "show_mails", "石油篇" ]
			}
		};
		/*
		if(temp['content'].match(/\@+/g)||temp['content'].match(/\#+/g)){
			count++;//6446
		}
		*/
		var reg = "/\《+/g";
		if(temp['content'].match(reg)){
			count++;
		}
		//printjson(info);

	}
	printjson(count);

}

//check_page_userinfo();

function check_page_userinfo(){
	var p = db.pages.find({"userinfo":{"$exists":true}}).sort({"created_at.date":1});
	while(p.hasNext()){
		var temp = p.next();
		//db.pages.update({"created_at.day":temp['created_at']['day']},{"$unset":{"pair":1,"parent":1}});
		//db.pages.update({"created_at.day":temp['created_at']['day']},{"$rename":{"userinfo.uname_in_bbs":"userinfo.user_name"}})
		//db.pages.update({"created_at.day":temp['created_at']['day']},{"$set":{"key":"e","group":{"pair":"","parent":temp['parent']['timestamp']}}});
		printjson(temp);

	}
}
