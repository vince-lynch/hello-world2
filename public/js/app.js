angular.module('app', [])

.controller('FrameController', ['$injector', '$http', function($injector, $http) {
  var vm = this;
  vm.message = 'Hello world';
  vm.messages = [];
  var sessionId = Math.floor(Math.random() * 99999) + 1;

  vm.sendMessage = function(messagetosend){
  	console.log('sendMessage', messagetosend);
  	vm.messages.push(messagetosend);

    $http({
	    method: 'POST',
	    url: '/api/question',
	    data: {"query": messagetosend, sessionId: sessionId}
	  }).then(function successCallback(response) {
	  	console.log('response', response.data);
	  	vm.messages.push(response.data);
	  })
  }

}]);

setTimeout(function() {
  angular.bootstrap(document.getElementById('body'), ['app']);
});
