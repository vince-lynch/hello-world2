var screenshot = {
	content : document.createElement("canvas"),
	data : '',

	init : function() {
		this.initEvents();
	},
	
	saveScreenshot : function() {
		var image = new Image();
		image.onload = function() {
			var canvas = screenshot.content;
			canvas.width = image.width;
			canvas.height = image.height;
			var context = canvas.getContext("2d");
			context.drawImage(image, 0, 0);

			// save the image
			var link = document.createElement('a');
			link.download = "download.png";
			link.href = screenshot.content.toDataURL();
			link.click();
			screenshot.data = '';
		};
		image.src = screenshot.data; 
	},
	
	initEvents : function() {
		// listen for frontend to request a screenshot
		chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
			console.log("frontend is sending a message");
			chrome.tabs.captureVisibleTab(null, {
				format : "png",
				quality : 100
			}, function(data) {
				screenshot.data = data;

				screenshot.saveScreenshot();
				
			});
		});
	}
};

screenshot.init();


function initApp() {
	console.log('background.js init app called')
	
	// MESSAGING //
	// chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	// 	console.log("frontend is sending a message");
	// })

}






window.onload = function() {
  initApp();
};
