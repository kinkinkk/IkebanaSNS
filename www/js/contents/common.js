// ready時
$(document).ready(function()
{
	var nowShowMenu = '#content_home';
	
	$('#lnk_home, #lnk_entry, #lnk_favorite, #lnk_search').bind('click', function()
	{
		//alert('b ' + nowShowMenu);
		var nextMenu = '#' + $(this).attr('id').replace('lnk', 'content');

		$(nowShowMenu).hide(0, function()
		{
			$(nextMenu).show(0, function()
			{
				//alert('a ' + nowShowMenu);
				nowShowMenu = nextMenu;
			}).trigger('showLayout');
			
		}).trigger('hideLayout');
	});

	$('#lnk_home').click();


	// イメージダイアログ表示
	$('.capture_images').bind('click', function()
	{
		setTimeout(function ()
		{
			$.mobile.changePage('#view_image', {transition: 'pop', role: 'dialog'});

			$('#vi_picture').attr('src', $(this).attr('src'));
		}, 0);
	});
	// イメージダイアログ閉じるボタンを押下
	$('#vi_exit').bind('click', function()
	{
		$('#vi_picture').attr('src', '');
	});
});