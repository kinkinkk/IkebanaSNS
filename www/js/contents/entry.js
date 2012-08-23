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
		_locateInfo 		= null;
		
		$('#cap_image1, #cap_image2, #cap_image3').attr('src', '').attr('border', '1').removeClass('.captured_image').hide(0).show(0);

		$('#title, #school, #style, #appeal, #check_point, #school_value').val('');
		$('#organ, #flowers, #tools').val('0');
		$('#location_use').val('off').slider('refresh');
		$('#map_zone, #school_view').empty();
		
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
		
		var seqSchool = 1;
		_selectDatas('sqlite_sequence', function(rs)
		{
			if ( 0 < rs.length )
			{
				seqSchool = rs.item(0).seq + 1;
			}
		}, ' WHERE name=\'SCHOOLS\'');
		
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
				
				
				var targetSchool = $('#school_value').val();
				if (targetSchool == 'create')
				{
					tx.executeSql('INSERT INTO SCHOOLS (ID, NAME, NAME_KANA, BEFORE_SELECT) VALUES (?, ?, ?, ?)', [seqSchool, $('#school_view').html(), '', 1]);
					
					targetSchool = seqSchool;
				}
		
			
				tx.executeSql(
					'INSERT INTO AUTHOERS \
						(\'USER_ID\',\
						 \'TITLE\',\
						 \'AUTHOER_IMAGES_ID\',\
						 \'POSTING_DATE\',\
						 \'LOCATE\',\
						 \'SCHOOL_ID\',\
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
						  targetSchool, 
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
	
	
	// 流派ダイアログ表示
	$('#school').bind('vclick', function()
	{
		// 自分の分読み込み
		_sqlExcute('\
			SELECT \
				* \
			FROM \
				SCHOOLS \
			ORDER BY \
				NAME_KANA',
			function(tx, results)
		{
			var rs = results.rows;
			
			var addHtml  	= '';
			var textTag  	= '';
			for (var i = 0; i < rs.length; i++)
			{
				var item 	= rs.item(i);
				textTag 		= 	'<h3>' + item.NAME + '</h3>';
				if (0 < item.NAME_KANA.length)
				{
					textTag 	+= 	'<p>('  + item.NAME_KANA + ')</p>';
				}
								
				addHtml 	+= '<li><a href=\'#\' id=\'shool_datas-' + item.ID + '\'>' + textTag + '</a></li>';
			}
			setTimeout(function()
			{
				$('#school_datas > ul').html(addHtml).listview('refresh');
				
			}, 100);

			$.mobile.changePage('#school_list_dialog', { transition: 'pop', role: 'dialog', showLoadMsg: false });
		});
	});

	// 流派ダイアログ選択時
	$('#school_datas > ul > li a').live('click', function ()
	{
		$('#school_view').html($(this).children('h3').html());
		$('#school_value').val($(this).attr('id').replace('shool_datas-', ''));

		$('#school_list_dialog').dialog('close');
		$('#school_datas > ul').empty();
		setTimeout(function()
		{
			$.mobile.silentScroll(100);
		}, 200);
	});
	
	// 流派ダイアログ選択時
	$('#new_school_entry').bind('click', function()
	{
		$('#school_view').html($('#school_datas > form > div > input').val());
		$('#school_value').val('create');
	
		$('#school_list_dialog').dialog('close');
		$('#school_datas > ul').empty();
		setTimeout(function()
		{
			$.mobile.silentScroll(100);
		}, 200);
	});
	
	init();
});

