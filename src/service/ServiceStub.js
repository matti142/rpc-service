import Type from '../util/Type'

export class ServiceStub {

  constructor(options) {
    this._type = options.type;
    this._receiveListener = options.receiveMessageCallback;
  }

  isClient() {
    return this._type === Type.CLIENT;
  }

  isServer() {
    return this._type === Type.SERVER;
  }

  /**
   *
   */
  static getServiceName() {
    throw "not implemented yet";
  }

  /**
   * to be implemented in the subclass
   */
  post() {
    throw "post not implemented yet";
  }

  /**
   * forward dispatched data the registered listener
   * @param data
   */
  dispatch(data) {
    this._receiveListener(data);
  }

}
