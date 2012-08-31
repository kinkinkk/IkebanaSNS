// ready時
$(document).ready(function()
{
	var thisContent = '#content_favorite';
	
	// コンテンツ表示時
	$(thisContent).bind('showLayout', function()
	{
		$.mobile.showPageLoadingMsg();
		
		$('#sub_menu').html('<div data-role=\'navbar\'><ul><li><a href=\'#\' id=\'sub_menu_other\'>みんな</a></li><li><a href=\'#\' id=\'sub_menu_my\'>自分</a></li></ul></div>');
		$('#sub_menu > div').navbar();
	
		$('#sub_menu_my').click();

		// 自分の分読み込み
		_sqlExcute('\
			SELECT \
				AUTHOERS.*, \
				MIN(AUTHOER_IMAGES.BRANCH_ID) AS BRANCH_ID, \
				MIN(AUTHOER_IMAGES.IMAGE) AS IMAGE, \
				SCHOOLS.NAME AS SCHOOL_NAME \
			FROM \
				AUTHOERS \
			LEFT JOIN \
				AUTHOER_IMAGES \
			ON \
				AUTHOERS.AUTHOER_IMAGES_ID = AUTHOER_IMAGES.ID \
			LEFT JOIN \
				SCHOOLS \
			ON \
				AUTHOERS.SCHOOL_ID = SCHOOLS.ID \
			WHERE \
				0 < AUTHOER_IMAGES_ID \
			GROUP BY \
				AUTHOERS.ID \
			ORDER BY \
				AUTHOERS.POSTING_DATE DESC, \
				AUTHOERS.ID, \
				AUTHOER_IMAGES.ID \
			LIMIT 30',
			function(tx, results)
		{
			var rs = results.rows;
			
			var imageTag 	= '';
			var textTag 	= '';
			
			var addHtml  	= '';
			
			for (var i = 0; i < rs.length; i++)
			{
				var item 	= rs.item(i);
				
				if (item.IMAGE != null)
				{
					imageTag = '<img src=\'data:image/jpeg;base64,' + item.IMAGE + '\' />'
				}
				
				textTag = 	'<h3>' + item.TITLE + '</h3>';
				textTag += 	'<p>'  + item.SCHOOL_NAME + '</p>';
				textTag += 	'<p class=\'ui-li-aside\'>'  + item.POSTING_DATE + '</p>';
				
				addHtml += '<li><a href=\'#\' name=\'my_datas\' id=\'my_datas-' + item.ID + '\'>' + imageTag + textTag + '</a></li>';
				
			}
			$('#my_datas > ul').html(addHtml).listview('refresh');
			
			//$('#my_datas > ul > li a img').wrap($('<div class=\'nailthumb-container\'></div>'));
			
			// サムネイル
			//$('.nailthumb-container').nailthumb({width:70, height:70, method:'resize', fitDirection:'top left' });
			//$('#my_datas > ul > li a img').unwrap();

			$.mobile.hidePageLoadingMsg();
			
		});
	});
	
	// コンテンツ非表示時
	$(thisContent).bind('hideLayout', function()
	{
		$('#sub_menu, #other_datas > ul, #my_datas > ul').empty();
	});


	$('#sub_menu_other').live('vclick', function ()
	{
		$('#my_datas').hide();
		$('#other_datas').show();
	});

	$('#sub_menu_my').live('vclick', function ()
	{
		$('#my_datas').show();
		$('#other_datas').hide();
	});
	

	
	// MYリストクリック
	$('#my_datas > ul > li a').live('click', function ()
	{
		
		var authoer_id = $(this).attr('id').replace('my_datas-', '');
		
		if (authoer_id === undefined) { return; }

		$.mobile.showPageLoadingMsg();

		$('#dd_cap_image1, #dd_cap_image2, #dd_cap_image3').attr('src', '').attr('border', '1').removeClass('captured_image');
		$('#dd_map_zone').removeClass('map_preview').attr('style', '');

		_sqlExcute('\
			SELECT \
				AUTHOERS.*, \
				AUTHOER_IMAGES.BRANCH_ID, \
				AUTHOER_IMAGES.IMAGE, \
				SCHOOLS.NAME AS SCHOOL_NAME \
			FROM \
				AUTHOERS \
			LEFT JOIN \
				AUTHOER_IMAGES \
			ON \
				AUTHOERS.AUTHOER_IMAGES_ID = AUTHOER_IMAGES.ID \
			LEFT JOIN \
				SCHOOLS \
			ON \
				AUTHOERS.SCHOOL_ID = SCHOOLS.ID \
			WHERE \
				AUTHOERS.ID = ' + authoer_id + ' \
			ORDER BY \
				AUTHOERS.ID, \
				AUTHOER_IMAGES.ID ',
			function(tx, results)
		{
			var rs = results.rows;
			
			var itemt = rs.item(0);
			
			$('#dd_header > h1').html(itemt.TITLE);
			
			for (var i = 0; i < rs.length; i++)
			{
				var item = rs.item(i);
				
				$('#dd_cap_image' + item.BRANCH_ID)
					.attr('src', 'data:image/jpeg;base64,' + item.IMAGE)
					.attr('border', '0')
					.addClass('.captured_image');
			}
			
			
			if (itemt.LOCATE != null)
			{
				$('#dd_map_zone').addClass('map_preview');
				var locate = itemt.LOCATE.split(',');
			}
			else
			{
				$('#dd_map_zone').html('位置情報登録なし');
			}
			
			$('#dd_date')		.html(itemt.POSTING_DATE);
			$('#dd_school')		.html(itemt.SCHOOL_NAME);
			$('#dd_style')		.html(itemt.STYLE);
			$('#dd_organ')		.html(itemt.ORGAN_ID);
			$('#dd_flowers')		.html(itemt.USE_FLOWER_ID);
			$('#dd_tools')		.html(itemt.USE_TOOL_ID);
			$('#dd_appeal')		.html(itemt.APPEAL);
			$('#dd_check_point').html(itemt.CHECK_POINT);
			
			$.mobile.hidePageLoadingMsg();
			
			// 移動
			setTimeout(function()
			{
				$.mobile.changePage('#data_detail', { transition: 'none' });

				if (itemt.LOCATE != null)
				{
					_viewGoogleMap('#dd_map_zone', locate[0], locate[1]);
				}
			}, 100);

		});
		

	});

	// タップホールド
	$('a[name=\'my_datas\']').live('taphold', function ()
	{
		// 削除ボタン表示
		// TODO
		var delTarget = $(this);
	
		setTimeout(function()
		{
			var targetDelTitle = delTarget.children('h3').html();
			_confirm(
				targetDelTitle + 'を削除しますか？',
				function(selectedButton)
				{
					if (selectedButton == 1)
					{
						// 削除実行
						var authoer_id = delTarget.attr('id').replace('my_datas-', '');
						
						_tranQeuries(
							function (tx)
							{
								tx.executeSql('DELETE FROM AUTHOER_IMAGES 	WHERE ID = ? ', [authoer_id]);
								tx.executeSql('DELETE FROM AUTHOERS 			WHERE ID = ? ', [authoer_id]);
								// 通信
								
							},
							function (err)
							{
								console.log(err);
								_calert(targetDelTitle + 'の削除に失敗しました', null, 'エラー');
							},
							function ()
							{
								// クリア
								//_calert(targetDelTitle + 'を削除しました', function () { $(thisContent).trigger('showLayout'); }, '削除完了');
								$(thisContent).trigger('showLayout');
							}
						);
					}
				},
				'削除確認', '削除,キャンセル' );
	
				delTarget.trigger('vmouseup');

		}, 200);
	});

	$(thisContent).bind('hideviewimage', function ()
	{
	});


});

