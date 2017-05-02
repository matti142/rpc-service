import {Status} from '../util/Status';
import {Type} from '../util/Type';


export class Server {

  /**
   *
   * @param options -
   * @param methods - function map
   */
  constructor(options, methods = {}) {

    if (!options.service) {
      throw "missing option 'service' for service class"
    }

    this._connectionEstablished = false;
    this._onReady = typeof options.onReady === 'function' ? options.onReady : null;

    options.type = Type.SERVER;
    options.receiveMessageCallback = this._receiveMessage.bind(this);

    this._serviceClass = options.service;
    this._service = new this._serviceClass(options);
    this._token = null;
    this._methods = methods;
  }

  /**
   * register given callback function with `methodName`
   * @param methodName
   * @param methodFn
   * @returns {Consumer}
   */
  addMethod(methodName, methodFn) {
    this._methods[methodName] = methodFn;
    return this;
  }

  /**
   * Remove callback function with given `methodName`
   * @param methodName
   */
  removeMethod(methodName) {
    if (this._methods[methodName]) {
      delete this._methods[methodName];
    }
    return this;
  }

  /**
   * Handles a message sent by a provider and invoke the method.
   * @param jsonrpc
   * @param id
   * @param method
   * @param params
   * @param verify
   * @param token
   * @param test
   * @returns {*}
   * @private
   */
  _receiveMessage({jsonrpc, id, method, params, verify, token, test}) {

    if (!this._connectionEstablished && verify && id) {
      this._connectionEstablished = true;
      this._token = id;
      this._service.post({
        verify,
        id
      });
      if (this._onReady) {
        this._onReady();
      }
    }

    // check JSON RPC format for answer
    if (!this._connectionEstablished || jsonrpc !== "2.0" || !id || !method || token !== this._token) {
      return;
    }

    // message with given id does not exist
    if (!this._methods[method]) {
      return this._sendError(id, {
        status: Status.METHOD_NOT_FOUND,
        message: `method with name ${method} could not be found`
      });
    }

    const that = this;
    const cb = {
      done(data) {
        that._sendResult(id, {
          status: Status.METHOD_SUCCESS,
          data,
        });
      },
      error(data) {
        that._sendResult(id, {
          status: Status.METHOD_ERROR,
          data,
        });
      }
    };
    const methodObj = {
      method: this._methods[method],
      isAsync: false,
      async: function() {
        this.isAsync = true;
        that._sendResult(id, {
          status: Status.METHOD_ASYNC
        });
        return cb;
      }
    };

    // invoke method
    let result = methodObj.method(params, cb.done, cb.error);

    // stop here if method works asynchronously
    if (methodObj.isAsync) {
      return;
    }

    // undefined result should work as success by documentation
    if (result === undefined) {
      result = true;
    }

    if (result === false || result === null) {
      return cb.error();
    }
    return cb.done(result);
  }

  /**
   * send `success` response to the provider
   * @param id
   * @param data
   */
  _sendResult(id, data) {
    this._service.post({
      jsonrpc: "2.0",
      id,
      result: data,
    });
  }

  /**
   * send `error` response to the provider
   * @param id
   * @param data
   */
  _sendError(id, data) {
    this._service.post({
      jsonrpc: "2.0",
      id,
      error: data,
    });
  }

  destroy() {
    this._service.destroy();
    this._methods = {};
  }
}
