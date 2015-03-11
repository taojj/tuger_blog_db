
var page_index = 1;

var count = 0;
var p = db.pages.find({"page_index":page_index,"key":null}).sort({"meta.created_at":1});

while(p.hasNext()){
	count++;
	var temp = p.next();
	var result = {
		"page_id":temp['page_id'],
		"created_at":temp['meta']['created_at'],
		"key":temp['key']
	};
	printjson(result);
};
printjson(count);//303条记录


//sort_page_1 taojunjun$
//mongo 127.0.0.1/tuger_blog find_untag.js
