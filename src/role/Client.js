import Status from '../util/Status';
import Type from '../util/Type';

// static unique id counter
let _msgIndex = 1;

function getUID() {
  let d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
}

/**
 *
 */
export class Client {

  constructor(options) {

    if (!options.service) {
      throw "missing option 'service' for service class"
    }

    options.type = Type.PROVIDER;
    options.receiveMessageCallback = this._receiveMessage.bind(this);
    options.autoConnect = options.autoConnect !== false;

    this._autoConnect = options.autoConnect;
    this._interval = 100;
    this._connectionEstablished = false;

    this._onReady = typeof options.onReady === 'function' ? options.onReady : null;
    this._methodTimeout = options.methodTimeout ? options.methodTimeout : null;
    this._serviceClass = options.service;
    this._service = new this._serviceClass(options);

    this._token = getUID();

    this._sentmsg = {};

    // establish connection asynchronous
    if (this._autoConnect) {
      setTimeout(this._establishConnection.bind(this), 0);
    }
  }

  _establishConnection(cb) {
    if (document.readyState !== 'complete') {
      const onComplete = (e) => {
        if (document.readyState == "complete") {
          document.removeEventListener("readystatechange", onComplete);
          this.connect(cb);
        }
      };
      document.addEventListener("readystatechange", onComplete, false);
    }
    else {
      this.connect(cb);
    }
  }

  /**
   * start connection polling to the provider
   * @param cb
   * @returns {boolean}
   */
  connect(cb) {

    if (this._connectionEstablished) {
      return true;
    }

    this._intervalNumber = setInterval(() => {
      if (this._connectionEstablished) {
        clearInterval(this._intervalNumber);
        return true;
      }
      this._service.post({
        id: this._token,
        verify: true
      });
    }, this._interval);
  }

  /**
   * handles RCP answers
   * @param jsonrpc
   * @param id
   * @param result
   * @param error
   * @param verify - special flag for verifying consumer
   */
  _receiveMessage({jsonrpc, id, result, error, verify}) {

    // verification message from server
    if (!this._connectionEstablished && verify && id === this._token) {
      this._connectionEstablished = true;
      if (this._onReady) {
        this._onReady();
      }
      return;
    }

    // check JSON RPC format for answer
    if (jsonrpc !== "2.0" || !id || (!result && !error)) {
      return;
    }

    // message with given id does not exist
    if (!this._sentmsg[id]) {
      return;
    }

    const msg = this._sentmsg[id];

    // check types
    if (result && typeof (result) !== 'object' || error && typeof (error) !== 'object') {
      return;
    }

    // check success response
    if (result) {
      if (result.status === Status.METHOD_SUCCESS) {
        return msg.resolve(result.data);
      }
      // consumer responses with asynchronous method
      else if (result.status === Status.METHOD_ASYNC) {
        // reset timeout if exists
        if (msg.timeout) {
          this._setTimeout(id, msg.timeout);
        }
        return;
      }
    }
    return msg.reject(error);
  }

  /**
   * Return current message index and increment.
   * @returns {number}
   */
  _nextId() {
    return _msgIndex++;
  }

  /**
   * removes message with given id from data store
   * and clears timeout if exists
   * @param id
   * @private
   */
  _removeMsg(id) {
    if (this._sentmsg[id]) {
      if (this._sentmsg[id].refTimeout) {
        clearTimeout(this._sentmsg[id].refTimeout);
      }
      delete this._sentmsg[id];
    }
  }

  /**
   * send method with given arguments to a consumer
   * @param method
   * @param args
   * @param options
   * @returns {Promise}
   */
  invoke(method, args = {}, options = {}) {

    const that = this;
    let {success, error, timeout} = options;
    let resolve, reject;

    // data object to be sent
    const data = {
      jsonrpc: "2.0",
      method: method,
      params: args,
      token: this._token,
      id: this._nextId()
    };

    // create promise for function return
    const promise = new Promise((result, error) => {
      resolve = result;
      reject = error;
    });

    // store message data
    let msg = this._sentmsg[data.id] = {
      data,
      promise,
      resolve: function(respData) {
        that._removeMsg(data.id);
        if (success) {
          success(respData);
        }
        resolve(respData);
      },
      reject: function(errData) {
        that._removeMsg(data.id);
        if (error) {
          error(errData);
        }
        reject(errData);
      }
    };

    // check timeout value, `false` disables
    if (timeout !== false) {
      msg.timeout = timeout || this._methodTimeout;
    }
    // set execution timeout if exists
    if (msg.timeout) {
      this._setTimeout(data.id, msg.timeout);
    }

    // send message
    this._service.post(data);

    return promise;
  }

  /**
   * set timeout for data entry with given id
   * @param id
   * @param timeout
   * @private
   */
  _setTimeout(id, timeout) {
    if (!this._sentmsg[id]) {
      return;
    }
    if (this._sentmsg[id].refTimeout) {
      clearTimeout(this._sentmsg[id].refTimeout);
    }
    this._sentmsg[id].refTimeout = setTimeout(() => {
      if (this._sentmsg[id]) {
        this._sentmsg[id].reject({
          status: Status.METHOD_TIMEOUT
        });
      }
    }, timeout);
  }

  /**
   * destroys the listener and removes all messages
   */
  destroy() {
    this._service.destroy();
    this._sentmsg = {};
  }
}
