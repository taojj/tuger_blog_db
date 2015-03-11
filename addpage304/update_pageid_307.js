
var page_index = 307;


var start = new Date("2013-10-23  10:45:27");//
//var end = new Date("2005-11-16  18:26:03");
var end = new Date("2013-11-05  21:59:27");//

var pageid_s = 307001;//304001
var floorid_s = 30601;//30301

var page = db.pages.find({"page_index":page_index,"meta.created_at":{"$gte":start,"$lte":end}}).sort({"meta.created_at":1});

while(page.hasNext()){
	var temp = page.next();

	//update floor_id&page_id
  //printjson({"user_id":temp['user_name'],"page_id":pageid_s++,"floor_id":floorid_s++});
	//db.pages.update({"page_index":page_index,"user_id":temp['user_id'],"meta.created_at":temp['meta']['created_at']},{"$set":{"page_id":pageid_s++,"floor_id":floorid_s++}});
	
	//show result
	
	printjson({
		"user_name":temp['user_name'],
		"page_id":temp['page_id'],
		"floor_id":temp['floor_id'],
		"created_at":temp['meta']['created_at'],
		"content":temp['content']
	});
	//*/

}
