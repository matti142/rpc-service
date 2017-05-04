(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RPCService"] = factory();
	else
		root["RPCService"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceStub = undefined;

var _Type = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServiceStub = exports.ServiceStub = function () {
  function ServiceStub(options) {
    _classCallCheck(this, ServiceStub);

    this._type = options.type;
    this._receiveListener = options.receiveMessageCallback;
  }

  ServiceStub.prototype.isClient = function isClient() {
    return this._type === _Type.Type.CLIENT;
  };

  ServiceStub.prototype.isServer = function isServer() {
    return this._type === _Type.Type.SERVER;
  };

  /**
   *
   */


  ServiceStub.getServiceName = function getServiceName() {
    throw "not implemented yet";
  };

  /**
   * to be implemented in the subclass
   */


  ServiceStub.prototype.post = function post() {
    throw "post not implemented yet";
  };

  /**
   * forward dispatched data the registered listener
   * @param data
   */


  ServiceStub.prototype.dispatch = function dispatch(data) {
    this._receiveListener(data);
  };

  return ServiceStub;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Type = exports.Type = {
  SERVER: 'SERVER',
  CLIENT: 'CLIENT'
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Status = exports.Status = {
  METHOD_NOT_FOUND: 'METHOD_NOT_FOUND',
  METHOD_SUCCESS: 'METHOD_SUCCESS',
  METHOD_ERROR: 'METHOD_ERROR',
  METHOD_ASYNC: 'METHOD_ASYNC',
  METHOD_READY: 'METHOD_READY',
  METHOD_DESTROY: 'METHOD_DESTROY',
  METHOD_TIMEOUT: 'METHOD_TIMEOUT'
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ServiceStub = __webpack_require__(0);

Object.defineProperty(exports, 'ServiceStub', {
  enumerable: true,
  get: function get() {
    return _ServiceStub.ServiceStub;
  }
});

var _CustomEventService = __webpack_require__(5);

Object.defineProperty(exports, 'CustomEventService', {
  enumerable: true,
  get: function get() {
    return _CustomEventService.CustomEventService;
  }
});

var _LocalStorageService = __webpack_require__(6);

Object.defineProperty(exports, 'LocalStorageService', {
  enumerable: true,
  get: function get() {
    return _LocalStorageService.LocalStorageService;
  }
});

var _PostMessageService = __webpack_require__(7);

Object.defineProperty(exports, 'PostMessageService', {
  enumerable: true,
  get: function get() {
    return _PostMessageService.PostMessageService;
  }
});

var _WKWebViewService = __webpack_require__(8);

Object.defineProperty(exports, 'WKWebViewService', {
  enumerable: true,
  get: function get() {
    return _WKWebViewService.WKWebViewService;
  }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Status = __webpack_require__(2);

Object.defineProperty(exports, 'Status', {
  enumerable: true,
  get: function get() {
    return _Status.Status;
  }
});

var _Type = __webpack_require__(1);

Object.defineProperty(exports, 'Type', {
  enumerable: true,
  get: function get() {
    return _Type.Type;
  }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomEventService = undefined;

var _ServiceStub2 = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// polyfill for IE 10
(function () {

  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

var CustomEventService = exports.CustomEventService = function (_ServiceStub) {
  _inherits(CustomEventService, _ServiceStub);

  function CustomEventService() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CustomEventService);

    var _this = _possibleConstructorReturn(this, _ServiceStub.call(this, options));

    _this._sourceElement = options.source || window;
    _this._targetElement = options.target || _this._sourceElement;
    _this._eventName = options.event || 'message';

    _this._sourceElement.addEventListener(_this._eventName, _this.dispatch.bind(_this), false);
    return _this;
  }

  CustomEventService.getServiceName = function getServiceName() {
    return 'CustomEventService';
  };

  /**
   * Send a message by using `postMessage` service.
   * @param {object} data
   */


  CustomEventService.prototype.post = function post(data) {
    data.source = this._type;
    var ev = new CustomEvent(this._eventName, {
      detail: data
    });
    this._targetElement.dispatchEvent(ev);
  };

  /**
   * Handles received messages
   * @param {object} detail
   * @returns {*}
   */


  CustomEventService.prototype.dispatch = function dispatch(_ref) {
    var detail = _ref.detail;

    // ensure provider or customer doesn't dispatch its own message
    if (detail && detail.source !== this._type) {
      delete detail.source;
      _ServiceStub.prototype.dispatch.call(this, detail);
    }
  };

  /**
   * remove bindings
   */


  CustomEventService.prototype.destroy = function destroy() {
    this._sourceElement.removeEventListener(this._eventName, this.dispatch);
  };

  return CustomEventService;
}(_ServiceStub2.ServiceStub);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalStorageService = undefined;

var _ServiceStub2 = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var usedStorageKeys = {};

var LocalStorageService = exports.LocalStorageService = function (_ServiceStub) {
  _inherits(LocalStorageService, _ServiceStub);

  function LocalStorageService(options) {
    _classCallCheck(this, LocalStorageService);

    var _this = _possibleConstructorReturn(this, _ServiceStub.call(this, options));

    _this._storageKey = options.storageKey || 'rpc:message';

    if (usedStorageKeys[_this._storageKey]) {
      throw 'LocalStorageService: key \'' + _this._storageKey + '\' is already in use by another LocalStorageService';
    }
    usedStorageKeys[_this._storageKey] = true;

    // remove old data if exists
    localStorage.removeItem(_this._storageKey);

    window.addEventListener('storage', _this.dispatch.bind(_this), false);
    return _this;
  }

  LocalStorageService.getServiceName = function getServiceName() {
    return 'LocalStorageService';
  };

  /**
   * Send a message by using `localStorage`
   * @param {object} data
   */


  LocalStorageService.prototype.post = function post(data) {
    data.time = new Date().getTime();
    data.source = this._type;
    localStorage.setItem(this._storageKey, JSON.stringify(data));
  };

  /**
   * Handles received messages
   * @param key
   * @param newValue
   */


  LocalStorageService.prototype.dispatch = function dispatch(_ref) {
    var key = _ref.key,
        newValue = _ref.newValue;


    if (newValue && key === this._storageKey) {
      try {
        var data = JSON.parse(newValue);
        delete data.time;

        // ensure provider or customer doesn't dispatch its own message
        if (data.source !== this._type) {
          delete data.source;
          _ServiceStub.prototype.dispatch.call(this, data);
        }
      } catch (e) {}
    }
  };

  /**
   * remove bindings
   */


  LocalStorageService.prototype.destroy = function destroy() {
    window.removeEventListener('storage', this.dispatch);
    localStorage.removeItem(this._storageKey);
  };

  return LocalStorageService;
}(_ServiceStub2.ServiceStub);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostMessageService = undefined;

var _ServiceStub2 = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PostMessageService = exports.PostMessageService = function (_ServiceStub) {
  _inherits(PostMessageService, _ServiceStub);

  function PostMessageService() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, PostMessageService);

    var _this = _possibleConstructorReturn(this, _ServiceStub.call(this, options));

    _this._targetWindow = options.target || null;
    _this._sourceWindow = options.source || window;
    _this._origin = options.origin || "*";
    _this._verifySource = _this._origin !== '*';

    _this._sourceWindow.addEventListener('message', _this.dispatch.bind(_this), false);
    return _this;
  }

  PostMessageService.getServiceName = function getServiceName() {
    return 'PostMessageService';
  };

  /**
   * Send a message by using `postMessage` service.
   * @param {object} data
   */


  PostMessageService.prototype.post = function post(data) {

    if (this._targetWindow === null) {
      throw "windows element for posting messages does not exist";
    }

    this._targetWindow.postMessage(data, this._origin);
  };

  /**
   * Handles received messages
   * @param {string} origin
   * @param {object} data
   * @param {window} source
   * @returns {*}
   */


  PostMessageService.prototype.dispatch = function dispatch(_ref) {
    var origin = _ref.origin,
        data = _ref.data,
        source = _ref.source;


    if (this._verifySource && this._origin !== origin) {
      return null;
    }

    _ServiceStub.prototype.dispatch.call(this, data);
  };

  /**
   * remove bindings
   */


  PostMessageService.prototype.destroy = function destroy() {
    this._sourceWindow.removeEventListener('message', this.dispatch);
  };

  return PostMessageService;
}(_ServiceStub2.ServiceStub);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WKWebViewService = undefined;

var _ServiceStub2 = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WKWebViewService = exports.WKWebViewService = function (_ServiceStub) {
  _inherits(WKWebViewService, _ServiceStub);

  function WKWebViewService() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, WKWebViewService);

    var _this = _possibleConstructorReturn(this, _ServiceStub.call(this, options));

    _this._namespace = options.namespace;
    _this._callback = options.callbackName || 'rpcReceiveCallback';
    var hasMsgHandler = false;

    // check if special WKWebView message handler exists
    try {
      hasMsgHandler = typeof window.webkit.messageHandlers[_this._namespace].postMessage === 'function';
    } catch (e) {}

    if (!hasMsgHandler) {
      throw 'WKWebViewService: cannot connect to WKWebView handler \'window.webkit.messageHandlers.' + _this._namespace + '\'';
    }

    // register callback function (works as response listener)
    window[_this._callback] = _this.dispatch.bind(_this);
    return _this;
  }

  WKWebViewService.getServiceName = function getServiceName() {
    return 'WKWebViewService';
  };

  /**
   * Send a message by using `postMessage` service.
   * @param {object} data
   */


  WKWebViewService.prototype.post = function post(data) {
    window.webkit.messageHandlers[this._namespace].postMessage(JSON.stringify(data));
  };

  /**
   * Handles received messages
   * @param {string} strData
   * @returns {*}
   */


  WKWebViewService.prototype.dispatch = function dispatch(strData) {
    try {
      _ServiceStub.prototype.dispatch.call(this, JSON.parse(strData));
    } catch (e) {}
  };

  /**
   * remove bindings
   */


  WKWebViewService.prototype.destroy = function destroy() {
    delete window[this._namespace];
  };

  return WKWebViewService;
}(_ServiceStub2.ServiceStub);

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Server = undefined;

var _Status = __webpack_require__(2);

var _Type = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Server = exports.Server = function () {

  /**
   *
   * @param options -
   * @param methods - function map
   */
  function Server(options) {
    var methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Server);

    if (!options.service) {
      throw "missing option 'service' for service class";
    }

    this._connectionEstablished = false;
    this._onReady = typeof options.onReady === 'function' ? options.onReady : null;

    options.type = _Type.Type.SERVER;
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


  Server.prototype.addMethod = function addMethod(methodName, methodFn) {
    this._methods[methodName] = methodFn;
    return this;
  };

  /**
   * Remove callback function with given `methodName`
   * @param methodName
   */


  Server.prototype.removeMethod = function removeMethod(methodName) {
    if (this._methods[methodName]) {
      delete this._methods[methodName];
    }
    return this;
  };

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


  Server.prototype._receiveMessage = function _receiveMessage(_ref) {
    var jsonrpc = _ref.jsonrpc,
        id = _ref.id,
        method = _ref.method,
        params = _ref.params,
        verify = _ref.verify,
        token = _ref.token,
        test = _ref.test;


    if (!this._connectionEstablished && verify && id) {
      this._connectionEstablished = true;
      this._token = id;
      this._service.post({
        verify: verify,
        id: id
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
        status: _Status.Status.METHOD_NOT_FOUND,
        message: 'method with name ' + method + ' could not be found'
      });
    }

    var that = this;
    var cb = {
      done: function done(data) {
        that._sendResult(id, {
          status: _Status.Status.METHOD_SUCCESS,
          data: data
        });
      },
      error: function error(data) {
        that._sendResult(id, {
          status: _Status.Status.METHOD_ERROR,
          data: data
        });
      }
    };
    var methodObj = {
      method: this._methods[method],
      isAsync: false,
      async: function async() {
        this.isAsync = true;
        that._sendResult(id, {
          status: _Status.Status.METHOD_ASYNC
        });
        return cb;
      }
    };

    // invoke method
    var result = methodObj.method(params, cb.done, cb.error);

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
  };

  /**
   * send `success` response to the provider
   * @param id
   * @param data
   */


  Server.prototype._sendResult = function _sendResult(id, data) {
    this._service.post({
      jsonrpc: "2.0",
      id: id,
      result: data
    });
  };

  /**
   * send `error` response to the provider
   * @param id
   * @param data
   */


  Server.prototype._sendError = function _sendError(id, data) {
    this._service.post({
      jsonrpc: "2.0",
      id: id,
      error: data
    });
  };

  Server.prototype.destroy = function destroy() {
    this._service.destroy();
    this._methods = {};
  };

  return Server;
}();

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Server = __webpack_require__(11);

Object.keys(_Server).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Server[key];
    }
  });
});

var _index = __webpack_require__(3);

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});

var _index2 = __webpack_require__(4);

Object.keys(_index2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index2[key];
    }
  });
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=server.rpcservice.js.map