
load('./process/time.js');

/*
create_subject:
创建subject主题
*/


/*

var subject_sample = {

	"subject_id":1,//主题id
	"title":"",//标题
	"subtitle":"——"+"",//副标题

	"author":{"id":"","name":""},//作者
	"created_at":{"date":"","day":""},//时间戳

	"label":"post",//主题分类：博文，话题，其他
	"keywords":temp['tags'],//关键词   ["风云外传","金融篇"],//目录
	"categories":[//目录属性
		{"id":1,"name":"风云外传"},//一级专题
		{"id":2,"name":"金融篇"}//二级专题
	],
	"intro":"",//引言描述
	"body":"",
	"para_refs":[
		{"key":"p","day":""},
		{"key":"q","day":""},
		{"key":"c","day":""}
	],//包含有哪些paragraph段落
	"questions":[], 
	"reviews":[], 
	"comments":[], 
	"attachments":[], 

	//edit
	"status":0,//状态：草稿0，发布1，删除2，回收站3
	"archived_at":{"date":"","day":"2005-02-08"}//归档日期
	"isHidden" : false


	//votes
	"votes":{"good":0,"bad":0}

};
*/

//直接从pages中聚合生成subject

/*
var collection = "风云外传";
var chapters_array = ["缘起篇","机关篇","服装篇","贸易公司篇","游乐场篇","卖瓷砖篇","广告篇","金融篇"];
*/
var collection = "风云自传";
var chapters_array = ["序篇","童年篇","服装篇","装饰篇","石油篇","斗智篇","悲情篇","沉沦篇","保险篇","传媒篇","地产篇","跋篇","补续篇"];

var collection = "三无创业";//2006颠覆创业,风云补天创业方案
var chapters_array = ["前传篇","构想篇","回眸篇"];

//遍历给定的chapters
chapters_array.forEach(function(chapter){

	var index = chapters_array.indexOf(chapter)+1;//当前篇章在专题的编号

	//1.create_subject
	create_subject(collection, chapter,index);

	//2.show_subject
	//show_subject();

});




function create_subject(collection,chapter,index){

	//从pages中聚合subject，根据categories数组匹配
	var p = db.pages.find({"subject.categories":{"$all":[collection,chapter]}}).sort({"created_at.date":1});

	while(p.hasNext()){
		var temp = p.next();

		var key = temp['key'];
		var degree = temp['degree'];

		var author = temp['author'];
		var created_at = temp['created_at'];
		var archived_at_date = temp['created_at']['date'];
		var archived_at_day = date2day2(created_at['date']);
		var content = temp['content'];

		//subject
		var subject = temp['subject'];
		var title = subject['title'];
		var subtitle = (subject['subtitle']=="")?("——"):("——"+subject['subtitle']);
		var categories = subject['categories'];
		var keywords = subject['keywords'];
		var intro = subject['intro'];

		var order = subject['order'];

		var para_refs = subject['para_refs'];

		//构造subject
		var value = {

			"subject_id":"fywz_"+index+"_"+order,//主题id
			"title":title,//标题
			"subtitle":subtitle,//副标题

			"author":author,//作者
			"created_at":created_at,//时间戳

			"label":"post",//主题分类：博文，话题，其他
			"order":index+"-"+order,//篇章系列号1-2
			"keywords":keywords,//关键词   ["风云外传","金融篇"],//目录
			"categories":[//目录属性
				{"id":2,"name":collection},//一级专题
				{"id":3,"name":chapter}//二级专题
			],
			"intro":intro,//引言描述
			"content":content,//正文内容

			"para_refs":para_refs,//保留对page中的p,q,a,r,c的引用，通过day这个时间戳
			/*
			"para_refs":[
				{"para_id":page_id,"created_at_day":para_day,"key":key}//self
			],//包含有哪些paragraph段落
			//"questions":[], 
			//"answers":[],
			//"reviews":[], 
			//"comments":[], 
			//"attachments":[], 
			*/

			//edit
			"status":0,//状态：草稿0，发布1，删除2，回收站3
			"archived_at":{"date":archived_at_date ,"day":archived_at_day},//归档日期
			"isHidden" : false

			//votes

		};

		if (key == "p" && degree == 6.1){//只针对post进行操作
			db.subjects.insert(value);
			//printjson(value);
		};

		/*
		//
		if (key == "a" && degree == 6.2){
			//
		}
		*/


	};



}//end-if

//show_subject
function show_subject(){
	var s = db.subjects.find({});
	while(s.hasNext()){
		var temp = s.next();
		printjson(temp);
	}
}


/*

{
	"subject_id" : "fywz_6_1",
	"title" : "卖瓷砖（一）",
	"subtitle" : "——",
	"author" : {
		"id" : "8333502",
		"name" : "目光呆滞的小军"
	},
	"created_at" : {
		"date" : ISODate("2006-09-29T00:59:27Z"),
		"day" : "2006-09-29  08:59:27"
	},
	"label" : "post",
	"order" : "6-1",
	"keywords" : [
		"谋生",
		"哽咽"
	],
	"categories" : [
		{
			"id" : 2,
			"name" : "风云外传"
		},
		{
			"id" : 3,
			"name" : "卖瓷砖篇"
		}
	],
	"intro" : "小军落魄期间，租门面，经营零售润滑油小卖铺，还债谋生； 给M同学（代理S品牌瓷砖）打工，谋固定工资（2000元月薪+年底4000元红包）以养家糊口， 摆脱寄人篱下，推销“直销电子笔”（1995-1998？）",
	"content" : "卖瓷砖（一）  谋生　　　　现在，哥们收入都不高，大家都有自己的小家，微薄的收入要供全家开销，基本上也是捉襟见肘。95年后，经历了“胆子大些！步子快些！”的闹腾，许多企业留下不少三角债。生意有的做，就是做后，拿不到钱。一些效益好的企业，我们无法介入，当权者已经不稀罕生意人送的红包了，他们索性自己开公司跟自己管的企业交易，或者由亲戚朋友出面，自己背后操作。我年纪31岁不符合低保条件，领不到救济，自己没有文凭所以没单位要，怎么办？这年头，没有本钱、没有关系，如何去做生意呢，何况我的债，表妹不催，我母亲也催我还的，只要我回家，母亲总唠叨：“小军呀，你表妹做小生意，弄点钱不容易呀，你姑姑没收入，全家就靠表妹啊……”。人呀就是这样，平日里有钱风光时，高朋满座，人落到走投无路的时候，却门口罗雀，冷冷清清，望着妻子和二岁的女儿，我欲哭无泪，我一个大男人总不能靠妻子的200元工资养家吧。　　　　不几日，我找小谢在南京大屠杀纪念馆对面，租下了间简易的小门面，我要卖些润滑油的小买卖糊口。这5万一间的门面太贵，我负担不起，于是，我将门面隔出一半租给别人，自己留下小一点的，这样租金2万负担可以轻些。　　　　我和润土毕竟是做过石油的，现在汽油、柴油是不让做了，但零售润滑油还是可以的，于是，我找到过去的石油公司朋友那里，舍帐拉回来几十桶润滑油，将货在门口堆的满满的，其实后面的桶是空的，我根本没多少货，生意开张后，雇不起人手，退休的父亲也来帮忙了，虽然妈妈说过几句抱怨的话：“什么，你要不下海的话，不要说做了处长，至少是公务员，房子、钱一定不少的，人也不用辛苦”，不过父亲从没有抱怨过我，他抽着烟，帮我打油，用塑料桶装油零卖给过路的司机，附近工地的工程车也不十过来照顾写几百块的大生意，几个月后，生意稳定了，除去房租，可以赚2千元左右，我每月尽量凑个千元的整数给表妹寄去，靠着不多的剩余，艰难地度日。　　　　夏天的时候，店里没有空调，由于没有熟人，我也顾不着面子，热的时候就索性赤膊卖油了，上货、下货、用油泵手工压油总要把手上、脸上弄的污迹斑斑。　　　　哽咽　　　　一日，路对面停着一辆白色的捷达汽车，我在店外戴着草帽赤膊帮司机换润滑油。突然，有人喊我“小军”，我一楞，捷达车上走下一高中同学，惊讶地望着我，“小军不会吧，我路过这里几次了，感觉像你，不敢认的，你是同学中最早坐小车的，穿的全是名牌，住的是高级酒店的呀”，“小军！真的，我看出是你抱这着个黑油桶时，我坐在车里眼泪都下来了”。 ",
	"para_refs" : [
		{
			"key" : "p",
			"day" : "2006-09-29  08:59:27"
		}
	],
	"status" : 0,
	"archived_at" : {
		"date" : ISODate("2006-09-29T00:59:27Z"),
		"day" : "2006-09-29"
	},
	"isHidden" : false
}


*/




