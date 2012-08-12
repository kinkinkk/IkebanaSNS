// ready時
$(document).ready(function()
{
	var thisContent = '#content_favorite';

	// コンテンツ表示時
	$(thisContent).bind('showLayout', function()
	{
		$('#sub_menu').empty();
	});

	// 初期化
	function init()
	{
		_captureDatas 	= { cap_image1: null, cap_image2: null, cap_image3: null };
		_locateInfo 	= '';
		
		$('#cap_image1, #cap_image2, #cap_image3').attr('src', '').attr('border', '1').removeClass('.captured_image').hide(0).show(0);

		$('#title, #school, #style, #appeal, #check_point').val('');
		$('#organ, #flowers, #tools').val('0');
		$('#location_use').val('off').slider('refresh');
		$('#map_zone').empty();
		
		$('#year').val(_getNowYear()).selectmenu('refresh');
		$('#month').val(_getNowMonth()).selectmenu('refresh');
		$('#day').val(_getNowDay()).selectmenu('refresh');
		
	}
	

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
					if (_captureDatas[cd] != null)
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
			
			
				tx.executeSql(
					'INSERT INTO AUTHOERS \
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
				
				// 通信
				
			},
			function (err)
			{
				console.log(err);
				_calert('投稿に失敗しました', null, 'エラー');
			},
			function ()
			{
				// クリア
				_calert('投稿しました', function () { init(); }, '投稿完了');
			}
		);
	});
	
	
	// 年の設定
	var nowYear = _getNowYear();
	var nowMonth = _getNowMonth();
	switch (nowMonth)
	{
		case '01' :
			// １月の場合のみ前年を表示
			$('#year')
				.append('<option value=\'' + (nowYear - 1) 	+ '\'>' + (nowYear - 1) + '年</option>')
				.append('<option value=\'' + nowYear 		+ '\'>' + nowYear 		+ '年</option>');
			break;
		case '12' :
			// １2月の場合のみ次年を表示
			$('#year')
				.append('<option value=\'' + nowYear 		+ '\'>' + nowYear 		+ '年</option>')
				.append('<option value=\'' + (nowYear + 1) 	+ '\'>' + (nowYear + 1) + '年</option>');
			break;
		default :
			$('#year')
				.append('<option value=\'' + nowYear 		+ '\'>' + nowYear 		+ '年</option>');
			break;
	}
	
	init();
});

