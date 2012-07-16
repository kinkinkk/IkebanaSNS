var _userID = 1;

// onload時
$(document).ready(function()
{
	// 初期データの作成
	// 初回時のみ
	_selectDatas('USERS', function (rs)
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
			$.mobile.changePage('#first_dialog', {transition: 'slidedown', role: 'dialog'});

			$('#call').live('vclick', function ()
			{
				if ($('#nickname').val() != '')
				{
					_insertDatas('USERS', [_userID, $('#nickname').val(), _uuID, null, null, _getNowDateTime(), null], ['ID', 'NICKNAME', 'AUTH_CODE', 'BIRTHDAY', 'IMAGE', 'CREATE_DATE', 'UPDATE_DATE']);
					$('#first_dialog').dialog('close');
				}
				else
				{
					_calert('お名前を入力してください。', null, 'お名前の入力');
				}
			});
		}
		else
		{
			//_calert(rs.item(0).AUTH_CODE + ':' + rs.item(0).NICKNAME);
		}
	});
});
