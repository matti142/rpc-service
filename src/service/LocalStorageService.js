import {ServiceStub} from './ServiceStub';

let usedStorageKeys = {};

export class LocalStorageService extends ServiceStub {

  constructor(options) {
    super(options);

    this._storageKey = options.storageKey || 'rpc:message';

    if (usedStorageKeys[this._storageKey]) {
      throw `LocalStorageService: key '${this._storageKey}' is already in use by another LocalStorageService`;
    }
    usedStorageKeys[this._storageKey] = true;

    // remove old data if exists
    localStorage.removeItem(this._storageKey);

    window.addEventListener('storage', this.dispatch.bind(this), false);
  }

  static getServiceName() {
    return 'LocalStorageService'
  }

  /**
   * Send a message by using `localStorage`
   * @param {object} data
   */
  post(data) {
    data.time = new Date().getTime();
    data.source = this._type;
    localStorage.setItem(this._storageKey, JSON.stringify(data));
  }

  /**
   * Handles received messages
   * @param key
   * @param newValue
   */
  dispatch({key, newValue}) {

    if (newValue && key === this._storageKey) {
      try {
        const data = JSON.parse(newValue);
        delete data.time;

        // ensure provider or customer doesn't dispatch its own message
        if (data.source !== this._type) {
          delete data.source;
          super.dispatch(data);
        }
      } catch(e) {}
    }
  }

  /**
   * remove bindings
   */
  destroy() {
    window.removeEventListener('storage', this.dispatch);
    localStorage.removeItem(this._storageKey);
  }

}
