//bodyのオンロード時
$(document).ready(function() 
{
	// 日本語化
	$.mobile.loadingMessage 								= '読込み中';
	$.mobile.pageLoadErrorMessage 							= '読込みに失敗しました';
	$.mobile.page.prototype.options.backBtnText 			= '戻る';
	$.mobile.dialog.prototype.options.closeBtnText 			= '閉じる';
	$.mobile.selectmenu.prototype.options.closeText			= '閉じる';
	$.mobile.listview.prototype.options.filterPlaceholder 	= '検索文字列...';

});