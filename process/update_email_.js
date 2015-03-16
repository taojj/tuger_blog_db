
load ('./process/time.js');
load ('./process/emails_updated_.js');
var users = users_json();

printjson(users.length);
var count = 0;
users.forEach(function(user){


	//update_page_userinfo(user);
	//check_page_userinfo(user);

	//1更新用户
	//update_user_info(user);
	//check_user_info(user);

	///count++;

});

printjson(count);//




function update_page_userinfo(user){

	var p = db.pages.find({"created_at.day":user['show_mail_time']});
	while (p.hasNext()){
		var temp = p.next();
  	var info = temp['info'];

		if (!info){
			info = {
				"user_name":user['name'],
				"email":user['email'].toLowerCase(),
				"email_2":user['email_2']? user['email_2'].toLowerCase() : "",
				"qq":user['qq']? user['qq'] : 0,
				"show_mail_time":user['show_mail_time'],
				"label":user['label'],
				"intro":user['intro']
			}
		}
		var tags = user['tags'];
		var key = "e";
		//update
		db.pages.update({"created_at.day":temp['created_at']['day']},{"$set":{"userinfo":info,"tags":tags,"key":key}})

	}
	
}


function check_page_userinfo(user){
	var query = {
		"created_at.day":user['show_mail_time']
		//"userinfo.email":{"$exists":true}
	};
	var p = db.pages.find(query).sort({"created_at.date":1});
	while(p.hasNext()){
		var temp = p.next();
		printjson(temp);

	}
}


function update_user_info(user){
	var email = user['email'].toLowerCase();
	var email_2 = user['email_2']? user['email_2'].toLowerCase() : "";
	var email_3 = "";
	var qq = user['qq'];
	var u = db.users.find({"user.name":user['name']});
	while(u.hasNext()){
		var temp = u.next();
		var info = temp['info'];
		var intro = info['intro'];


		if(info){
			var email1 = info['email'];
			var email2 = info['email_2'];
			var email3 = info["email_3"];
			var qq1 = info['qq'];

			if (email1 != ""){
				email = (email==email1)?email1:email;
				email = (email==email2)?email2:email;
			};

			if (email2 != ""){
				email_2 = (email_2==email1)?email1:email_2;
				email_2 = (email_2==email2)?email2:email_2;
				email_3 = email_2;
			};

			if (email3 !=null && email3 != ""){
				email_3 = (email_3==email3)?email3:email_3;
			};

			if (qq1 != 0 ){
				qq = qq1;
			};

			if (intro==""){
				intro = user['intro'];
			};
		}


		var value1 = {
			"email":email,
			"email_2":email_2,
			"email_3":email_3,
			"qq":qq,
			"label":user['label']?user['label']:[],//默认
			"intro":intro
		};


		if (!email) {
			db.users.update({"user.name":temp['user']['name']},{"$set":{"info":info},"$addToSet":{"info":{"show_mail_time":show_mail_time}}});
		};

	}


}

function check_user_info(user){
	var u = db.users.find({"user.name":user['name']});
	while(u.hasNext()){
		var temp = u.next();
		printjson(temp);
	}
}


