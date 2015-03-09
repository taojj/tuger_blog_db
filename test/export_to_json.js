//use tuger_blog;

var c = db.comments.find({"page_num_original":1}).sort({"sequence_num_original":1});

while(c.hasNext()) {

    printjsononeline(c.next());

}

//mongo 127.0.0.1:27017/tuger_blog test01.js > feed.json



//mongo 192.168.2.201:41211/dc_user dump.js > feed.json

//printjson输出的是格式化的json文本，便于查看数据，但是不能用mongoimport导入.
//如果需要导入替换printjson为printjsononeline
