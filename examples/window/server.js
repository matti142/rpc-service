import {Server} from '../../src/role/Server';
import {PostMessageService} from '../../src/service/PostMessageService';

let btnOpen = document.getElementById("btnOpen");
btnOpen.addEventListener('click', function() {

  let time = new Date().getTime();
  let providerWin = window.open(
    'http://example-host.com/rpc-service/target/examples/window/window.html',
    'exwin' + time,
    'location=no,menubar=no,status=no,toolbar=no,width=500,height=500'
  );

  let server = new Server({
    service: PostMessageService,
    target: providerWin
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

  providerWin.onload = function() {
    providerWin.addEventListener('beforeunload', function() {
      server.destroy();
    });
  };

}, false);


