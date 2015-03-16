
var page_num = 1;//2;//307;


var start = new Date("2005-10-22  10:06:00");//new Date("2005-11-16  18:43:52");//2013-10-23  10:45:27
//var end = new Date("2005-11-16  18:26:03");
var end = new Date("2005-11-16  18:26:03");//new Date("2005-12-17  12:46:16");//2013-11-05  21:59:27

var start_page = 1001//2001//307001;//304001
var start_floor = 1//101//30601;//30301

var page = db.pages.find({"page.page_num":page_num,"created_at.date":{"$gte":start,"$lte":end}}).sort({"created_at.date":1});

while(page.hasNext()){
	var temp = page.next();

	//update floor_id&page_id
  //printjson({"user_id":temp['user_name'],"page_id":pageid_s++,"floor_id":floorid_s++});
  var query = {
		"page.page_num":page_num,
		"author.id":temp['author']['id'],
		"created_at.date":temp['created_at']['date']
  };

  var value = {
 		"page_id":start_page++,
  	"floor_id":start_floor++,
  	"page_num":temp['page']['page_num']
  };
	//db.pages.update(query,{"$set":{"page":value}});
	//printjson(value);



	//show result
	
	printjson({
		"author":temp['author']['name'],
		"page":temp['page'],
		"created_at":temp['created_at']['day']//,
		//"content":temp['content']
	});
	

}
