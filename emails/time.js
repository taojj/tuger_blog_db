
function date2timestamp (date){
	return Math.floor(date.getTime()/1000);
}

function timestamp2date (timestamp){
	return new Date(timestamp*1000);
}

function now2timestamp(){
	return date2timestamp(new Date());
}

/*
date.getYear();        //获取当前年份(2位)
date.getFullYear();    //获取完整的年份(4位,1970-????)
date.getMonth();       //获取当前月份(0-11,0代表1月)
date.getDate();        //获取当前日(1-31)
date.getDay();         //获取当前星期X(0-6,0代表星期天)
date.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
date.getHours();       //获取当前小时数(0-23)
date.getMinutes();     //获取当前分钟数(0-59)
date.getSeconds();     //获取当前秒数(0-59)
date.getMilliseconds();    //获取当前毫秒数(0-999)
date.toLocaleDateString();     //获取当前日期
var mytime=date.toLocaleTimeString();     //获取当前时间
date.toLocaleString( );        //获取日期与时间
*/

function date2day(date){
	//return ( '0' + ( date.getMonth() + 1 ) ).substr( -2 ) + '/' + ( '0' + date.getDate() ).substr( -2 ) + '/' + date.getFullYear();
	return (date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds())

}

function day2date (day) {
	return new Date(Date.parse(day));
}


