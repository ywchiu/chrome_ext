// Updates
function update() {
	var items = '["' + $('.item .content').map(function() {
		return $(this).text();
	}).get().join('", "') + '"]';
	chrome.storage.sync.set({'wisbd':items});
}

// NewItem
function newItem(str) {
	var li = $('<li class="item"><span class="content">' + str + '</span><span class="widgets"><span class="remove"></span></span></li>');
	li.find('.remove').text('X');
	return li;
}

var i = 0;

$(document).ready(function() {
	// Keydown Action
	$('#next').bind('keydown', function(e) {
		// Handle new items
		if (e.keyCode == 13) {
			if ($('#next').val() != '') {
				$('#new-item').before(newItem($('#next').val()));
				update();
				$('#next').text('');
				e.preventDefault();
			}
		}
	}).click(function() {
		if ($('#next').val() == '...') {
			$('#next').val('');
		}
	});

	// Removing items
	$("#todo").on("click", ".remove", function() {
		$(this).parent().parent().replaceWith("");
		update();
	});

	// Set title as Things to do
	//$('h1').text('Things to do');
	chrome.storage.sync.get('title', function(data) {
		if (data != undefined) {
		$('h1').text(data['title']);
		}else{
			$('h1').text('Things to do');
		}
	});
	chrome.storage.sync.get('wisbd', function(data) {
		if (data != undefined) {
		    var todo = JSON.parse(data['wisbd']);
			for (var i = todo.length - 1; i >= 0; i--) {
				if (todo[i] != "") {
					$('#list').prepend(newItem(todo[i]));
				}
			}
		}
	});
	
	chrome.tabs.getSelected(null, function(tab) {
    //document.getElementById('currentLink').innerHTML = tab.url;
    console.log(tab.url);
    });

}); 