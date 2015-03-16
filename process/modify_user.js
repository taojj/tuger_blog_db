

var query = {

};
var u = db.users.find(query);
while(u.hasNext()){
	var temp = u.next();
	var uname = temp['user']['name'];
	//db.users.update({"uname_in_bbs":uname},{"$rename":{"uname_in_bbs":"user.name","uid_in_bbs":"user.id"}});
	printjson(temp);

	var modify = {
		"last_sign_in_at":"bbs.last_sign_in_at",
		"sign_in_count":"bbs.sign_in_count",
		"remember_created_at":"bbs.remember_created_at",
		"score_in_bbs":"bbs.score_in_bbs",
		"bbs_life_year":"bbs.bbs_life_year",

		"star_from_born":"info.star_from_born",
		"born_in_city":"info.born_in_city",
		"born_in_date":"info.born_in_date"
	};

}
