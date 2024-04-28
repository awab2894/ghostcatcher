import {fire, aiming} from './functions.script.js';
const container = document.getElementById('container');


container.addEventListener('click', (event) => {
    fire(event);
});


container.addEventListener('pointermove', (event) => {
    aiming(event);
});

container.addEventListener('click', (event) => {
    aiming(event);
});
