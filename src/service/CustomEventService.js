import {ServiceStub} from './ServiceStub';

// polyfill for IE 10
(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();


export class CustomEventService extends ServiceStub {

  constructor(options = {}) {
    super(options);

    this._sourceElement = options.source || window;
    this._targetElement = options.target || this._sourceElement;
    this._eventName     = options.event || 'message';

    this._sourceElement.addEventListener(this._eventName, this.dispatch.bind(this), false);
  }

  static getServiceName() {
    return 'CustomEventService'
  }

  /**
   * Send a message by using `postMessage` service.
   * @param {object} data
   */
  post(data) {
    data.source = this._type;
    const ev = new CustomEvent(this._eventName, {
      detail: data
    });
    this._targetElement.dispatchEvent(ev);
  }

  /**
   * Handles received messages
   * @param {object} detail
   * @returns {*}
   */
  dispatch({detail}) {
    // ensure provider or customer doesn't dispatch its own message
    if (detail && detail.source !== this._type) {
      delete detail.source;
      super.dispatch(detail);
    }
  }

  /**
   * remove bindings
   */
  destroy() {
    this._sourceElement.removeEventListener(this._eventName, this.dispatch);
  }

}
