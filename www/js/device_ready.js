/* cordava系処理
 * ここに記載
 * */
$(document).ready(function() 
{
	// デバイスの準備ができたか
	document.addEventListener("deviceready", function() 
	{
		// デバイス準備OK
		
		// カメラをクリック
		$("#camera").click( function()
		{
			// カメラ起動
			navigator.camera.getPicture( function(data) 
			{
				$("#image").attr("src", "data:image/jpeg;base64," + data);
			}, 
			// 失敗時
			function (err_message) {
				//alert("camera error:" + err_message);
				alert("カメラで写真を撮るときに失敗しました。");
			}, 
			// クオリティ
			{ quality: 60, destinationType: Camera.DestinationType.DATA_URL });
		});
	});
});