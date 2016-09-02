"use strict";

(function(global){
	define(['jquery'], function ($) {

		function UDC() {
			console.log("INFO: UDC module loaded");
		}

		function sendEvent(timestamp, target, targetBaseURI, targetValue, targetInnerText, targetId, e){ // TODO: Remove e
			$.ajax({
        url: "http://localhost:3000/events.json", // TODO: Change to 10.92.81.69/posts.json and to events.json eventually..
        type: "POST",
        data: {
          //event_type: e.type,
          //target: e.target.id,
          //count: "1",
          //host: e.target.ownerDocument.referrer,
          //widget: e.target.ownerDocument.title,
          event:{event_type: e.type, target: e.target.id, count: "1", host: e.target.ownerDocument.referrer, widget: e.target.ownerDocument.title}
					/* TODO: Change backend to support these new data types.
					timestamp: timestamp,
          target: target,
          targetBaseURI: targetBaseURI,
          targetValue: targetValue,
          targetInnerText: targetInnerText,
					targetId: targetId,
          event:{
						timestamp: timestamp,
          	target: target,
          	targetBaseURI: targetBaseURI,
          	targetValue: targetValue,
          	targetInnerText: targetInnerText,
						targetId: targetId
					}
					*/
        },
        dataType: "json"
    	});
		}

		function instrument( dom_element, event_type, element_type){

			// Add the namespace to the event type parameter(s)
			// TODO: check if there is an array of event types
			event_type = event_type + ".analytics";

			//var event_info = {};

			$( dom_element ).on( event_type, element_type, function(event) {
				console.log("ANALYTICS:  EVENT BEGIN");

				// Log the whole event
				console.log("ANALYTICS: Event object:");
				console.log(event);
				//event_info << ["Event object", event];

				// Event timeStamp
				console.log("ANALYTICS: Event timeStamp:");
				console.log(event.timeStamp);
				var timestamp = event.timestamp;
				//event_info << ["Event timeStamp",event.timeStamp];

				// Check if the event's target (element) has any info.
				if (event.target){
					console.log("ANALYTICS: Event.target object:");
					console.log(event.target);
					var target = event.target;

					// BaseURI should provide us with some valuable pieces of data.
					if (event.target.BaseURI){
						console.log("ANALYTICS: BaseURI:");
						console.log(event.target.BaseURI);
						var targetBaseURI = event.target.BaseURI;
					} else {
						var targetBaseURI = "";
					}

					// Event target's value is usually ?button text or text area value?
					if (event.target.value !== null && event.target.value !== undefined &&
						event.target.value !== "" ){

						console.log("ANALYTICS: Event.target.value:");
						console.log(event.target.value);
						var targetValue = event.target.value;
					} else {
						var targetValue = "";
					}

					// innerText can be e.g. a button text.
					if (event.target.innerText !== null &&
						event.target.innerText !== undefined &&
						event.target.innerText !== "" ) {

						console.log("ANALYTICS: Event.target.innerText:");
						console.log(event.target.innerText);

						var targetInnerText = event.target.innerText;
					} else {
						var targetInnerText = "";
					}

					/*
					// nextSibling can provide us with information on button text..?
					if ( event.target.nextSibling !== null &&
						event.target.nextSibling.data !== null &&
						event.target.nextSibling.data !== undefined &&
						event.target.nextSibling.data !== "" ) {

						console.log("Event.target.nextSibling.data:");
						console.log(event.target.nextSibling.data);
					}
					*/

					// ID should be the DOM element's id.
					if (event.target.id !== null &&
						event.target.id !== undefined &&
						event.target.id !== "" ) {

						console.log("ANALYTICS: Event.target.id:");
						console.log(event.target.id);

						var targetId = event.target.id;
					} else {
						var targetId = "";
					}

					sendEvent(timestamp, target, targetBaseURI, targetValue, targetInnerText, targetId, event); // TODO: Remove event
				}

				console.log("ANALYTICS:  EVENT END");
				//alert( event_info );
			});
		}

		UDC.prototype.startTracking = function( dom_element, event_type, element_type ) {

			console.log("INFO: Setting analytics on");
			$(document).ready(function () {
				// Instrument parameters
	  		// 1. dom_element can be "#id", ".class", or "type"
	  		// 2. event_type can be "click", "change", "select" or whatever + their combination separated with a space
	  		// 3. element_type
	  		instrument( dom_element, event_type, element_type );
			});
		};

		UDC.prototype.stopTracking = function() {
			// Unbind all analytics related events
			console.log("INFO: Setting analytics off");
  		$( "body" ).off( ".analytics");
		};

		UDC.prototype.test = function() {
			console.log("DEBUG: Test function is logging");
		};

		return UDC;
	});
})(this);
