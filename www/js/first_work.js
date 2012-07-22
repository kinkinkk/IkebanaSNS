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
			$.mobile.changePage('#first_dialog', {transition: 'slidedown', role: 'dialog'});

			$('#call').live('vclick', function ()
			{
				if ($('#nickname').val() != '')
				{
					_insertDatas(
						'USERS', 
						[_userID, $('#nickname').val(), _uuID, null, null, _getNowDateTime(), null], 
						['ID', 'NICKNAME', 'AUTH_CODE', 'BIRTHDAY', 'IMAGE', 'CREATE_DATE', 'UPDATE_DATE']);
					$('#first_dialog').dialog('close');
				}
				else
				{
					_calert('ニックネームを入力してください。', null, 'ニックネームの入力');
				}
			});
		}
		else
		{
			//_calert(rs.item(0).AUTH_CODE + ':' + rs.item(0).NICKNAME);
		}
	});
});
