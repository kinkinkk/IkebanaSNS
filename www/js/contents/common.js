// pageinit時
$(document).bind('pageinit', function()
{

	// ダイアログ閉じるボタンを押下
	$('#vi_exit').bind('vclick', function()
	{
		$('#vi_picture').attr('src', '');
	});
});