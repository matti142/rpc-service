import {Client} from '../../src/role/Client';
import {LocalStorageService} from '../../src/service/LocalStorageService';

let client = new Client({
  service: LocalStorageService,
  methodTimeout: 300
});

let button = document.getElementById("sendAlert");
button.addEventListener('click', e => {
  client
    .invoke('alert', {msg: 'Hello from iframe'})
    .then(function(data) {
      console.log("Success alert", data);
    }, function(error) {
      console.log("Error alert", error);
    });
}, false);

let asyncButton = document.getElementById("sendAsync");
let title = asyncButton.textContent;

asyncButton.addEventListener('click', e => {
  client
    .invoke('asyncAlert', {msg: 'Asynchronous hello from iframe'})
    .then(function() {
      asyncButton.innerHTML = title;
    });
  asyncButton.innerHTML = "<i>waiting</i>";
}, false);

