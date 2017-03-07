import {Server} from '../../src/role/Server';
import {LocalStorageService} from '../../src/service/LocalStorageService';

//let frame = document.getElementById("frame");

let server = new Server({
  service: LocalStorageService
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