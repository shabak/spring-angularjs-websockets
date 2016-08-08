(function (angular, SockJS, Stomp, _) {
        
    angular.module("consumer", [])
        .controller('ConsumerController', function ($scope, MessageService) {
            
            $scope.messages = [];
            $scope.active = false;
            
            $scope.start = function() {
            	MessageService.PRODUCER_ID = $scope.producerId;
            	MessageService.initialize();
            	$scope.active = true;
            }
            
            $scope.stop = function() {
            	MessageService.PRODUCER_ID = null;
            	MessageService.unsubscribe();
            	$scope.active = false;
            }
            
            MessageService.receive().then(null, null, function(message) {
                $scope.messages.push(message);
            });
    
            $scope.isInt = function (n) {
         	   return n % 1 === 0;
         	}
            
        }).service('MessageService', function ($q, $timeout) {

            var service = {}, listener = $q.defer(), socket = {
                client: null,
                stomp: null
            };

            service.RECONNECT_TIMEOUT = 30000;
            service.SOCKET_URL = "/endpoint";
            service.QUEUE = "/queue/message/";
            service.PRODUCER_ID = null;

            service.receive = function () {
                return listener.promise;
            };

            var reconnect = function () {
                $timeout(function () {
                    initialize();
                }, service.RECONNECT_TIMEOUT);
            };

            var getMessage = function (data) {
                var message = JSON.parse(data), out = {};
                return message;
            };

            var subscription = null;
            var startListener = function () {
            	subscription = socket.stomp.subscribe(service.QUEUE + service.PRODUCER_ID, function (data) {
                    listener.notify(getMessage(data.body));
                });
            };

            service.unsubscribe = function () {
            	subscription.unsubscribe();
            };
            
            service.initialize = function () {
            	socket.client = new SockJS(service.SOCKET_URL);
                socket.stomp = Stomp.over(socket.client);
//                socket.stomp.debug = null;
                socket.stomp.connect({}, startListener);
                socket.stomp.onclose = reconnect;
            };

            return service;
        });    
})(angular, SockJS, Stomp, _);
