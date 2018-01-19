// JavaScript Document

pageSwitchCounter = 0;

// Set up routes
crossroads.addRoute('', function() {
	redirect();
});

crossroads.addRoute('{id}', function (id) {
	
	if (pageSwitchCounter === 0) {

		populate();
		loadPage(id, pageSwitchCounter);

		pageSwitchCounter++;

	} else {

		loadPage(id, pageSwitchCounter);
		var pageURL = '/' + id;
	
	}
	
});

// Setup hasher to listen for URL changes
function parseHash(newHash, oldHash){
	crossroads.parse(newHash);
}

hasher.initialized.add(parseHash);
hasher.changed.add(parseHash);
hasher.init();