define(['udc','chai','jquery', 'sinon'], function(UDC, chai,$,sinon) {

	describe('UDC tests', function() {

		describe('Function instatiations', function() {

			it('PM must not be undefined or null', function(){
				chai.expect(UDC).to.not.be.undefined;
				chai.expect(UDC).to.not.be.null;
			});

			it('UDC should be instantiated', function(){
				var udc = new UDC();
				chai.expect(udc).to.not.be.undefined;
				chai.expect(udc).to.not.be.null;
			});

			it('UDC.startTracking should be instantiated', function(){
				var udc = new UDC();
				chai.expect(udc.startTracking).to.not.be.undefined;
				chai.expect(udc.startTracking).to.not.be.null;
			});

			it('UDC.stopTracking should be instantiated', function(){
				var udc = new UDC();
				chai.expect(udc.stopTracking).to.not.be.undefined;
				chai.expect(udc.stopTracking).to.not.be.null;
			});
		});


		describe("#clicks", function(done) {

			var sandbox;

			beforeEach(function() {

				// create a sandbox
				sandbox = sinon.sandbox.create();

				// stub some console methods
				errorSpy = sandbox.stub(window.console, "error");
				logSpy = sandbox.stub(window.console, 'log');

			});

			afterEach(function() {
				// restore the environment as it was before
				sandbox.restore();
			});

			it("should start tracking", function(done) {
				var udc = new UDC();
				udc.startTracking("body", "click", "");

		    // do something that should trigger the event
				$('#jqxButton').trigger("click");

				var _savedLog = window.console.log;

				//sinon.assert.called(logSpy);
				sinon.assert.notCalled(errorSpy);

				//sinon.assert.calledWithExactly( this.stub(), "***** Event tracked: START *****");

				sinon.assert.calledWithExactly(logSpy, "***** Event tracked: START *****");
				done();
			});

			it("should stop tracking", function(done) {
				var udc = new UDC();
				udc.startTracking("body", "click", "");
				udc.stopTracking();
				$('#jqxButton').trigger("click");
				sinon.assert.notCalled(errorSpy);
				sinon.assert.notCalled(logSpy);
				done();
			});
  	});
	});
});
