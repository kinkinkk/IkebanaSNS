// onload時
$(document).ready(function()
{
	// 初期データの作成
	// 初回時のみ
	selectDatas('USERS', function (rs)
	{
		if (rs.length == 0)
		{
			// ダイアログの内容
			var dialog_html = [
			'<div data-role=\'page\' id=\'first_dialog\'>',
			'<div data-role=\'content\'><p>あなたのお名前を記入してください</p>',
			'<input type=\'text\' id=\'nickname\' value=\'\' maxlength=\'100\'>',
			'<a href=\'#\' id=\'call\' data-role=\'button\' data-theme=\'b\'>決 定</a></div>',
			'</div>'].join('');
			
			// DOMに追加
			$('body').append($(dialog_html));
			$.mobile.changePage('#first_dialog', {transition: 'pop', role: 'dialog'});

			$('#call').live('click', function ()
			{
				if ($('#nickname').val() != '')
				{
					insertDatas('USERS', [0, $('#nickname').val(), UUID, null, null, getNowDateTime(), null]);
					$('#first_dialog').dialog('close');
				}
				else
				{
					calert('お名前を入力してください。', null, 'お名前の入力');
				}
			});
		}
		else
		{
			calert(rs.item(0).AUTH_CODE + ':' + rs.item(0).NICKNAME);
		}
	});
});
