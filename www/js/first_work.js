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
					_tranQeuries(
						function (tx)
						{
							tx.executeSql("INSERT INTO USERS (ID, NICKNAME, AUTH_CODE, BIRTHDAY, IMAGE, CREATE_DATE, UPDATE_DATE) VALUES (?,?,?,?,?,?,?);", [_userID, $('#nickname').val(), _uuID, null, null, _getNowDateTime(), null]);
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('池坊', 'いけのぼう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('いけばな京花傳', 'いけばなきょうかでん');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('五十鈴古流', 'いすずこりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('伊勢草木藤野流', 'いせそうもくふじのりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('一葉式いけ花', 'いちようしきいけばな');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('小原流', 'おはらりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('御室流', 'おむろりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('桂古流', 'かつらこりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('華道瑩心流', 'かどうえいしんりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('華道遠州', 'かどうえんしゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('華道表現派', 'かどうひょうげんは');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('華道高野山', 'かどうこうやさん');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('光風流', 'こうふうりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('広山流', 'こうざんりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('古流理恩会', 'こりゅうりおんかい');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('古流かたばみ会', 'こりゅうかたばみかい');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('古流松應会', 'こりゅうしょうおうかい');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('古流松藤会', 'こりゅうしょうとうかい');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('嵯峨御流', 'さがごりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('青山御流', 'せいざんごりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('正風華道 ', 'せいふうかどう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('石州流華道', 'せきしゅうりゅうかどう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('専慶流', 'せんけいりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('相阿弥流', 'そうあみりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('草月流', 'そうげつりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('月輪未生流', 'つきのわみしょうりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('日本生花司 松月堂古流', 'にほんせいかし しょうげつどうこりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('八代流', 'はちだいりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('未生流', 'みしょうりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('未生流笹岡', 'みしょうりゅうささおか');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('都古流', 'みやここりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('雅流', 'みやびりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('山村御流', 'やまむらごりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('容真御流', 'ようしんごりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('龍生派', 'りゅうせいは');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('日新流', 'にっしんりゅう');");
							tx.executeSql("INSERT INTO SCHOOLS (NAME, NAME_KANA) VALUES ('光輝流', 'こうきりゅう');");
						},
						function (err)
						{
							console.log(err);
							_calert('初期の登録に失敗しました', null, 'エラー');
						},
						function ()
						{
						}
					);						
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
