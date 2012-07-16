// DBObject
var _objDB = openDatabase('IkebanaLocalDB', '1.0', 'IkebanaLocal用DB', 5000000);


// DB接続
// データベースの作成
_tranQeuries(
	function (tx) 
	{
		tx.executeSql("\
				CREATE TABLE IF NOT EXISTS USERS\
				(\
					ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,\
					NICKNAME TEXT NOT NULL,\
					AUTH_CODE TEXT DEFAULT '0' NOT NULL,\
					BIRTHDAY TEXT DEFAULT 'null',\
					IMAGE BLOB,\
					CREATE_DATE TEXT,\
					UPDATE_DATE TEXT\
				)");
		tx.executeSql("\
				CREATE TABLE IF NOT EXISTS AUTHOERS\
				(\
					ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,\
					USER_ID INTEGER DEFAULT 1 NOT NULL,\
					TITLE TEXT NOT NULL,\
					AUTHOER_IMAGES_ID INTEGER,\
					POSTING_DATE TEXT,\
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
		tx.executeSql("\
				CREATE TABLE IF NOT EXISTS AUTHOER_IMAGES\
				(\
					ID INTEGER NOT NULL,\
					BRANCH_ID INTEGER NOT NULL,\
					IMAGE BLOB\
				);");
		tx.executeSql("\
				CREATE TABLE IF NOT EXISTS COMMENTS\
				(\
					ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\
					SERVER_AUTHOER_ID INTEGER NOT NULL,\
					CONTENT TEXT\
				)");
		tx.executeSql("\
				CREATE TABLE IF NOT EXISTS FAVORITES\
				(\
					ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\
					SERVER_AUTHOER_ID INTEGER NOT NULL UNIQUE\
				)");
		tx.executeSql("\
				CREATE TABLE IF NOT EXISTS FLOWERS\
				(\
					ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,\
					NAME TEXT NOT NULL,\
					NAME_KANA TEXT NOT NULL,\
					SEASON_MONTH NUMERIC NOT NULL,\
					IMAGE BLOB\
				)");
		tx.executeSql("\
				CREATE TABLE IF NOT EXISTS ORGANS\
				(\
					ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,\
					NAME TEXT NOT NULL,\
					IMAGE BLOB\
				)");
		tx.executeSql("\
				CREATE TABLE IF NOT EXISTS TOOLS\
				(\
					ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,\
					NAME TEXT NOT NULL,\
					IMAGE BLOB\
				)");
		tx.executeSql("\
				CREATE TABLE IF NOT EXISTS USE_FLOWERS\
				(\
					ID INTEGER NOT NULL,\
					FLOWER_ID INTEGER NOT NULL,\
					FOREIGN KEY (FLOWER_ID)\
					REFERENCES FLOWERS (ID)\
				)");
		tx.executeSql("\
				CREATE TABLE IF NOT EXISTS USE_ORGANS\
				(\
					ID INTEGER,\
					ORGAN_ID INTEGER NOT NULL,\
					FOREIGN KEY (ORGAN_ID)\
					REFERENCES ORGANS (ID)\
				)");
		tx.executeSql("\
				CREATE TABLE IF NOT EXISTS USE_TOOLS\
				(\
					ID INTEGER,\
					TOOL_ID INTEGER NOT NULL,\
					FOREIGN KEY (TOOL_ID)\
					REFERENCES TOOLS (ID)\
				)");
		
		
		tx.executeSql("CREATE INDEX IF NOT EXISTS AUTHOER_INDEXS ON AUTHOERS (USER_ID, TITLE, POSTING_DATE, LOCATE, SCHOOL, STYLE, ORGAN_ID);");
		tx.executeSql("CREATE INDEX IF NOT EXISTS AUTHOER_IMAGE_INDEXS ON AUTHOER_IMAGES (ID);");
		tx.executeSql("CREATE INDEX IF NOT EXISTS COMMENT_INDEXS ON COMMENTS (ID, SERVER_AUTHOER_ID);");
		tx.executeSql("CREATE INDEX IF NOT EXISTS FAVORITE_INDEXS ON FAVORITES (ID, SERVER_AUTHOER_ID);");
		tx.executeSql("CREATE INDEX IF NOT EXISTS FLOWER_INDEXS ON FLOWERS (ID, NAME, NAME_KANA, SEASON_MONTH);");
		tx.executeSql("CREATE INDEX IF NOT EXISTS ORGAN_INDEXS ON ORGANS (ID, NAME);");
		tx.executeSql("CREATE INDEX IF NOT EXISTS TOOL_INDEXS ON TOOLS (ID, NAME);");
		tx.executeSql("CREATE INDEX IF NOT EXISTS USE_FLOWER_INDEXS ON USE_FLOWERS (ID);");
		tx.executeSql("CREATE INDEX IF NOT EXISTS USE_ORGAN_INDEXS ON USE_ORGANS (ID);");
		tx.executeSql("CREATE INDEX IF NOT EXISTS USE_TOOL_INDEXS ON USE_TOOLS (ID);");
		
	}, 
	// 異常時
	function (err)
	{
		console.log(err);
		_calert('データ作成時にエラーが発生しました。', null, 'エラー');
	}, 
	// 成功時
	function ()
	{
	}
);


/* 以下テーブル操作関数 */
// SQL実行
function _tranQeury(sql, sqlArg, endedMethod)
{
	_objDB.transaction(
		// SQLを実行
		function(tx)
		{
			tx.executeSql(sql, sqlArg, endedMethod);
		}, 
		// 異常時
		function (err)
		{
			console.log(err);
			_calert('データ操作時にエラーが発生しました。', null, 'エラー');
		}, 
		// 成功時
		function ()
		{
		}
	);
}

// BIGEN-COMMIT用SQL実行
function _tranQeuries(txMethod, errMethod, sucMethod)
{
	// SQLを実行
	_objDB.transaction(txMethod, errMethod, sucMethod);
}

// テーブル参照
function _selectDatas(tableName, afterFn, where)
{
	if (where === undefined) {where =''}
	_tranQeury('SELECT * FROM ' + tableName + where, null, function(tx, results)
	{
		setInterval(afterFn(results.rows), 0);
	});
}

// テーブル追加
function _insertDatas(tableName, params, params2)
{
	var values = new Array();
	for (var i = 0; i < params.length; i++)
	{
		values.push('?');
	}
	var columns = '';
	if (params2 != null && params2 !== undefined)
	{
		var columnNames = new Array();
		for (var i = 0; i < params2.length; i++)
		{
			columnNames.push(params2[i]);
		}
		
		columns = ' (' + columnNames + ')';
	}
	_tranQeury('INSERT INTO ' + tableName + columns + ' VALUES (' + values.toString() + ')', params);
}

// テーブル削除
function _deleteDatas(tableName, params)
{
	var whereStr = params.toString().replace(/[^,]/g, '?');
	whereStr = whereStr.replace(/[,]/g, ' AND ');
	_tranQeury('DELETE FROM ' + tableName + ' WHERE ' + whereStr , params);
}

// 指定sql実行
function _sqlExcute(sql, afterFn)
{
	_tranQeury(sql, null, afterFn);
}
