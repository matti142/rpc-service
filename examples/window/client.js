import {Client} from '../../src/role/Client';
import {PostMessageService} from '../../src/service/PostMessageService';

let client = new Client({
  target: window.opener,
  service: PostMessageService
});

let button = document.getElementById("sendAlert");
button.addEventListener('click', e => {
  provider.invoke('alert', {msg: 'Hello from iframe'});
}, false);

let asyncButton = document.getElementById("sendAsync");
let title = asyncButton.textContent;

asyncButton.addEventListener('click', e => {
  provider
    .invoke('asyncAlert', {msg: 'Asynchronous hello from iframe'})
    .then(function() {
      asyncButton.innerHTML = title;
    });
  asyncButton.innerHTML = "<i>waiting</i>";
}, false);

