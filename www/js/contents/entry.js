// bodyのオンロード時
$(document).ready(function() 
{
	// 初期化
	function init()
	{
		_captureDatas 	= { cap_image1: null, cap_image2: null, cap_image3: null };
		
		$('#cap_image1, #cap_image2, #cap_image3').attr('src', '').attr('border', '1').removeClass('.captured_image');
		$('#title, #school, #style, #appeal, #check_point').val('');
		
		$('#year').val(_getNowYear()).selectmenu('refresh');
		$('#month').val(_getNowMonth()).selectmenu('refresh');
		$('#day').val(_getNowDay()).selectmenu('refresh');
		
	}
	init();
	setTimeout(function () 
	{
		$('div > input[type=\'text\'], div > textarea').map(function() 
		{
			$(this).attr('placeholder', $(this).parent().children('label').html() +'を入力してください。')
		});
	}, 0);
	
	
	$('#posting').click(function ()
	{
		var seqAuthoerImages = 1;
		// シーケンス取得
		_selectDatas('sqlite_sequence', function(rs)
		{
			if ( 0 < rs.length )
			{
				seqAuthoerImages = rs.item(0).seq;
			}
		}, ' WHERE name=\'AUTHOER_IMAGES\'');
		
		_tranQeuries(
			function (tx)
			{
				var isAuthoerImageIns = false;
				for (var cd in _captureDatas)
				{
					//if (_captureDatas[cd] != null)
					{
						tx.executeSql('INSERT INTO AUTHOER_IMAGES VALUES (?,?,?)', [seqAuthoerImages, cd.replace('cap_image', ''), _captureDatas[cd]]);
						isAuthoerImageIns = true;
					}
				}
				if (isAuthoerImageIns)
				{
					// シーケンス更新
					if (seqAuthoerImages == 1)
					{
						tx.executeSql('INSERT INTO sqlite_sequence VALUES (?,?)', ['AUTHOER_IMAGES', seqAuthoerImages + 1]);
					}
					else
					{
						tx.executeSql('UPDATE sqlite_sequence SET seq=? WHERE name=\'AUTHOER_IMAGES\'', [seqAuthoerImages + 1]);
					}
				}
				else
				{
					seqAuthoerImages = -1;
				}
			
			
				tx.executeSql('INSERT INTO AUTHOERS \
						(\'USER_ID\',\
						 \'TITLE\',\
						 \'AUTHOER_IMAGES_ID\',\
						 \'POSTING_DATE\',\
						 \'LOCATE\',\
						 \'SCHOOL\',\
						 \'STYLE\',\
						 \'ORGAN_ID\',\
						 \'USE_FLOWER_ID\',\
						 \'USE_TOOL_ID\',\
						 \'APPEAL\',\
						 \'CHECK_POINT\',\
						 \'CREATE_DATE\',\
						 \'UPDATE_DATE\') VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
						 [
						  _userID, 
						  $('#title').val(), 
						  seqAuthoerImages, 
						  _getNowYear() + '/' + $('#month :selected').val() + '/' + $('#day :selected').val(),
						  _locateInfo, 
						  $('#school').val(), 
						  $('#style').val(), 
						  $('#organ :selected').val(), 
						  $('#flowers :selected').val(), 
						  $('#tools :selected').val(), 
						  $('#appeal').val(), 
						  $('#check_point').val(), 
						  _getNowDateTime(), 
						  null
						 ]);
				
			},
			function (err)
			{
				console.log(err);
				_calert('投稿に失敗しました', null, 'エラー');
			},
			function ()
			{
				// クリア
				init();
				_calert('投稿しました', null, '投稿完了');
			}
		);
	});
			
	
});