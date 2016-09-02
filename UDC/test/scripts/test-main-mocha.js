require.config({
	baseUrl : '.',
	paths : {
		'udc' 			: '../app/scripts/udc',
		'chai' 			: '../node_modules/chai/chai',
		'jquery'		: '../node_modules/jquery/dist/jquery',
		'sinon'			:	'../node_modules/sinon/pkg/sinon',
		'demos'			: 'vendor/demos',
		'jqxcore'		: 'vendor/jqxcore',
		'jqxbuttons':	'vendor/jqxbuttons'
	},

	//urlArgs : 'bust=' + (new Date()).getTime()
});

require(['jquery','udc','jqxcore','jqxbuttons'], function($, UDC,jqxcore,jqxbuttons) {

	$(document).ready(function () {

		// Create jqxButton widgets.
		$("#jqxButton").jqxButton({ width: 120, height: 40 });
		$("#jqxSubmitButton").jqxButton({ width: 120, height: 40 });
		$("#jqxDisabledButton").jqxButton({ disabled: true, width: 120, height: 40 });
		$("#jqxImageButton").jqxButton({ width: 120, height: 40, imgSrc: "../../images/facebook.png" });
		$("#jqxTextImageButton").jqxButton({ width: 120, height: 40, textImageRelation: "imageBeforeText", textPosition: "left", imgSrc: "../../images/twitter.png" });
		$("#jqxHTMLButton").jqxButton({ width: 120, height: 40 });

		// Subscribe to Click events.
		$("#jqxButton").on('click', function ()
		{
				$("#events").find('span').remove();
				$("#events").append('<span>Button Clicked</span');
		});

		$("#jqxImageButton").on('click', function ()
		{
				$("#events").find('span').remove();
				$("#events").append('<span>Image Button Clicked</span');
		});

		$("#jqxHTMLButton").on('click', function ()
		{
				$("#events").find('span').remove();
				$("#events").append('<span>HTML Button Clicked</span');
				$("#jqxHTMLButton").jqxButton({ value: "<span style='font-style: italic;'>Thanks for clicking me!</span>" });
		});

		$("#jqxTextImageButton").on('click', function ()
		{
				$("#events").find('span').remove();
				$("#jqxTextImageButton").jqxButton({ textImageRelation: "textBeforeImage", imgPosition: "left", textPosition: "center" });
				$("#events").append('<span>Text/Image Button Clicked</span');
		});

		$("#jqxSubmitButton").on('click', function ()
		{
				$("#events").find('span').remove();
				$("#events").append('<span>Submit Button Clicked</span');
		});
	});
});

define(function(require) {

	mocha.setup('bdd');
	require([ 'scripts/test.js' ], function() {
		mocha.run();
	});

});
