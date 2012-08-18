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
		
		// カメラをクリック　または　イメージをクリック
		$('a[name=\'pictures\']').bind('vclick', function()
		{
			var targetID 		= $(this).attr('id');

			// クオリティ
			var camera_param 	= { quality: 40, allowEdit: true, destinationType: Camera.DestinationType.DATA_URL };
	
			var targetImage = null;
			if (0 <= targetID.indexOf('camera'))
			{
				targetImage 					= targetID.replace('camera', 'cap_image');
				camera_param['sourceType'] 		= Camera.PictureSourceType.CAMERA;
			}
			else
			{
				targetImage 					= targetID.replace('pic_select', 'cap_image');
				camera_param['sourceType'] 		= Camera.PictureSourceType.SAVEDPHOTOALBUM;
			}

			// カメラ起動
			navigator.camera.getPicture(function(data)
			{
				$.mobile.showPageLoadingMsg();
				$('#' + targetImage)
					.attr('src', 'data:image/jpeg;base64,' + data)
					.attr('border', '0')
					.addClass('.captured_image');
				_captureDatas[targetImage] = data;
				$.mobile.hidePageLoadingMsg();
			}, 
			// 失敗時
			function (err_message)
			{
				$.mobile.hidePageLoadingMsg();
				if (err_message != 'no image selected') 
				{
					_calert('カメラで写真を撮るときに失敗しました。', null, '撮影に失敗');
				}
			},
			// クオリティ
			camera_param);
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

								google.maps.event.addListener(map, 'domready', function() {
								alert(1);
								});
								

								$('#map_zone').parent().parent().prev().attr('style', '-moz-border-radius: 15px;-webkit-border-radius: 15px; border-radius: 15px; margin-bottom: -3px;');

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
			else
			{
				$('#location_use').slider('disable');
			}
		}, 0);
	}, false);
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

function _confirm(message, alertCallback, title, buttonNames)
{
	if (_uuID != 'none')
	{
		navigator.notification.confirm(message, alertCallback, title, buttonNames);
	}
	else 
	{
		alert(message);
	}
}