
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if(request.action == "priceExchange") {
		var price = $('#PriceTotal');
		price.text("USD " + (parseInt(price.text()) / 30))
	}
});
chrome.runtime.sendMessage({action:"show"});
