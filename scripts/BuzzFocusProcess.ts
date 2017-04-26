module BuzzFocusApp {
    "use strict";

    const BUZZ = 300;

    export class BuzzFocusProcess {

        private _timeoutX: number;
        private _timeoutF: number;
        private _log: Element;

        public constructor(el: Element) {

            this._log = el.querySelector('#Log');

            var start = el.querySelector('#Start');
            start.addEventListener('click', e => {
                this.stop();
                this.setupNextBuzz();
                this.setupFinal();
            });

            var stop = el.querySelector('#Stop');
            stop.addEventListener('click', e => {
                this.stop(true);
            });

        }
        
        private setupNextBuzz() {
            var [timeout, length] = this.pickTimeout();
            switch (length) {
                case 'long':
                    navigator.vibrate([BUZZ, BUZZ]);
                    break;
                default:
                    navigator.vibrate(BUZZ);
            }
            this._timeoutX = window.setTimeout(() => {
                this._timeoutX = 0;
                this.setupNextBuzz();
            }, timeout);
        }

        private pickTimeout() {
            var timeout0 = 1000 * 60;
            var timeout = timeout0;
            var x = Math.round(Math.random() * 10);

            var length = 'normal';
            if (x < 3)
                length = 'short'
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
            this.log(`Waiting ${(timeout / 1000).toFixed(0)}s...`);
            return [timeout, length];
        }

        private setupFinal() {
            var TOTAL_INTERVAL = 1000 * 60 * 5;
            this._timeoutF = window.setTimeout(() => {
                this.stop(true);
            }, TOTAL_INTERVAL);
        }

        private stop(buzz: boolean = false) {
            window.clearTimeout(this._timeoutX);
            window.clearTimeout(this._timeoutF);
            this._timeoutX = 0;
            this._timeoutF = 0;
            if (buzz)
                navigator.vibrate([BUZZ*2, BUZZ*2, BUZZ*2]);
        }

        private log(s: string) {
            this._log.textContent += s + '\r\n';
        }
    }
}
