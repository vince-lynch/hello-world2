
function initApp() {
 

  initMessaging();
	askBackgroundToOpenJobSiteTabs()
}



// When user open the window check if we are connected to fb
function askBackgroundToOpenJobSiteTabs(e) {
 chrome.extension.sendMessage({message: 'openTabs'});
}

// Inform user when facebook is connected
function initMessaging() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('message from background.js', request);
    }
  );
}





window.onload = function() {
  initApp();
};
