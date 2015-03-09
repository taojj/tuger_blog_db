var users = [];



//0 load users
var user_sample = [
	{
		"uname_in_bbs":"目光呆滞的润土",
		"show_mail_time":"2005-10-26  19:38:40",
		"email":"jsnjzm@163.com",
		"email_2":"",
		"qq":2222,
		"label":[],
		"intro":"",
		"born_in_date":""

	}
];

//1 prepare

//1.1 update parent
var parent_timestamp = "2005-10-26  19:38:40";//
var parent_date = new Date(parent_timestamp);
var parent_id = 1112;
var par = db.pages.find({"meta.created_at":parent_date});
while (par.hasNext()){
	var temp = par.next();
	parent_id = temp['page_id'];
	//printjson(parent_id);
}

var count = 0;

//2 update email
users.forEach(function(user){

	//1-load field
	var uname_in_bbs = user['uname_in_bbs'];
	var email = user['email'].toLowerCase();
	var email_2 = user['email_2']? user['email_2'].toLowerCase() : "";
	var qq = user['qq']? user['qq'] : 0;
	var timestamp = user['show_mail_time'];
	var show_mail_time = new Date(user['show_mail_time']);

	var label = user['label']?user['label']:[];//["版主","土哥","土师爷"];
	var intro = user['intro']?user['intro']:"";//"风云(中国第一本企业家自传) 作者";

	
	var day = user['born_in_date'];//born info

	/*
	var gender = user['gender'];
	var born_in_city = user['born_in_city'];
	*/

	//2-update email

	var value1 = {
		"email":email,
		"email_2":email_2,
		"qq":qq,
		"label":label,
		"intro":intro
	};
	var value2 = {
		"show_mail_time":show_mail_time
	};	

	/*
	//db.users.update({"uname_in_bbs":uname_in_bbs},{"$unset":{"date":1,"day":1}});
	db.users.update({"uname_in_bbs":uname_in_bbs},{"$set":value1,"$addToSet":value2});


	if (day != ""){
		var date = new Date(day);
	  var value3 = {
	  	"date":date,
	  	"day":day
	  };

	  db.users.update({"uname_in_bbs":uname_in_bbs},{"$addToSet":{"born_in_date2":value3}});
	}

	//3-check results
	
	var u = db.users.find({"uname_in_bbs":uname_in_bbs});
	while(u.hasNext()){
		var temp = u.next();
		printjson(temp);
	}
	
	*/

 	
 	//4-update pages 
	//find page_id
	
	var page_id = 0;
	var p = db.pages.find({"meta.created_at":show_mail_time});
	while (p.hasNext()){
		var temp = p.next();
		page_id = temp['page_id'];
	}

	var value = {
		"key":"e",
		"pair":{"timestamp":parent_timestamp,"page_id":parent_id},
		"parent":{"timestamp":parent_timestamp,"page_id":parent_id},
		"degree":6,
		"tags":["show_mails","索取全文"],
		"info":{
			"uname_in_bbs":uname_in_bbs,
			"email":email,
			"email_2":email_2,
			"show_mail_time":timestamp,
			"qq":qq,
			//"born_in_date":{"date":"ISODate","day":"timestamp"},
			"label":label,
			"intro":intro
		}

	};
	//printjson(value);
	//db.pages.update({"meta.created_at":show_mail_time},{"$set":value});

	var pu = db.pages.find({"meta.created_at":show_mail_time});//,{"_id":0,"content":1,"tags"1,"info":1,"degree":1}
	while(pu.hasNext()){
		count++;
		var temp = pu.next();
		//printjson(temp);
	};

	//*/


});

//printjson(count);//210




//5 show result

/*

db.users.find({"email":{"$ne":null}}).count()
102
> db.users.find({"email":{"$ne":null}},{"email":1,"_id":0,"uname_in_bbs":1})

*/


