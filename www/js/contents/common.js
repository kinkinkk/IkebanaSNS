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


	setTimeout(function () 
	{
		$('div > input[type=\'text\'], div > textarea').map(function() 
		{
			if ($(this).prev('label').html() != null)
			{
				$(this).attr('placeholder', $(this).prev('label').children(':not(.ui-icon-alt, .ui-icon)').html() + 'を入力してください。');
			}
		});
	}, 0);


	var tmpContents = '';
	// イメージダイアログ表示
	$('.capture_images').bind('vclick', function()
	{
		if ($(this).attr('src') == '') { return; }
	
		$.mobile.changePage('#view_image', {transition: 'pop', role: 'dialog'});

		$('#vi_picture').attr('src', $(this).attr('src'));
	});
	// イメージダイアログ閉じるボタンを押下
	$('#vi_exit').bind('vclick', function()
	{
		$('#vi_picture').attr('src', '');
		
		$('#view_image').dialog('close');
			
		$(nowShowMenu).trigger('hideviewimage');
	});
});