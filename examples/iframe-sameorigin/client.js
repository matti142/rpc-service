import {Client} from '../../src/role/Client';
import {CustomEventService} from '../../src/service/CustomEventService';


let client = new Client({
  target: window.parent,
  source: window,
  service: CustomEventService,
  methodTimeout: 300
});

let button = document.getElementById("sendAlert");
button.addEventListener('click', e => {
  client.invoke('alert', {msg: 'Hello from iframe'});
}, false);

let asyncButton = document.getElementById("sendAsync");
let title = asyncButton.textContent;

asyncButton.addEventListener('click', e => {
  client
    .invoke('asyncAlert', {msg: 'Asynchronous hello from iframe'}, {timeout: false})
    .then(function() {
      asyncButton.innerHTML = title;
    });
  asyncButton.innerHTML = "<i>waiting</i>";
}, false);

