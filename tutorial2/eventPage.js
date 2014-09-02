var menuItem = { 
	"id": "addTodo",
	"title": "Add Todo",
	"contexts": ["selection"]
};
 
chrome.contextMenus.create(menuItem);
 
chrome.contextMenus.onClicked.addListener(function (clickData) {
	if(clickData.menuItemId == "addTodo" && clickData.selectionText) {
			chrome.storage.sync.get('wisbd', function(items) {
				var getText = JSON.parse(items.wisbd);
				getText.push(clickData.selectionText);
				var todolist = '["' + getText.join('", "')  + '"]';
				chrome.storage.sync.set( { 'wisbd' : todolist });
			});
		
	}
});

chrome.storage.onChanged.addListener(function(changes){
	chrome.browserAction.setBadgeText({"text": JSON.parse(changes.wisbd.newValue).length.toString()});
	
});
