// const enemy = document.querySelector('.enemy');
import {enemiesgenerator,enemiesgeneratorFunction} from './functions.script.js';

const easyBtn = document.getElementById('easyBtn');
const medBtn = document.getElementById('medBtn');
const difBtn = document.getElementById('difBtn');
const exitBtn = document.getElementById('exitBtn');
const panel = document.getElementById('panel');

function btnClicked(){
    clearInterval(enemiesgenerator);
    panel.style.display = 'none';
    exitBtn.style.display = 'inline';
}

easyBtn.onclick = () => {
    btnClicked()
    enemiesgeneratorFunction(2000);
}
medBtn.onclick = () => {
    btnClicked()
    enemiesgeneratorFunction(1000);
}
difBtn.onclick = () => {
    btnClicked()
    enemiesgeneratorFunction(500);
}