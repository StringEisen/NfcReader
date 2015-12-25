
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
		console.log("Starting NFC Reader app");
    },
    // Bind Event Listeners
    //
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    onDeviceReady: function() {
        
		nfc.addTagDiscoveredListener(
		app.onNfc,
		function (status) {
			app.display("Tap a tag to read its id number.");
		},
		function (error) {
			app.display("NFC reader failed to initialize" + 
			JSON.stringify(error));
		}
	  );
    },
    /*
	从nfcEvent参数中获取tag ID
	*/
	onNfc: function(nfcEvent) {
		var tag = nfcEvent.tag;
		app.display("Read tag: " + nfc.bytesToHexString(tag.id));
	},
	/*
	将message参数显示在messageDiv中
	*/
	display: function(message) {
		var label = document.createTextNode(message),
		lineBreak = document.createElement("br");
		messageDiv.appendChild(lineBreak);
		messageDiv.appendChild(label);
	},
	/*
	clears the message div
	*/
	clear: function() {
		messageDiv.innerHTML = "";
	},
	
	// Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();