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
				$('#image1').attr('src', 'data:image/jpeg;base64,' + data);
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
		
		// 
		
		
		
	});
});