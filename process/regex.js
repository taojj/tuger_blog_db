var users1 = [
{
	"name" : "远去的戈多",
	"show_mail_time" : "2006-01-31  20:46:41",
	"email" : "楼主如能出书的话，一定要找你给签个名！！！　　再说一次我的E-MAIL:ldao2008@yahoo.com.cn．希望能得到全文．",
	"email_2" : "",
	"qq" : 0,
	"label" : [ ],
	"intro" : "",
	"tags" : [
		"show_mails",
		"石油篇"
	]
},
{
	"name" : "远去的戈多",
	"show_mail_time" : "2006-01-31  20:52:10",
	"email" : "多愁善感／诚实善良的人真的不适宜创业吗？请问楼主大哥",
	"email_2" : "",
	"qq" : 0,
	"label" : [ ],
	"intro" : "",
	"tags" : [
		"show_mails",
		"石油篇"
	]
}

];

load('./process/load.js');

var users = get_json();

users.forEach(function(user) {

	var str = user['email'];
	
	if (str.match(/\@+/g)) {
		printjson(user);

	}

});
