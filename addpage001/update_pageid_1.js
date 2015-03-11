
var page_index = 1;


var start = new Date("2005-10-22  10:06:00");//2013-09-02 12:40:39
//var end = new Date("2005-11-16  18:26:03");
var end = new Date("2005-10-22  19:06:00");//2013-09-18 10:12:38

var pageid_s = 1001;//304001
var floorid_s = 1;//303001

var page = db.pages.find({"page_index":page_index,"meta.created_at":{"$gte":start,"$lte":end}}).sort({"meta.created_at":1});

while(page.hasNext()){
	var temp = page.next();

	//update floor_id&page_id
  //printjson({"user_id":temp['user_name'],"page_id":pageid_s++,"floor_id":floorid_s++});
	//db.pages.update({"page_index":1,"user_id":temp['user_id'],"meta.created_at":temp['meta']['created_at']},{$set:{"page_id":pageid_s++,"floor_id":floorid_s++}});
	
	//show result
	printjson({
		"user_name":temp['user_name'],
		"page_id":temp['page_id'],
		"floor_id":temp['floor_id'],
		"created_at":temp['meta']['created_at'],
		"content":temp['content']
	});
}
