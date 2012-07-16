// 現在時刻を定型フォーマットで返す
function _getNowDateTime()
{
	var d 		= new Date();
	
	// 年月日・時分秒の取得
	var year 	= d.getFullYear();
	var month 	= d.getMonth() + 1;
	var day 	= d.getDate();
	var hour 	= d.getHours();
	var minute 	= d.getMinutes();
	var second 	= d.getSeconds();

	// 1桁を2桁に変換する
	if (month < 10) 	{month 	= '0' + month;}
	if (day < 10) 		{day 	= '0' + day;}
	if (hour < 10) 		{hour 	= '0' + hour;}
	if (minute < 10) 	{minute = '0' + minute;}
	if (second < 10) 	{second = '0' + second;}

	return year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
}

//現在の月を取得
function _getNowYear()
{
	var d 		= new Date();
	
	// 年月日・時分秒の取得
	var year 	= d.getFullYear();

	return year;
}

// 現在の月を取得
function _getNowMonth()
{
	var d 		= new Date();
	
	// 年月日・時分秒の取得
	var month 	= d.getMonth() + 1;

	// 1桁を2桁に変換する
	if (month < 10) 	{month 	= '0' + month;}

	return month;
}

//現在の日を取得
function _getNowDay()
{
	var d 		= new Date();
	
	// 年月日・時分秒の取得
	var day 	= d.getDate();

	// 1桁を2桁に変換する
	if (day < 10) 		{day 	= '0' + day;}

	return day;
}