	// bodyのオンロード時
	$(document).ready(function() 
	{
		
		const DB_NAME = "DEMO";
	
		// DBObject
		var objDB = window.openDatabase("IkebanaLocalDatabase", "1.0", "Ikebana Local用DB", 500000000);
		
		document.addEventListener("deviceready", function()
		{
			// DB接続
			
			if (objDB) 
			{
				// データベースの作成 
				tranQeury('CREATE TABLE IF NOT EXISTS $DB (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, data not null)');
			
			}
			else
			{
				alert("データベースストレージが使えません。");
			}
		});
		

		// テーブル参照
		function selectDatas()
		{
			tranQeury('SELECT * FROM $DB', function(tx, results)
			{
				$('#disp_table').empty();
				
				for (var i=0; i < results.rows.length; i++)
				{
					$('#disp_table').append(
						"<tr>" + 
							"<td>" + results.rows.item(i).id 	+ "</td>" +
							"<td>" + results.rows.item(i).data 	+ "</td>" +
						"</tr>");
				}
				// select文によって返される行数
				//alert(results.rows.length + "行が見つかりました。");
				
			});
		}
		
		
		// テーブル追加
		$('#ins_table').click(function()
		{
			tranQeury('INSERT INTO $DB (data) VALUES ("' + $('#target_text').val() + '")');
		});
		
		
		// テーブル削除
		$('#del_table').click(function()
		{
			tranQeury('DELETE FROM $DB WHERE data = "' + $('#target_text').val() + '"');
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
		
		// SQL実行
		function tranQeury(sql, endedMethod)
		{
		
			objDB.transaction(
				// SQLを実行
				function(tx)
				{
					sql = sql.replace(/\$DB/g, DB_NAME); 
					
					tx.executeSql(sql, [], endedMethod);
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
		selectDatas();
	});