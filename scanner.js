function PortScanner() {}

PortScanner.prototype.init = function() {
	
	var self = this;
	
	//iterate over all elements with class "portscanner"
	$(".portscanner").each(function(index) {
		
		// split the content of the element into host and port 
		var target = $(this).text();		
		var parts = target.split(":");
		var host = parts[0];
		var port = parts[1];		
		
		// perform the check for the host and port 
		var element = $(this);
		self.check(function(target,port,status) {	
			
			// put the status into the element
			element.text(status);
			console.log(target + ":" + port + ": " + status);
		}, host, port, 1000);
	});
};

/**
 * My refrence is from http://www.gnucitizen.org/blog/javascript-port-scanner
 * https://www.gnucitizen.org/files/2006/08/jsportscanner.js
 */
PortScanner.prototype.check = function (callback, target, port, timeout) {
	// you can increase the timeout here...
	var timeout = (timeout == null)?1000:timeout;
	var img = new Image();
	
	img.onerror = function () {
		if (!img) return;
		img = undefined;
		callback(target, port, 'open');
	};
	
	img.onload = img.onerror;
	img.src = 'http://' + target + ':' + port;
	
	setTimeout(function () {
		if (!img) return;
		img = undefined;
		callback(target, port, 'closed');
	}, timeout);
};

var portscanner = new PortScanner();
