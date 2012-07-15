// DBObject
var objDB = openDatabase('IkebanaLocalDB', '1.0', 'IkebanaLocal用DB', 5000000);

// DB接続
// データベースの作成
tranQeury("\
	CREATE TABLE IF NOT EXISTS USERS\
	(\
		ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,\
		NICKNAME TEXT NOT NULL,\
		AUTH_CODE TEXT DEFAULT '0' NOT NULL,\
		BIRTHDAY TEXT DEFAULT 'null',\
		IMAGE BLOB,\
		CREATE_DATE TEXT,\
		UPDATE_DATE TEXT\
	)");

tranQeury("\
	CREATE TABLE IF NOT EXISTS AUTHOERS\
	(\
		ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,\
		USER_ID INTEGER DEFAULT 1 NOT NULL,\
		NAME TEXT NOT NULL,\
		AUTHOER_IMAGES_ID INTEGER,\
		LOCATE TEXT DEFAULT 'null',\
		SCHOOL TEXT,\
		STYLE TEXT,\
		ORGAN_ID INTEGER DEFAULT null,\
		USE_FLOWER_ID INTEGER DEFAULT null,\
		USE_TOOL_ID INTEGER DEFAULT null,\
		APPEAL TEXT DEFAULT 'null',\
		CHECK_POINT TEXT DEFAULT 'null',\
		CREATE_DATE TEXT DEFAULT 'null',\
		UPDATE_DATE TEXT DEFAULT 'null',\
		FOREIGN KEY (USER_ID)\
		REFERENCES USERS (ID)\
	)");

tranQeury("\
	CREATE TABLE IF NOT EXISTS AUTHOER_IMAGES\
	(\
		ID INTEGER NOT NULL,\
		BRANCH_ID INTEGER NOT NULL,\
		IMAGE NONE\
	);");

tranQeury("\
	CREATE TABLE IF NOT EXISTS COMMENTS\
	(\
		ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\
		SERVER_AUTHOER_ID INTEGER NOT NULL,\
		CONTENT TEXT\
	)");

tranQeury("\
	CREATE TABLE IF NOT EXISTS FAVORIT\
	(\
		ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\
		SERVER_AUTHOER_ID INTEGER NOT NULL UNIQUE\
	)");

tranQeury("\
	CREATE TABLE IF NOT EXISTS FLOWERS\
	(\
		ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,\
		NAME TEXT NOT NULL,\
		NAME_KANA TEXT NOT NULL,\
		SEASON_MONTH NUMERIC NOT NULL,\
		IMAGE BLOB\
	)");

tranQeury("\
	CREATE TABLE IF NOT EXISTS ORGANS\
	(\
		ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,\
		NAME TEXT NOT NULL,\
		IMAGE BLOB\
	)");

tranQeury("\
	CREATE TABLE IF NOT EXISTS TOOLS\
	(\
		ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,\
		NAME TEXT NOT NULL,\
		IMAGE BLOB\
	)");

tranQeury("\
	CREATE TABLE IF NOT EXISTS USE_FLOWERS\
	(\
		ID INTEGER NOT NULL,\
		FLOWER_ID INTEGER NOT NULL,\
		FOREIGN KEY (FLOWER_ID)\
		REFERENCES FLOWERS (ID)\
	)");

tranQeury("\
	CREATE TABLE IF NOT EXISTS USE_ORGANS\
	(\
		ID INTEGER,\
		ORGAN_ID INTEGER NOT NULL,\
		FOREIGN KEY (ORGAN_ID)\
		REFERENCES ORGANS (ID)\
	)");

tranQeury("\
	CREATE TABLE IF NOT EXISTS USE_TOOLS\
	(\
		ID INTEGER,\
		TOOL_ID INTEGER NOT NULL,\
		FOREIGN KEY (TOOL_ID)\
		REFERENCES TOOLS (ID)\
	)");

// 現在時刻を定型フォーマットで返す
function getNowDateTime()
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


/* 以下テーブル操作関数 */
// SQL実行
function tranQeury(sql, sqlArg, endedMethod)
{
	objDB.transaction(
		// SQLを実行
		function(tx)
		{
			tx.executeSql(sql, sqlArg, endedMethod);
		}, 
		// 異常時
		function (err)
		{
			console.log(err);
			calert('エラーが発生しました。', null, 'エラー');
		}, 
		// 成功時
		function ()
		{
		}
	);
}

// テーブル参照
function selectDatas(tableName, afterFn)
{
	tranQeury('SELECT * FROM ' + tableName, null, function(tx, results)
	{
		setInterval(afterFn(results.rows), 0);
	});
}

// テーブル追加
function insertDatas(tableName, params)
{
	var values = new Array();
	for (var i = 0; i < params.length; i++)
	{
		values.push('?');
	}
	tranQeury('INSERT INTO ' + tableName + ' VALUES (' + values.toString() + ')', params);
}

// テーブル削除
function deleteDatas(tableName, params)
{
	var whereStr = params.toString().replace(/[^,]/g, '?');
	whereStr = whereStr.replace(/[,]/g, ' AND ');
	tranQeury('DELETE FROM ' + tableName + ' WHERE ' + whereStr , params);
}

function beginTran()
{
	tranQeury('BEGIN');
}
function commitTran()
{
	tranQeury('COMMIT');
}
function rollbackTran()
{
	tranQeury('ROLLBACK');
}
