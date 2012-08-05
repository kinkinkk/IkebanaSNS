// ready時
$(document).ready(function()
{
	var nowShowMenu = '#content_home';
	
	$('#lnk_home, #lnk_entry, #lnk_favorite, #lnk_search').bind('click', function()
	{
		//alert('b ' + nowShowMenu);
		$(nowShowMenu).hide().trigger('hideLayout');
		nowShowMenu = '#' + $(this).attr('id').replace('lnk', 'content');
		$(nowShowMenu).show().trigger('showLayout');
		//alert('a ' + nowShowMenu);
	});

	$('#lnk_home').click();



	// ダイアログ閉じるボタンを押下
	$('#vi_exit').bind('click', function()
	{
		$('#vi_picture').attr('src', '');
	});
});