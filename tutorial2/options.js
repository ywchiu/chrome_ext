$(document).ready(function() {
	/*$('#submittitle').click(function() {
		alert($(settitle).val());
	});*/
	$('#submittitle').click(function() {
			chrome.storage.sync.set({'title':$("#settitle").val()}, function(){
				var opt = {
					type:"basic",
					title: "Revision",
					message: "Revising Titile",
					iconUrl: "icon.png"
				}
				chrome.notifications.create("submittitle", opt, function(){});
				// Close Tab
				//close();
			});
	});
});
