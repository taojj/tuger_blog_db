
var paras = [

{
	"author" : "冰雪化骨",
	"created_at" : "2007-11-11  16:53:42",
	"content" : "顺便纪念下润土和小军的缪老弟弟（风云贴的金融天才，写到了两次）。。。。。。。。。。",
	"group" : {
		"pair" : "",
		"parent" : "2006-11-13  11:37:02"
	},
	"key" : "r",
	"degree" : 6.2
},
{
	"author" : "目光呆滞的润土",
	"created_at" : "2007-11-12  10:40:47",
	"content" : "昨天是11月11日，是缪老弟的一周年祭日，上午9点多，我与小军一起去功德园祭拜我们的好朋友缪老弟，我捧着两束野菊花、小军临时买了些冥币、纸元宝，在墓地旁正巧碰见了，刚刚祭拜完出来的Z翔和晶晶（缪的大学同学）。我与小军将菊花放在黑色大理石台面，点燃三支香烟，对缪老弟鞠躬拜遏，冥币在铁桶中燃烧。我凝视着缪的照片，过去相处的记忆，像电影一样在脑中影显，此刻阳光灿烂，墓碑上缪的瓷像清晰漂亮，照片是去年夏天在九寨沟的海子边照的，他穿件黑白条纹的衬衣，神情烁烁，水是那样的蓝，我感慨万千，“缪对着相机的时候，怎么能想到这是他墓碑上的遗像呢？”生命原来是如此的脆弱啊，所以，我们活着的人，没有理由不珍惜生命、热爱生活。缪给刘骗子给骗了，是刘骗子骗了他千万，让他焦虑，让他失去了方向，其实刘骗子没有错，或许只有流氓、骗子才能够生存，善良、仁慈的缪老弟本不应该生活在这个时代，现在缪老弟终于解脱了，他离开了这个充满欺诈、贪婪、谎言的世界，他在天堂一定很快乐- - - - ",
	"group" : {
		"pair" : "",
		"parent" : "2006-11-13  11:37:02"
	},
	"key" : "a",
	"degree" : 6.2
},
{
	"author" : "目光呆滞的润土",
	"created_at" : "2008-05-05  07:49:13",
	"content" : "作者：青年主流是好的嘛　回复日期：2008-05-04  20:40:51    半载未逢,风流依旧.小军大哥现在怎么样了．好久没聆教诲．***********************************************************小军很好，正在扫尾缪总逝世后公司遗留的问题。自己的新公司数月前刚躲过一场金融诈骗（仅损失数万元），这看似老实的诈骗犯汪某共骗款千万以上，现已被逮捕。资金的去向成为迷团，小军判断有两种可能：一是汪被其他人给骗了，二是被赌博集团下套了。不管怎样？损失的钱就当交学费罢了，毕竟事后的故事证明当初的预感是正确的，因为当小军发现汪某每一次借钱没有递减，而是越借越多的时候，就估计他迟早要出事了，所以就压缩资金量，将风险控制在最小的程度，准备躲过恶运的来临。",
　　"group" : {
		"pair" : "2008-05-04  20:40:51",
		"parent" : "2006-11-13  11:37:02"
	},
	"key" : "a",
	"degree" : 6.2
},
{
	"author" : "冰雪化骨",
	"created_at" : "2008-05-06  23:10:23",
	"content" : "作者：目光呆滞的润土　回复日期：2008-5-5　7:49:13　 　=====================　　哇噻，小军都出道这么久了，也被钱了？真是个善良的好小军。哎，骗子真多。楼主常青树哦。楼主最近还好吗？冰雪过段时间就休假拉，要去新加坡玩玩拉哈哈，梦想中的花园哦，那里的政府禁止卖买房子的，所以房价不高，又有花园和绿化，真是天堂哦。哈哈，去拍几张照片玩玩，玩完了，有好心情，回来给大伙儿整理帖子。哈哈",
	"group" : {
		"pair" : "",
		"parent" : "2006-11-13  11:37:02"
	},
	"key" : "r",
	"degree" : 6.2
}





];





//遍历array
paras.forEach(function(page){

	//1.更新page
	//update_qarc(page);

	//2.检查page
	check_qarc(page);
	

});



//update_page 
function update_qarc(page){

	var current = page['created_at'];

	var key = page['key'];
	var group = page['group'];

	//1. update parent
	var parent = group['parent'];
	if (parent !="" ){

		//push para_refs
		var p = db.pages.find({"created_at.day":parent});
		while (p.hasNext()){
			var temp = p.next();
			var d = temp['created_at']['day'];

			if (key == "a"){
				var value_current = {
					"key":key,
					"day":current
				};

				//将当前记录推入
				db.pages.update({"created_at.day":d},{"$addToSet":{"subject.para_refs":value_current}});

				if (group['pair']!=""){
					var value_pair = {
						"key":"q",
						"day":group['pair']
					};	
					db.pages.update({"created_at.day":d},{"$addToSet":{"subject.para_refs":value_pair}});							
				}
	
			}

			if (key == "r"){
				var value_current = {
					"key":key,
					"day":current
				}
				db.pages.update({"created_at.day":d},{"$addToSet":{"subject.para_refs":value_current}});
			}


		}

	}

	//2. update current : q,a,r
	if (key != "p"){

		var value_a = {
			"content":page['content'],
			"group":page['group'],
			"key":key,
			"degree":page['degree']
		};

		//更新当下的A的group属性			"group":{"pair":"","parent":""},
		//printjson(value_a);
		db.pages.update({"created_at.day":current},{"$set":value_a});


		//更新对应Q的group属性      "group":{"pair":"","parent":""},
		var pair = group['pair'];//Question的day

		var value_q = {
			"group":{
				"pair":current,//Answer的day
				"parent":page['group']['parent']
			},
			"key":"q",
			"degree":6.2
		}
		if (pair != ""){
			db.pages.update({"created_at.day":pair},{"$set":value_q});
			//printjson(value_q);				
		}

	}//end-if key

}

function check_qarc(page){
	var created_at_day = page['created_at'];
	var p_new = db.pages.find({"created_at.day":created_at_day});
	while(p_new.hasNext()){
		var temp = p_new.next();
		var subject = temp['subject'];
		var key = temp['key'];
		/*
		if (key == "a"){
			//printjson(temp);
			//db.pages.update({"created_at.day":created_at_day},{"$unset":{"subject":1}});
			//db.pages.update({"created_at.day":created_at_day},{"$unset":{"pair":1}});
		};
		*/
		if (key != "p"){
			printjson(temp);			
		}

	}
}


