// bodyのオンロード時
$(document).ready(function() 
{
	// DBObject
	var objDB = openDatabase("IkebanaLocalDB", "1.0", "IkebanaLocal用DB", 5000000);
	// DB接続
	if (objDB) 
	{
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
			)", "", null);
		
		tranQeury("\
			CREATE TABLE IF NOT EXISTS AUTHOERS\
			(\
				ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,\
				USER_ID INTEGER DEFAULT 1 NOT NULL,\
				NAME TEXT NOT NULL,\
				IMAGE BLOB,\
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
			)", "", null);
		
		tranQeury("\
			CREATE TABLE IF NOT EXISTS COMMENTS\
			(\
				ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\
				SERVER_AUTHOER_ID INTEGER NOT NULL,\
				CONTENT TEXT\
			)", "", null);

		tranQeury("\
			CREATE TABLE IF NOT EXISTS FAVORIT\
			(\
				ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\
				SERVER_AUTHOER_ID INTEGER NOT NULL UNIQUE\
			)", "", null);
		
		tranQeury("\
			CREATE TABLE IF NOT EXISTS FLOWERS\
			(\
				ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,\
				NAME TEXT NOT NULL,\
				NAME_KANA TEXT NOT NULL,\
				SEASON_MONTH NUMERIC NOT NULL,\
				IMAGE BLOB\
			)", "", null);
		
		tranQeury("\
			CREATE TABLE IF NOT EXISTS TOOLS\
			(\
				ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,\
				NAME TEXT NOT NULL,\
				IMAGE BLOB\
			)", "", null);
		
		tranQeury("\
			CREATE TABLE IF NOT EXISTS USE_FLOWERS\
			(\
				ID INTEGER NOT NULL,\
				FLOWER_ID INTEGER NOT NULL,\
				FOREIGN KEY (FLOWER_ID)\
				REFERENCES FLOWERS (ID)\
			)", "", null);
		
		tranQeury("\
			CREATE TABLE IF NOT EXISTS USE_TOOLS\
			(\
				ID INTEGER,\
				TOOL_ID INTEGER NOT NULL,\
				FOREIGN KEY (TOOL_ID)\
				REFERENCES TOOLS (ID)\
			)", "", null);
	}
	else
	{
		alert("データベースストレージが使えません。");
	}
	
	
	// SQL実行
	function tranQeury(sql, targetTable, sqlArg, endedMethod)
	{
	
		objDB.transaction(
			// SQLを実行
			function(tx)
			{
				sql = sql.replace(/\$TB/g, targetTable); 
				tx.executeSql(sql, sqlArg, endedMethod);
			}, 
			
			// 異常時
			function (err)
			{
				console.log(err);
				alert("エラーが発生しました。");
			}, 
			// 成功時
			function ()
			{
				if (endedMethod === undefined)
				{
					selectDatas();
				}
				//alert("成功しました。");
			}
		);
		

	}
	//selectDatas();
});


// テーブル参照
function selectDatas()
{
	/*
	tranQeury('SELECT * FROM $TB', "TOOLS", [], function(tx, results)
	{
		$('#disp_table').empty();
		
		for (var i=0; i < results.rows.length; i++)
		{
			$('#disp_table').append(
				"<tr>" + 
					"<td>" + results.rows.item(i).ID 	+ "</td>" +
					"<td>" + results.rows.item(i).NAME 	+ "</td>" +
				"</tr>");
		}
		// select文によって返される行数
		//alert(results.rows.length + "行が見つかりました。");
		
	});
	*/
}

// テーブル追加
$('#ins_table').click(function()
{
	tranQeury('INSERT INTO $TB VALUES (?, ?, ?)', "TOOLS", [1, $('#target_text').val(), null] );
});


// テーブル削除
$('#del_table').click(function()
{
	tranQeury('DELETE FROM $TB WHERE ID = ?', "TOOLS", [$('#target_text').val()] );
});

// エンターキーを押したときの挙動
$('#target_text').keypress(function (e) 
{
	if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) 
	{
		// 追加ボタンをクリック
		$('#ins_table').click();
		return false;
	}
});

