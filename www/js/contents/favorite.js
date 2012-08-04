// pagebeforecreate時
$(document).bind('pagebeforecreate' ,function()
{
	var thisContent = '#content_favorite';

	// コンテンツ表示時
	$(thisContent).bind('showLayout', function()
	{
		$('#sub_menu').append('<div data-role=\'navbar\'><ul><li><a href=\'#\' id=\'sub_menu_other\'>みんな</a></li><li><a href=\'#\' id=\'sub_menu_my\'>自分</a></li></ul></div>');
		$('#sub_menu > div').navbar();
		
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
		
		$('#my_datas').hide();
		$('#sub_menu_my').click();
		
		
	
		// 自分の分読み込み
		_sqlExcute('\
			SELECT \
				AUTHOERS.*, \
				AUTHOER_IMAGES.BRANCH_ID, \
				AUTHOER_IMAGES.IMAGE \
			FROM \
				AUTHOERS \
			LEFT JOIN \
				AUTHOER_IMAGES \
			ON \
				AUTHOERS.AUTHOER_IMAGES_ID = AUTHOER_IMAGES.ID \
			AND \
				BRANCH_ID = 1 \
			WHERE \
				0 < AUTHOER_IMAGES_ID \
			ORDER BY \
				AUTHOERS.ID, \
				AUTHOER_IMAGES.ID',
			function(tx, results)
		{
			$.mobile.showPageLoadingMsg();
		
			var rs = results.rows;
			
			var imageTag 	= '';
			for (var i = 0; i < rs.length; i++)
			{
				var item 	= rs.item(i);
				var nextItem= 0;
				
				if (item.IMAGE != null)
				{
					imageTag = '<img src=\'data:image/jpeg;base64,' + item.IMAGE + '\' />'
				}

				$('#my_datas > ul').append('<li><a href=\'#\'>' + imageTag + item.TITLE + '</a></li>');
				$('#my_datas > ul').listview('refresh');
				
				$.mobile.hidePageLoadingMsg();
				
					/*$('#my_data_table').append(
						'<tr style=\'height: 90px;\'>' + 

							'<td>' + item.ID 		+ '</td>' +
							'<td>' + item.USER_ID 	+ '</td>' +
							'<td>' + rs.item(i).AUTHOER_IMAGES_ID 	+ '</td>' +
							'<td>' + rs.item(i).BRANCH_ID 	+ '</td>' +
							'<td>' + rs.item(i).POSTING_DATE 	+ '</td>' +
							'<td>' + rs.item(i).LOCATE 	+ '</td>' +
							'<td>' + rs.item(i).SCHOOL 	+ '</td>' +
							'<td>' + rs.item(i).STYLE 	+ '</td>' +
							'<td>' + rs.item(i).ORGAN_ID 	+ '</td>' +
							'<td>' + rs.item(i).USE_FLOWER_ID 	+ '</td>' +
							'<td>' + rs.item(i).USE_TOOL_ID 	+ '</td>' +
							'<td>' + rs.item(i).APPEAL 	+ '</td>' +
							'<td>' + rs.item(i).CHECK_POINT 	+ '</td>' +
							'<td>' + rs.item(i).CREATE_DATE 	+ '</td>' +
							'<td>' + rs.item(i).UPDATE_DATE 	+ '</td>' +'</tr>');*/
			}
		});
	});
	
	// コンテンツ非表示時
	$(thisContent).bind('hideLayout', function()
	{
		$('#sub_menu, #other_datas > ul, #my_datas > ul').empty();
	});

});