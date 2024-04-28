
// exports {randomNum(min.max), fire(event), aiming(event), enemiesgenerator(enemiesFlow)}

const fail = document.getElementById('fail');
fail.play();


const player = document.getElementById('player');
const rotator = document.getElementById('rotator');
const bullet = document.getElementById('bullet');
const soundTruck = document.getElementById('soundTruck');
const shoot = document.getElementById('shoot');
let x = 0;
let y = 0;
const noCollide = '🚀';
const collide = '💥';
bullet.textContent = noCollide;

// Generate a random number between min - 1 and max + 1
export function randomNum(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Animation of the bullet firing
export function fire(event){ shoot.play();
    player.style.left = event.x + 'px';
    player.style.top = event.y + 'px';
    player.style.transform = 'translate(-50%, -10%)';
    player.style.transition = '0.3s';
    setTimeout(() => {
    bullet.style.overflow = 'visible';
    bullet.textContent = collide;
    }, 270);
    setTimeout(() => {
    player.style.transition = '0s';
    bullet.style.overflow = 'hidden';
    bullet.textContent = '';
    player.style.left = '50%';
    player.style.top = '100%';
    player.style.transform = 'translate(-50%, -130%)';
    }, 300);
    setTimeout(() => {
        bullet.textContent = noCollide;
        shoot.pause();
        shoot.currentTime = 0;
    }, 500);}
// Animation of the bullet aiming
export function aiming(event){
    const xdis = event.x - window.innerWidth/2;
    const ydis = window.innerHeight * 95 / 100 - event.y;
    const degree = (Math.atan(xdis/ydis) * 180 / Math.PI);
    rotator.style.transform = `rotate(${degree}deg)`;
}




// Generate enemies

const boom = document.getElementById('boom');
const lives = document.getElementById('lives');
const cheers = ['خطير', 'رائع', 'يلا واصل'];
const isEnemy = '👻';
const noEnemy = '💀';
let enemies;
let tries = 3;
export let enemiesgenerator;

export function enemiesgeneratorFunction(enemiesFlow){
    let points = 0;
    soundTruck.play();
    document.getElementById('points').textContent = 'النقاط 0000';
    if(!enemiesgenerator){
    enemiesgenerator = setInterval(() => {
    const random = randomNum(1, (window.innerWidth - 120)/75) * 75;
    const newEnemy = document.createElement('div');
    newEnemy.className = 'enemy'
    newEnemy.textContent = isEnemy;
    newEnemy.style.left = random + 'px';
    document.getElementById('container').prepend(newEnemy);
    attack(newEnemy);
    enemies = Array.from(document.getElementsByClassName('enemy'));
    const array = Array.from(enemies);
    for(let enemy of array){ 
        
        enemy.onclick = () => {
            boom.currentTime = 0;
            points++;

            setTimeout(() => {
                boom.play();
            }, 200);
            setTimeout(() => {
            enemy.textContent = noEnemy; 
            points = points.toString().padStart(4,'0');
               if(points % 10 == 0){
                const random = randomNum(0, cheers.length - 1);
                document.getElementById('points').textContent = `النقاط ${points}   ${cheers[random]}`;
                setTimeout(() => {
                document.getElementById('points').textContent = `النقاط ${points}`;
                }, 1000);
                if(points % 100 == 0){
                    document.getElementById('complete').play();
               }
            }else{
                 document.getElementById('points').textContent = `النقاط ${points}`;
            }
            }, 270);
            setTimeout(() => {
            boom.pause();
            }, 440);
            setTimeout(() => {
            enemy.remove();
            }, 500);
        }  
        
    } 


     
}, enemiesFlow);
}}

function attack(enemy){
    let position = 0;
    const move = setInterval(() => {
        position+=13;
        enemy.style.top = `${position}px`;
        if(position >= window.innerHeight){
            clearInterval(move)
                tries--;
                if(tries == 2){
                    lives.textContent = '💙💙🖤';
                }else if(tries == 1){
                    lives.textContent = '💙🖤🖤';
                }else if(tries == 0){
                    location.reload();
                }
        }
    }, 90);
    enemy.addEventListener('click', () => {clearInterval(move);});
}

 