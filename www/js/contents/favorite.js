// bodyのオンロード時
$(document).ready(function() 
{
	$('#lnk_favorite').bind('vclick', function () 
	{
		_sqlExcute('SELECT AUTHOERS.*, AUTHOER_IMAGES.BRANCH_ID , AUTHOER_IMAGES.IMAGE FROM AUTHOERS LEFT JOIN AUTHOER_IMAGES ON AUTHOERS.AUTHOER_IMAGES_ID = AUTHOER_IMAGES.ID WHERE 0 < AUTHOER_IMAGES_ID ORDER BY AUTHOERS.ID, AUTHOER_IMAGES.ID ', function(tx, results) 
		{
			var rs = results.rows;
			
			$('#my_data_table').empty();
			
			var imageTag 	= '';
			var imgCount 	= 0;
			for (var i = 0; i < rs.length; i++)
			{
				var item 	= rs.item(i);
				var nextItem= 0;
				
				if (item.IMAGE != null)
				{
					imageTag += '<img class=\'capture_images captured_image\' src=\'data:image/jpeg;base64,' + item.IMAGE + '\' style=\'position: absolute; top: 0; z-index: ' + (2 - imgCount) + '; left: ' + (10 * imgCount) + 'px;\' />';
					imgCount++;
				}

				if ((i + 1) < rs.length)
				{
					nextItem = rs.item(i + 1);
					if (nextItem.ID != item.ID)
					{
						createTrTd(item.TITLE, imageTag);
						imageTag = '';
						imgCount = 0;
					}
				}
				else
				{
					createTrTd(item.TITLE, imageTag);
				}
					

/*						$('#my_data_table').append(
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
							'<td>' + rs.item(i).UPDATE_DATE 	+ '</td>' +'</tr>');
*/					
			}
		});
	});
	
	function createTrTd(title, imageTag)
	{
		$('#my_data_table').append(
		'<tr valign=\'top\' style=\'height: 90px;\'>' + 
			'<td width=\'60%\'>' + title + '</td>' + 
			'<td><div style=\'position: relative;\'>' + imageTag + '</div></td>' +
		'</tr>');
	}	
});