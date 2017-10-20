import { mixinKeys } from '../';
let preventDefault = false;
const keys = {};

mixinKeys(keys);

document.addEventListener('keydown', event=>{
    for(let name in keys){
        console.log(name, keys[name]);
    }
    if(preventDefault)
        event.preventDefault();
});

const button = document.querySelector('button');
button.addEventListener('click', event=>{
    preventDefault = preventDefault ? false : true;
    button.style.color = preventDefault ? 'red' : 'black';
});
