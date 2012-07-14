/* cordava系処理
 * ここに記載
 * */

var UUID = 'none';
// onload時
$(document).ready(function() 
{
	// デバイスの準備ができたか
	document.addEventListener('deviceready', function() 
	{
		// デバイス準備OK
		
		// UUID取得
		UUID = device.uuid;
		
		// カメラをクリック
		$('#camera').bind('vclick', function()
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
			function (err_message) 
			{
				if (err_message != 'no image selected') 
				{
					calert('カメラで写真を撮るときに失敗しました。', null, '撮影に失敗');
				}
			},
			// クオリティ
			{ quality: 20, allowEdit: true ,destinationType: Camera.DestinationType.DATA_URL });
			//{ quality: 60, destinationType: Camera.DestinationType.DATA_URL });
		});

		var isUseGeoTag = true;
		setTimeout(function () 
		{
			navigator.geolocation.getCurrentPosition(function (position) {isUseGeoTag = true;}, function (error) {isUseGeoTag = false;});
			
			if (isUseGeoTag)
			{
				// 位置情報取得
				$('#lnk_entry').bind('vclick', function()
				{
					setTimeout(function () 
					{
						navigator.geolocation.getCurrentPosition(function(position)
						{
							// 緯度取得
							var latitude = position.coords.latitude;
							// 経度取得
							var longitude = position.coords.longitude;
							
							var latlng = new google.maps.LatLng(latitude, longitude);
							var map = 
								new google.maps.Map(
										$('#map_zone').get(0),
										{ zoom: 16, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP } );
										
							// マップにマーカー追加
							(new google.maps.Marker({ position: latlng })).setMap(map);
						});
					}, 0);
				});
			}
		}, 0);
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

// codava通知アラート
function calert(message, alertCallback, title, buttonName)
{
	if (UUID != 'none')
	{
		navigator.notification.alert(message, alertCallback, title, buttonName);
	}
	else 
	{
		alert(message);
	}
}