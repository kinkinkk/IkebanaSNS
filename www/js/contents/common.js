// ready時
$(document).ready(function()
{
	var nowShowMenu = '#lnk_search';
	
	$('#lnk_home, #lnk_entry, #lnk_favorite, #lnk_search').bind('vclick', function()
	{
		var nextMenu = '#' + $(this).attr('id').replace('lnk', 'content');
//		alert('a ' + nextMenu);

		if (nextMenu == nowShowMenu) { return; }

		$(nowShowMenu).hide(0, function()
		{
			$(nextMenu).show(0, function()
			{
				nowShowMenu = nextMenu;
//				alert('b ' + nowShowMenu);
			}).trigger('showLayout');
			
		}).trigger('hideLayout');
	});

	$('#lnk_home').click();


	// イメージダイアログ表示
	$('.capture_images').bind('click', function()
	{
		if ($(this).attr('src') == '') { return; }
	
		$.mobile.changePage('#view_image', {transition: 'pop', role: 'dialog'});

		$('#vi_picture').attr('src', $(this).attr('src'));
	});
	// イメージダイアログ閉じるボタンを押下
	$('#vi_exit').bind('click', function()
	{
		$('#vi_picture').attr('src', '');
	});
});