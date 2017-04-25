var BuzzFocusApp;
(function (BuzzFocusApp) {
    "use strict";
    var BUZZ = 300;
    var BuzzFocusProcess = (function () {
        function BuzzFocusProcess(el) {
            var _this = this;
            this._log = el.querySelector('#Log');
            var start = el.querySelector('#Start');
            start.addEventListener('click', function (e) {
                _this.stop();
                _this.setupNextBuzz();
                _this.setupFinal();
            });
            var stop = el.querySelector('#Stop');
            stop.addEventListener('click', function (e) {
                _this.stop(true);
            });
        }
        BuzzFocusProcess.prototype.setupNextBuzz = function () {
            var _this = this;
            var _a = this.pickTimeout(), timeout = _a[0], length = _a[1];
            switch (length) {
                case 'long':
                    navigator.vibrate([BUZZ, BUZZ]);
                    break;
                default:
                    navigator.vibrate(BUZZ);
            }
            this._timeoutX = window.setTimeout(function () {
                _this._timeoutX = 0;
                _this.setupNextBuzz();
            }, timeout);
        };
        BuzzFocusProcess.prototype.pickTimeout = function () {
            var timeout0 = 1000 * 60;
            var timeout = timeout0;
            var x = Math.round(Math.random() * 10);
            var length = 'normal';
            if (x < 3)
                length = 'short';
            else if (x > 9)
                length = 'long';
            switch (length) {
                case 'short':
                    timeout = timeout0 / 2;
                    break;
                case 'long':
                    timeout = timeout0 * 2;
                    break;
                case 'normal':
                default:
                    break;
            }
            var swingFraction = 1 / 3;
            timeout += (swingFraction * timeout) - Math.random() * swingFraction * 2 * timeout;
            console.log('Setting timeout %i, %s', timeout, length);
            this.log("Waiting " + (timeout / 1000).toFixed(0) + "s...");
            return [timeout, length];
        };
        BuzzFocusProcess.prototype.setupFinal = function () {
            var _this = this;
            var TOTAL_INTERVAL = 1000 * 60 * 5;
            this._timeoutF = window.setTimeout(function () {
                _this.stop(true);
            }, TOTAL_INTERVAL);
        };
        BuzzFocusProcess.prototype.stop = function (buzz) {
            if (buzz === void 0) { buzz = false; }
            window.clearTimeout(this._timeoutX);
            window.clearTimeout(this._timeoutF);
            this._timeoutX = 0;
            this._timeoutF = 0;
            if (buzz)
                navigator.vibrate([BUZZ, BUZZ, BUZZ]);
        };
        BuzzFocusProcess.prototype.log = function (s) {
            this._log.textContent += '\r\n' + s;
        };
        return BuzzFocusProcess;
    }());
    BuzzFocusApp.BuzzFocusProcess = BuzzFocusProcess;
})(BuzzFocusApp || (BuzzFocusApp = {}));
// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var BuzzFocusApp;
(function (BuzzFocusApp) {
    "use strict";
    var Application;
    (function (Application) {
        function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }
        Application.initialize = initialize;
        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            var parentElement = document.getElementById('deviceready');
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
            new BuzzFocusApp.BuzzFocusProcess(document.querySelector('#BuzzFocusProcess'));
        }
        function onPause() {
            // TODO: This application has been suspended. Save application state here.
        }
        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }
    })(Application = BuzzFocusApp.Application || (BuzzFocusApp.Application = {}));
    window.onload = function () {
        Application.initialize();
    };
})(BuzzFocusApp || (BuzzFocusApp = {}));
//# sourceMappingURL=appBundle.js.map