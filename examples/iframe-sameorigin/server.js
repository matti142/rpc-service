import {Server} from '../../src/role/Server';
import {CustomEventService} from '../../src/service/CustomEventService';

let frame = document.getElementById("frame");

let server = new Server({
  service: CustomEventService,
  target: frame.contentWindow,
  source: window
}, {
  alert({msg}) {
    window.alert(`Message received from Provider: ${msg}`);
  },
  asyncAlert({msg}) {
    let async = this.async();
    setTimeout(function () {
      async.done();
      window.alert(`async message received from Provider: ${msg}`);
    }, 1000);
  }
});