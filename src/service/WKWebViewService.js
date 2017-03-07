import {ServiceStub} from './ServiceStub';

export class WKWebViewService extends ServiceStub {

  constructor(options = {}) {
    super(options);

    this._namespace = options.namespace;
    this._callback = options.callbackName || 'rpcReceiveCallback';
    let hasMsgHandler = false;

    // check if special WKWebView message handler exists
    try {
      hasMsgHandler = (typeof window.webkit.messageHandlers[this._namespace].postMessage === 'function');
    } catch(e) {}

    if (!hasMsgHandler) {
      throw `WKWebViewService: cannot connect to WKWebView handler 'window.webkit.messageHandlers.${this._namespace}'`;
    }

    // register callback function (works as response listener)
    window[this._callback] = this.dispatch.bind(this);
  }

  static getServiceName() {
    return 'WKWebViewService'
  }

  /**
   * Send a message by using `postMessage` service.
   * @param {object} data
   */
  post(data) {
    window.webkit.messageHandlers[this._namespace].postMessage(JSON.stringify(data));
  }

  /**
   * Handles received messages
   * @param {string} strData
   * @returns {*}
   */
  dispatch(strData) {
    try {
      super.dispatch(JSON.parse(strData));
    } catch(e) {}
  }

  /**
   * remove bindings
   */
  destroy() {
    delete window[this._namespace];
  }

}
