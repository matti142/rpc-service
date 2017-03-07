import {Client, PostMessageService} from '../../src/index';

let provider = new Client({
  target: window.parent,
  service: PostMessageService,
  methodTimeout: 300
});

let button = document.getElementById("sendAlert");
button.addEventListener('click', e => {
  provider
    .invoke('alert', {msg: 'Hello from iframe'})
    .then(function() {
      console.log("'alert' successfully invoked");
    });
}, false);

let asyncButton = document.getElementById("sendAsync");
let title = asyncButton.textContent;

asyncButton.addEventListener('click', e => {
  provider
    .invoke('asyncAlert', {msg: 'Asynchronous hello from iframe'}, {timeout: false})
    .then(function() {
      asyncButton.innerHTML = title;
    });
  asyncButton.innerHTML = "<i>waiting</i>";
}, false);

