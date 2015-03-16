

var query = {
	"key":"e",
	"userinfo":{"$exists":true}//,
	//"page.page_num":{"$lte":200}
};
var co = db.pages.find(query).sort({'created_at.date':1});

while(co.hasNext()){
	var temp = co.next();

	var created_at_date = temp['created_at']['date'];

	//db.pages.update({"created_at.date":created_at_date},{"$set":value});
	//db.pages.update({"created_at.date":created_at_date},{"$unset":{"pair":1,"parent":1}});
	//db.pages.update({"created_at.date":created_at_date},{"$set":{"group":{"pair":value,"parent":value}}});
	//db.pages.update({"created_at.date":created_at_date},{"$rename":{"info":"userinfo"}});
	printjson(temp);
}
