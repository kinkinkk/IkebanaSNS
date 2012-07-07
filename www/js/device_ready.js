/* cordava系処理
 * ここに記載
 * */
$(document).ready(function() 
{
	// デバイスの準備ができたか
	document.addEventListener('deviceready', function() 
	{
		// デバイス準備OK
		
		// カメラをクリック
		$('#camera').click(function()
		{
			// カメラ起動
			navigator.camera.getPicture(function(data)
			{
				$('.selected_image > img')
					.attr('src', 'data:image/jpeg;base64,' + data)
					.attr('border', '0')
					.addClass('.captured_image');
			}, 
			// 失敗時
			function (err_message) {
				if (err_message != 'no image selected') 
				{
					alert('カメラで写真を撮るときに失敗しました。');
				}
			}, 
			// クオリティ
			{ quality: 20, allowEdit: true ,destinationType: Camera.DestinationType.DATA_URL });
			//{ quality: 60, destinationType: Camera.DestinationType.DATA_URL });
		});
		
		
	});
	
	// TEST CODE
	/*
	$('#camera').click(function()
	{
		$('.selected_image > img')
			.attr('src', '/Users/kanazawa/Documents/cat.jpg')
			.attr('border', '0')
			.addClass('captured_image');
	});
	*/
});