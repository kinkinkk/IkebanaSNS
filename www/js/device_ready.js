/* cordava系処理
 * ここに記載
 * */

var _uuID 			= 'none';
var _locateInfo 	= null;
var _captureDatas 	= null;


// onload時
$(document).ready(function() 
{
	// デバイスの準備ができたか
	document.addEventListener('deviceready', function() 
	{
		// デバイス準備OK
		
		// UUID取得
		_uuID = device.uuid;
		
		// カメラをクリック
		$('#camera1, #camera2, #camera3').bind('vclick', function()
		{
			var targetImage = $(this).attr('id').replace('camera', 'cap_image');
			// カメラ起動
			navigator.camera.getPicture(function(data)
			{
				$('#' + targetImage)
					.attr('src', 'data:image/jpeg;base64,' + data)
					.attr('border', '0')
					.addClass('.captured_image');
				_captureDatas[targetImage] = data;

			}, 
			// 失敗時
			function (err_message) 
			{
				if (err_message != 'no image selected') 
				{
					_calert('カメラで写真を撮るときに失敗しました。', null, '撮影に失敗');
				}
			},
			// クオリティ
			{ quality: 40, allowEdit: true ,destinationType: Camera.DestinationType.DATA_URL });
			//{ quality: 60, destinationType: Camera.DestinationType.DATA_URL });
		});

		var isUseGeoTag = true;
		setTimeout(function () 
		{
			navigator.geolocation.getCurrentPosition(function (position) {isUseGeoTag = true;}, function (error) {isUseGeoTag = false;});
			
			if (isUseGeoTag)
			{
				$('#location_use').bind('change', function() {
					if ($('#location_use :selected').val() == 'on')
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
											{ 
												zoom: 				16, 
												center: 			latlng, 
												disableDefaultUI: 	true, 
												panControl: 		false, 
												draggable: 			false,
												mapTypeId: 			google.maps.MapTypeId.ROADMAP } );
											
								// マップにマーカー追加
								(new google.maps.Marker({ position: latlng })).setMap(map);
								
								_locateInfo = latlng;
							});
						}, 0);
					}
					else
					{
						$('#map_zone').empty();
						_locateInfo = '';
					}
				});
			}
		}, 0);
	});
	/*
	// TEST CODE
	$('#camera1, #camera2, #camera3').click(function()
	{
		var targetImage = $(this).attr('id').replace('camera', 'cap_image');
		$('#' + targetImage)
			.attr('src', '/Users/kin/Documents/cat.jpg')
			.attr('border', '0')
			.addClass('captured_image');
	});
	*/
});

// codava通知アラート
function _calert(message, alertCallback, title, buttonName)
{
	if (_uuID != 'none')
	{
		navigator.notification.alert(message, alertCallback, title, buttonName);
	}
	else 
	{
		alert(message);
	}
}