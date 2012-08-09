// ready時
$(document).ready(function()
{
	var thisContent = '#content_home';

	// コンテンツ表示時
	$(thisContent).bind('showLayout', function()
	{
		$('#sub_menu').empty();
	});


});
