// mobileinit時
$(document).bind('mobileinit', function()
{
	// 日本語化
	$.mobile.loadingMessage 									= '読込み中...';
	$.mobile.pageLoadErrorMessage 							= '読込みに失敗しました。';
	$.mobile.page.prototype.options.backBtnText 				= '戻る';
	$.mobile.dialog.prototype.options.closeBtnText 			= '閉じる';
	$.mobile.selectmenu.prototype.options.closeText			= '閉じる';
	$.mobile.listview.prototype.options.filterPlaceholder 	= 'ｷｰﾜｰﾄﾞを入力してください。';
	// 戻るボタンのラベル
	$.mobile.page.prototype.options.backBtnText 				= '戻る';
	// 戻るボタンを消す方法
	$.mobile.page.prototype.options.addBackBtn 				= true;
	// リンククリック時にAjaxする
	$.mobile.ajaxEnabled 									= true;
	// コントロールの装飾をしないためのセレクター
	//$.mobile.page.prototype.options.keepNative 				= '.data-role-none';
	// デフォルトのAjaxページ遷移のトランジション
	$.mobile.defaultTransition 								= 'slide';
	
//	$.mobile.selectmenu.prototype.options.icon 				= 'chevron-down';
	
});



// pageinit時
$(document).bind('pageinit', function()
{
	

});