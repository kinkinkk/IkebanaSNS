// bodyのオンロード時
$(document).ready(function() 
{
	$('#lnk_favorite').bind('vclick', function () 
	{
		_sqlExcute('SELECT AUTHOERS.*, AUTHOER_IMAGES.IMAGE FROM AUTHOERS LEFT JOIN AUTHOER_IMAGES ON AUTHOERS.AUTHOER_IMAGES_ID = AUTHOER_IMAGES.ID WHERE 0 < AUTHOER_IMAGES_ID ', function(tx, results) 
		{
			var rs = results.rows;
			
			$('#my_data_table').empty();
			
			var befID = 0;
			for (var i=0; i < rs.length; i++)
			{
				
				var item 		= rs.item(i);
				var imageTag 	= '';
				//if (item.IMAGE != null)
				{
					imageTag = '<img class=\'capture_images captured_image\' src=\'data:image/jpeg;base64,' + rs.item(i).IMAGE + '\' />';
				}
				
				if (befID != item.ID)
				{
					$('#my_data_table').append(
					'<tr>' + 
						'<td>' + rs.item(i).TITLE 	+ '</td>' + 
						'<td>' + imageTag + '</td>' +
					'</tr>');
					
				}
				/*
						'<td>' + item.ID 		+ '</td>' +
						'<td>' + item.USER_ID 	+ '</td>' +
						'<td>' + rs.item(i).AUTHOER_IMAGES_ID 	+ '</td>' +
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
						'<td>' + rs.item(i).UPDATE_DATE 	+ '</td>' +
				*/
				befID = item.ID;
			}
		});
	});
});