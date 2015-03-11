
var d = "2006-7-2  19:26:22";
var ymd = new Date(d);
//console.log(ymd);
/*
var update_post_with_key_b = function(key){
	console.log(key);
};


[1,2,3].forEach(function(key){
	update_post_with_key_b(key);
});
*/

var tags = ["1a","1b"];
var tags_exists = ["1c","1d"];

if (tags_exists!=null) {

	tags_exists.forEach(function(tag) {
		tags.push(tag);
	});

};

console.log(tags);
