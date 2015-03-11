
var users = [
    {
        "uname_in_bbs": "wyj_007",
        "show_mail_time": "2007-5-14  11:29:21",
        "tags": [],
        "label": ["医药男"],
        "email": "wyJ_007@126.com",
        "email_2": "",
        "qq": 0,
        "intro": ""
    },
    {
        "uname_in_bbs": "494659244",
        "show_mail_time": "2010-05-03  19:41:39",
        "tags": [],
        "label": [],
        "email": "qiaoj-2005@163.com",
        "email_2": "",
        "qq": 0,
        "intro": ""
    },
    {
        "uname_in_bbs": "张运庆",
        "show_mail_time": "2006-09-27  09:37:27",
        "tags": [],
        "label": [],
        "email": "zh_yq2@163.com",
        "email_2": "",
        "qq": 270698647,
        "intro": "SKYPE:zh_yq2"
    },
    {
        "uname_in_bbs": "文的天空",
        "show_mail_time": "2007-02-08  11:43:10",
        "tags": [],
        "label": [],
        "email": "wen_sky@yahoo.com.cn",
        "email_2": "",
        "qq": 0,
        "intro": ""
    },
    {
        "uname_in_bbs": "",
        "show_mail_time": "",
        "tags": [],
        "label": [],
        "email": "",
        "email_2": "",
        "qq": 0,
        "intro": ""
    }




];





//1 prepare

//1.1 update parent_id
var parent_timestamp = "2005-10-26  19:38:40";//
var parent_date = new Date(parent_timestamp);
var parent_id = 1118;//296012
/*
var par = db.pages.find({"meta.created_at":parent_date});
while (par.hasNext()){
	var temp = par.next();
	parent_id = temp['page_id'];
	//printjson(parent_id);
}
*/

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

	var label = user['label'];//["版主","土哥","土师爷"];
	var intro = user['intro']?user['intro']:"";//"风云(中国第一本企业家自传) 作者";

	
	var day = user['born_in_date'];//born info

	//email各种标签["show_mails","索取全文","思维导图","石油篇","383改革方案","中国梦"]
	var tags = user['tags'];



	/*
	var gender = user['gender'];
	var born_in_city = user['born_in_city'];
	*/

	//2-update email

	var u = db.users.find({"uname_in_bbs":uname_in_bbs});
	while (u.hasNext()){
		var temp = u.next();
		var email1 = temp['email'];
		var email2 = temp['email_2'];
		var email3 = temp["email_3"];
		var qq1 = temp['qq'];
		//printjson(parent_id);

		if (email1 != ""){
			email = (email==email1)?email1:email;
			email = (email==email2)?email2:email;
		};

		var email_3 = "";
		if (email2 != ""){
			email_2 = (email_2==email1)?email1:email_2;
			email_2 = (email_2==email2)?email2:email_2;
			email_3 = email_2;
		};


		if (email3 !=null && email3 != ""){
			email_3 = (email_3==email3)?email3:email_3;
		};

		var value1 = {
			"email":email,
			"email_2":email_2,
			"email_3":email_3,
			"qq":qq,
			"label":[],//默认
			"intro":intro
		};
		var value2 = {
			"show_mail_time":show_mail_time
		};	
	
		//2.1 update fields 
		db.users.update({"uname_in_bbs":uname_in_bbs},{"$set":value1,"$addToSet":value2});

		//2.2 update label
		if (label!=null && label!=[]){
			label.forEach(function(l){
				var value_label = {
					"label":l
				};
				db.users.update({"uname_in_bbs":uname_in_bbs},{"$addToSet":value_label});
			});
		}

		//2.3  update born_in_date2
		if (day != null && day != ""){
			var date = new Date(day);
		  var value3 = {
		  	"date":date,
		  	"day":day
		  };
		  db.users.update({"uname_in_bbs":uname_in_bbs},{"$addToSet":{"born_in_date2":value3}});
		}

	};
	


	//3-check users results
	/*
	var u = db.users.find({"uname_in_bbs":uname_in_bbs},{"_id":0,"uname_in_bbs":1,"email":1,"email_2":1});
	while(u.hasNext()){
		count++;
		var temp = u.next();
		printjson(temp);
	};
	
	*/

 	
 	//4-update pages  info
 	//======================================
 	/*
	//find page_id
	var page_id = 0;
	var p = db.pages.find({"meta.created_at":show_mail_time});
	while (p.hasNext()){
		var temp = p.next();
		page_id = temp['page_id'];
	}
	
	var value = {
		"key":"e",
		"pair":{"timestamp":parent_timestamp,"pair_id":parent_id},
		"parent":{"timestamp":parent_timestamp,"parent_id":parent_id},
		"degree":6.3,
		"info":{
			"uname_in_bbs":uname_in_bbs,
			"email":email,
			"email_2":email_2,
			"show_mail_time":timestamp,
			"qq":qq,
			//"born_in_date":{"date":"ISODate","day":"timestamp"},
			"tags":["show_mails","索取全文"],//default
			"label":label,
			"intro":intro
		}

	};

	//printjson(value);
	db.pages.update({"meta.created_at":show_mail_time},{"$set":value});

	//update tag  ["冰雪整理版",思维导图","石油篇","383改革方案","王功权","中国梦"]
	if (tags!=null&&tags!=[]){
		tags.forEach(function(tag){
			var value2 = {
				"tags":tag
			}
	    db.pages.update({"meta.created_at":show_mail_time},{"$addToSet":value2});			
		});
	};

	//===========================
	*/

	//5-show pages result
	//db.pages.find({"tags":"show_mails"})
	/*
	var pu = db.pages.find({"meta.created_at":show_mail_time});//,{"_id":0,"content":1,"tags"1,"info":1,"degree":1}
	while(pu.hasNext()){
		count++;
		var temp = pu.next();
		db.pages.update({"meta.created_at":show_mail_time},{"$pushAll":{"tags":["show_mails","索取全文"]}})
		printjson(temp);
	};
	*/
	
	///count++;

});

printjson(count);//






