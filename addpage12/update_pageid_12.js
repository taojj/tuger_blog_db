

var page = 1;
	var start = new Date("2006-09-12  16:27:15");
	var end = new Date("2006-09-29  16:58:32");
	var page = db.pages.find({"page_index":12,"meta.created_at":{"$gte":start,"$lte":end}}).sort({"meta.created_at":1});
	var pageid_s = 12211;
	var floorid_s = 1311;
	while(page.hasNext()){
		var temp = page.next();
    printjson(pageid_s++);
		//printjson({"user_id":temp['user_id'],"page_id":pageid_s++,"floor_id":floorid_s++});
		//db.pages.update({"page_index":12,"user_id":temp['user_id'],"meta.created_at":temp['meta']['created_at']},{$set:{"page_id":pageid_s++,"floor_id":floorid_s++}});

	}
