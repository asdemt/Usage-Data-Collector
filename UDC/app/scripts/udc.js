"use strict";

(function(global){
	(function (root, factory) {
	    if (typeof define === 'function' && define.amd) {
	    	define(['jquery'], factory);
	    } else if (typeof exports === 'object') {
	        module.exports = factory(require('jquery'));
	    } else {
	        // Browser globals (root is window)
	        // root.returnExports = factory(root.jQuery, root._);
	    }
	} (this, function($) {

		function UDC() {

			// Function for getting URL parameters
	    function GetURLParameter(sParam){
	      var sPageURL = window.location.search.substring(1);
	      var sURLVariables = sPageURL.split('&');
	      for (var i = 0; i < sURLVariables.length; i++)
	      {
	          var sParameterName = sURLVariables[i].split('=');
	          if (sParameterName[0] == sParam)
	          {
	              return sParameterName[1];
	          }
	      }
	    }

	    // Get the analyticslog parameter from the URL's end==> "/?analyticslog=on"
	    var analyticslog = GetURLParameter('analyticslog');
			if (window.sessionStorage) {
				sessionStorage.setItem("SESSION_STORAGE_ANALYTICS_LOG", analyticslog );
			}

			if(analyticslog === "on"){
				console.log("INFO: UDC module loaded");
			}

			// Setting userIds
			if (window.localStorage) {
			  if(localStorage.getItem("LOCAL_STORAGE_USER_ID") === null){

			  	localStorage.setItem("LOCAL_STORAGE_USER_ID", Math.random().toString(36).substr(2, 9));
			  }
				if(analyticslog === "on"){
					console.log("INFO: UserId:" + localStorage.getItem("LOCAL_STORAGE_USER_ID"));
				}
			}

			// Setting tab-separating sessions
			// window.sessionStorage
			if (window.sessionStorage) {
			  if(sessionStorage.getItem("SESSION_STORAGE_SESSION_ID") === null){

			  	sessionStorage.setItem("SESSION_STORAGE_SESSION_ID", Math.random().toString(36).substr(2, 9));
			  }
				if(analyticslog === "on"){
					console.log("INFO: SessionId:" + sessionStorage.getItem("SESSION_STORAGE_SESSION_ID"));
				}
			}


		}

		function sendEvent(dom_element, event_type, element_type, userId, sessionId, timestamp, target, targetBaseURI, targetValue, targetInnerText, targetId){
			$.ajax({
        url: "http://localhost:3000/events.json",// "http://10.92.81.69/events.json",
        type: "POST",
        data: {
          //event:{event_type: e.type, target: e.target.id, count: "1", host: e.target.ownerDocument.referrer, widget: e.target.ownerDocument.title}
					event:{
						targetSelector: element_type,
						eventType: event_type,
						userId: userId,
						sessionId: sessionId,
						timestamp: timestamp,
          	target: dom_element,
          	targetBaseURI: targetBaseURI,
          	targetValue: targetValue,
          	targetInnerText: targetInnerText,
						targetId: targetId
					}
        },
        dataType: "json"
    	});
		}

		function instrument( dom_element, event_type, element_type){

			// Add the namespace to the event type parameter(s)
			event_type = event_type + ".analytics";

			var analyticslog = "off";

			if (window.sessionStorage) {
				if (sessionStorage.getItem("SESSION_STORAGE_ANALYTICS_LOG") ){
					analyticslog = sessionStorage.getItem("SESSION_STORAGE_ANALYTICS_LOG");
				}
			}

			$( dom_element ).on( event_type, element_type, function(event) {
				if(analyticslog === "on"){
					console.log("ANALYTICS:  EVENT BEGIN");

					// Log the whole event
					console.log("ANALYTICS: Event object:");
					console.log(event);

					// Event timeStamp
					console.log("ANALYTICS: Event timeStamp:");
					console.log(Math.round(new Date().getTime()/1000.0)); //console.log(event.timeStamp);
				}
				var timestamp = Math.round(new Date().getTime()/1000.0); // Now in seconds since epoch + timezone.

				// Check if the event's target (element) has any info.
				if (event.target){
					if(analyticslog === "on"){
						console.log("ANALYTICS: Event.target object:");
						console.log(event.target);
					}
					var target = event.target;

					// BaseURI should provide us with some valuable pieces of data.
					if (event.target.baseURI){
						if(analyticslog === "on"){
							console.log("ANALYTICS: BaseURI:");
							console.log(event.target.baseURI);
						}
						var targetBaseURI = event.target.baseURI;
					} else {
						var targetBaseURI = "";
					}

					// Event target's value is usually ?button text or text area value?
					if (event.target.value !== null && event.target.value !== undefined &&
						event.target.value !== "" ){

						if(analyticslog === "on"){
							console.log("ANALYTICS: Event.target.value:");
							console.log(event.target.value);
						}
						var targetValue = event.target.value;
					} else {
						var targetValue = "";
					}

					var targetInnerText = "";

					if (event_type === "filter.analytics") {
						var f = 0;
						var filterQstr = "";
						var filterinfo = $(dom_element).jqxGrid('getfilterinformation');
						$.each(filterinfo, function( i, val){
							filterQstr += "&filterdatafield"+f+"="+filterinfo[i].datafield;
							filterQstr += "&"+filterinfo[i].datafield+"operator="+filterinfo[i].filter.operator;
							$.each(filterinfo[i].filter.getfilters(), function(x){
								filterQstr += "&filtervalue"+f+"="+filterinfo[i].filter.getfilters()[x].value;
								filterQstr += "&filtercondition"+f+"="+filterinfo[i].filter.getfilters()[x].condition;
								filterQstr += "&filteroperator"+f+"="+filterinfo[i].filter.getfilters()[x].operator;
								//add up filters:
								f += 1;
							});
						});
						console.log("Filter event args:");
						console.log(filterQstr);
					}
					else if (event_type === "columnreordered.analytics" ||
									 event_type === "sort.analytics" ||
									 event_type === "groupschanged.analytics" ||
								 	 event_type === "resize.analytics") {
						console.log("jqxGrid own event args:");
						console.log(event.args);
					}
					// innerText can be e.g. a button text.
					else if (event.target.innerText !== null &&
						event.target.innerText !== undefined &&
						event.target.innerText !== "" ) {

						if(analyticslog === "on"){
							console.log("ANALYTICS: Event.target.innerText:");
							console.log(event.target.innerText);
						}

						var targetInnerText = event.target.innerText;
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

						if(analyticslog === "on"){
							console.log("ANALYTICS: Event.target.id:");
							console.log(event.target.id);
						}

						var targetId = event.target.id;
					} else {
						var targetId = "";
					}

					var userId = "";
					var sessionId = "";

					if (window.localStorage) {
						userId = localStorage.getItem("LOCAL_STORAGE_USER_ID");
					}

					if (window.localStorage) {
						sessionId = sessionStorage.getItem("SESSION_STORAGE_SESSION_ID");
					}

					sendEvent(dom_element, event_type, element_type, userId, sessionId, timestamp, target, targetBaseURI, targetValue, targetInnerText, targetId);
				}

				if(analyticslog === "on"){
					console.log("ANALYTICS:  EVENT END");
				}
			});
		}

		UDC.prototype.startTracking = function( dom_element, event_type, element_type ) {

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
  		$( "body" ).off( ".analytics");
		};

		return UDC;
	}));
})(this);
