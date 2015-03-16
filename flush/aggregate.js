
var use = db.getSisterDB("tuger_blog");//use tuger_blog
print(use);
var show = db.getMongo().getDBs();//show dbs
print(show);
var showColls = db.getCollectionNames();//show collections
print(showColls);


var p = db.pages.aggregate(
	{"$project":{"author.name":1}},
	{"$group":{"_id":"$author.name","count":{"$sum":1}}},
	{"$sort":{"count":-1}},
	{"$limit":50}

);

printjson(p);

/*
mongo 127.0.0.1/tuger_blog flush/aggregate.js
MongoDB shell version: 2.6.8
connecting to: 127.0.0.1/tuger_blog
{
	"_firstBatch" : [
		{
			"_id" : "冰雪化骨",
			"count" : 319
		},
		{
			"_id" : "藕断不了丝也会连",
			"count" : 351
		},
		{
			"_id" : "zjjxiaoli",
			"count" : 352
		},
		{
			"_id" : "一天星月",
			"count" : 371
		},
		{
			"_id" : "我叫风云",
			"count" : 431
		},
		{
			"_id" : "天使的魔鬼的天使",
			"count" : 472
		},
		{
			"_id" : "稚一",
			"count" : 577
		},
		{
			"_id" : "hou1098",
			"count" : 759
		},
		{
			"_id" : "sinotao1",
			"count" : 843
		},
		{
			"_id" : "目光呆滞的润土",
			"count" : 2752
		}
	],
	"_cursor" : {
		"next" : function next() { [native code] },
		"hasNext" : function hasNext() { [native code] },
		"objsLeftInBatch" : function objsLeftInBatch() { [native code] },
		"readOnly" : function readOnly() { [native code] }
	},
	"hasNext" : function () {
    return this._firstBatch.length || this._cursor.hasNext();
},
	"next" : function () {
    if (this._firstBatch.length) {
        // $err wouldn't be in _firstBatch since ok was true.
        return this._firstBatch.pop();
    }
    else {
        var ret = this._cursor.next();
        if ( ret.$err )
            throw "error: " + tojson( ret );
        return ret;
    }
},
	"objsLeftInBatch" : function () {
    if (this._firstBatch.length) {
        return this._firstBatch.length;
    }
    else {
        return this._cursor.objsLeftInBatch();
    }
},
	"help" : function () {
    // This is the same as the "Cursor Methods" section of DBQuery.help().
    print("\nCursor methods");
    print("\t.toArray() - iterates through docs and returns an array of the results")
    print("\t.forEach( func )")
    print("\t.map( func )")
    print("\t.hasNext()")
    print("\t.next()")
    print("\t.objsLeftInBatch() - returns count of docs left in current batch (when exhausted, a new getMore will be issued)")
    print("\t.itcount() - iterates through documents and counts them")
    print("\t.pretty() - pretty print each document, possibly over multiple lines")
},
	"toArray" : function (){
    if ( this._arr )
        return this._arr;

    var a = [];
    while ( this.hasNext() )
        a.push( this.next() );
    this._arr = a;
    return a;
},
	"forEach" : function ( func ){
    while ( this.hasNext() )
        func( this.next() );
},
	"map" : function ( func ){
    var a = [];
    while ( this.hasNext() )
        a.push( func( this.next() ) );
    return a;
},
	"itcount" : function (){
    var num = 0;
    while ( this.hasNext() ){
        num++;
        this.next();
    }
    return num;
},
	"shellPrint" : function (){
    try {
        var start = new Date().getTime();
        var n = 0;
        while ( this.hasNext() && n < DBQuery.shellBatchSize ){
            var s = this._prettyShell ? tojson( this.next() ) : tojson( this.next() , "" , true );
            print( s );
            n++;
        }
        if (typeof _verboseShell !== 'undefined' && _verboseShell) {
            var time = new Date().getTime() - start;
            print("Fetched " + n + " record(s) in " + time + "ms");
        }
         if ( this.hasNext() ){
            print( "Type \"it\" for more" );
            ___it___  = this;
        }
        else {
            ___it___  = null;
        }
   }
    catch ( e ){
        print( e );
    }

},
	"pretty" : function (){
    this._prettyShell = true;
    return this;
}
}


*/