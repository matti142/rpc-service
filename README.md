# RPCService.js

RPCService.js provides remote procedure call support in JavaScript for websites running in a browser.
One endpoint (website) supplies a Consumer (Server) with predefined functions to be called by another website/page that
contains the Provider (Client). The Provider invokes functions remotely and receives the result from the Consumer.

The following communication cases are supported (see also _Communication Services_):
- parent window and iframe (cross origin and same origin)
- window and an external opened browser window or tab (cross origin)
- different pages opened in multiple browser tabs (same origin)
- iOS Swift App (WKWebView) and a website

RPCService.js is written in ES6, bundled by [webpack] and using a modified version of JSON-RPC protocol for messaging.

## Installation

### NPM + Bundler
If your project is build with a bundler ([browserify] or [webpack]) you can easily install the package with NPM and
import sources that are necessary for your project.

```bash
npm install rpc-service
```

### Webpack 2 (ES6 + BabelJS + tree-shaking)
Webpack2 supports tree-shaking, that means only imported classes from a module will be added 
to the output bundle which are used in the code. To get tree-shaking working, the following
 BabelJS configuration is necessary:
 
```javascript 
 // webpack.config.js
 ...
 module: {
   rules: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       use: [
         {
           loader: 'babel-loader',
           options: {
             presets: [
               // it's necessary to set "modules" to false or static code analysis
               // from webpack2 won't work correctly
               [ 'es2015', { modules: false } ]
             ],
             plugins: [
               "es6-promise"
             ]
           }
         }
       ]
     }
   ]
 }
```

The RPCService classes can be imported with:
```javascript
import {Server, PostMessageService} from 'rpc-service'

const server = new Server({
  // server properties
  service: PostMessageService
}, {
  // server functions
});
```
More details see section "Usage".

### Webpack 1 (ES6 + BabelJS)
Webpack 1 does not support tree-shaking, that means you have to import classes
from `src` directly or your bundle will be blown up with lots of unused code.
The following snippet works with any BabelJS configuration.

```javascript
import {Server} from 'rpc-service/src/role/Server'
import {PostMessageService} from 'rpc-service/src/service/PostMessageService'

const server = new Server({
  // server properties
  service: PostMessageService
}, {
  // server functions
});
```

### Webpack 1 (ES5)
If you are using Webpack to bundle ES5 files without, you can use the bundles
in `dist`.

```javascript
var RPCService = require("rpc-service/dist/server.rpcservice");
var server = new RPCService.Server({
  // server properties
  service: RPCService.PostMessageService
}, {
  // server functions
});
```

### CommonJS, AMD, ...
In `dist` are ES5 compatible bundles that can be used in CommonJS or AMD environments.

```javascript
define(function(require) {
  var RPCService = require("rpc-service/dist/server.rpcservice");
  //...
  return new RPCService.Server({
    // server properties
    service: RPCService.PostMessageService
  }, {
    // server functions
  });
});
```

### Oldfashion way (script tag)
If you insert RPCService via script tag, it will add `RPCService` to the `window`
object.
```html
<script src="server.rpcservice.js"></script>
<script>
var server = new RPCService.Server({
  service: RPCService.PostMessageService
}, {
  // server functions
});
</script>
```

## Usage

### Server
The server is the part of RCPService.js that defines functions to be called by a client
remotely by using a communication service. Functions can be synchronously and asynchronously and 
can return an result.

```javascript
import {Server} from 'rpc-service';

let server = new Server({
  service: PostMessageService,
  target: frame.contentWindow // reference to the iframed page
}, {
  // define servier functions here
  foo() {
    // return values are not necessary
    console.log("i did something here");
  }
  
  // are parameters are written as an object in the first argument
  calc({a, b}) {
    return a + b; // return value
  }
  
  errorFeedback({value}) {
    if (value === 3) {
      return false; // will answer the client with an error
    }
    // no result will be truthy
  }
  
  // async functions are also possible
  doAsync({value}) {
    let async = this.async(); // mark that function internally as asynchronous
    setTimeout(function () {
      // do stuff asynchronously
      window.alert(`async message received from Provider: ${msg}`);
      // 
      async.done(value + 1);
      
      // or if an error occurs
      // async.error({ message: "OH, somthing went wrong.", id: "custom-error-id-for-client" });
    }, 1000);
  }
});
```

### Client
After a client has been successfully initialized, it can execute functions remotely by using 
`invoke`. The `onReady` function will be called once the communication service has been
successfully initialized.

```javascript
let client = new Client({
  service: PostMessageService,    // Service class
  methodTimeout: 1000,            // timeout in ms after that the client throws an error
  
  // service specific options here
  target: window.parent,          // PostMessageService: where to post messages

  // to be called after the communication service class has established a connection
  onReady() {
    console.log("onReady called - you can now invoke server functions");
  }
});
```

If you invoke a function before a communication has been established, nothing will happen.
You won't be informed with an error.

The function `invoke` returns an ES6 promise to react on success and error results with a
callback:

```javascript
client
  .invoke('calc', {a: 4, b: 6})
  .then(function(result) {
    alert(`doing calc: 4 + 6 = ${result}`);
  }, function({status, message}) {
    // status can be a value of rpc-service/util/Status.js (required)
    // message is a textual information (optional)
  });
```

You will get exactly the same structure for asynchronous server functions:
```javascript
client
  .invoke('doAsync', {value: 2})
  .then(function(result) {
    alert(`increment the value asynchronously: ${value}`);
  }, function({status, message}) {
    // status can be a value of rpc-service/util/Status.js (required)
    // message is a textual information (optional)
    
    // typically status: METHOD_TIMEOUT, if the async function needs to much time
    // you can disable or set an higher timeout for every function call:
    //    .invoke('doAsync', {value: 2}, {timeout: false or 2000})
  });
```


## Communication Services
All communication service classes extending `ServiceStub`. If you like to implement your
own custom service class, it's necessary to extend from `ServiceStub` and implement
the stub functions.

### PostMessageService
This communication service establish a cross origin message bus between an 
iframed page and its parent or a page with an external opened window (`window.open`)
by using `window.postMessage` and `message` event.

The PostMessageService offers three option properties:
```javascript

new Client_or_Server({
   //...
  // PostMessageService specific
  target: window.parent,            // element reference for posting messages ("elem.postMessage")
  source: window,                   // element for receiving messages (listening to 'message' event); optional, default: window
  origin: "http://dummy-host.com",  // origin from page that triggers the event; optional, but recommended
});
```

Host page provides functions (server):
```javascript
import {Server, PostMessageService} from 'rpc-service';

// there must be an iframe with: <iframe id="frame" ...></iframe>
let frame = document.getElementById("frame"); 

let server = new Server({
  service: PostMessageService,
  target: frame.contentWindow, // reference to the iframed page
  origin: "http://hostname-of-iframe.com" // for security reasons (optional); will be matched with postMessage result
}, {
  // define servier functions here
});
```

iframed page is the client:
```javascript
import {Client, PostMessageService} from 'rpc-service';

let client = new Client({
  service: PostMessageService,
  methodTimeout: 300,
  
  // PostMessageService specific
  target: window.parent,            // element reference for posting messages ("elem.postMessage")
  origin: "http://dummy-host.com"   // origin of the host page for security (optional)
});
```

### CustomEventService
Establish a communication between server and client via a DOM element - same functionality
like an event emitter. This service only works for same-origin environments.

```javascript
new Client_or_Server({
   //...
  // CustomEventService specific
  source: window,   // element for receiving messages (add event listener); default: window
  target: window,   // element reference for trigger an event; default: source element
  event: "message", // name of the event; default: 'message'
});
```

The `source` element in server properties must be the same like the `target`
in client.

### LocalStorageService
Enables communication via localStorage. This makes it possible to send message across 
multiple tabs or browser windows within same origin. Keep in mind that the browser must
support HTML5 localStorage or this service won't work, e.g. Safari on iOS 10 does not
support localStorage in private mode.

```javascript
new Client_or_Server({
  //...
  // LocalStorageService specific
  storageKey: 'rpc:message' // name of the localStorage key where the message data will be stored
});
```

### WKWebViewService
under development - work in progress

## Utils
### Status
The constants `Status` is an enum and contains all communication states. The following
names will be used in error cases:
```text
  METHOD_NOT_FOUND: the method could not be found (invoked by client)
  METHOD_ERROR: default error code, when the server function returns an error
  METHOD_TIMEOUT: the server function needed too much time
```
Other states will be used internally (client-server-synchronization):
```text
  METHOD_SUCCESS: server function response was successfully
  METHOD_ASYNC: server function is asynchronous, client should wait
  METHOD_READY: unused
  METHOD_DESTROY: unused
```


### Type
`Type` is a constants to decide between the endpoint - server and client.
```text
  SERVER: class represents the server endpoint
  CLIENT: class represents the client endpoint
```
More types are planned for future releases.

## Examples
All examples have to be built with webpack before it can be tested. Files in `./examples`
are source files and will be built to `./target`. Examples with cross-origin services
using the host `http://example-host.com`. You can change the hostname in `index.html` 
files in `./examples` before building.

Normally you can build with NPM scripts:
```bash
npm run build
```
or if Webpack2 CLI is installed globally:
```bash
webpack -p
```
To build a specific example you can define it the parameter `--env.example=<service>`
where `service` matches a string of 
 * iframe
 * iframe-sameorigin
 * localstorage
 * window
 
 ```bash
 npm run build -- --env.example=iframe
 ```
 or with Webpack CLI:
 ```bash
 webpack -p --env.example=iframe
 ```
 
 This also works with the `watch` tasks (`npm run watch` and `webpack -w`).