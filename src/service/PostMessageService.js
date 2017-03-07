import {ServiceStub} from './ServiceStub';

export class PostMessageService extends ServiceStub {

  constructor(options = {}) {
    super(options);

    this._targetWindow = options.target || null;
    this._sourceWindow = options.source || window;
    this._origin       = options.origin || "*";
    this._verifySource = this._origin !== '*';

    this._sourceWindow.addEventListener('message', this.dispatch.bind(this), false);
  }

  static getServiceName() {
    return 'PostMessageService'
  }

  /**
   * Send a message by using `postMessage` service.
   * @param {object} data
   */
  post(data) {

    if (this._targetWindow === null) {
      throw "windows element for posting messages does not exist";
    }

    this._targetWindow.postMessage(data, this._origin);
  }

  /**
   * Handles received messages
   * @param {string} origin
   * @param {object} data
   * @param {window} source
   * @returns {*}
   */
  dispatch({origin, data, source}) {

    if (this._verifySource && this._origin !== origin) {
      return null;
    }

    super.dispatch(data);
  }

  /**
   * remove bindings
   */
  destroy() {
    this._sourceWindow.removeEventListener('message', this.dispatch);
  }

}
