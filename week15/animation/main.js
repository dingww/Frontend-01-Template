import {Timeline, Animation, ColorAnimation} from './animation';
import {cubicBezier} from "./cubicBezier.js";

let el = document.getElementById('el');
let el2 = document.getElementById('el2');
let btn = document.getElementById('btn');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');
let btn4 = document.getElementById('btn4');
let tl = new Timeline();

let linear = t => t;
let ease = cubicBezier(.25,.1,.25,1);
// let ease = t => t;
tl.add(new Animation(el.style, 'transform', v => `translateX(${v}px)`, 0, 200, 2000, 0, ease));
tl.start();

btn.addEventListener('click', () => tl.pause())
btn2.addEventListener('click', () => tl.resume())
btn3.addEventListener('click', () => tl.restart())
btn4.addEventListener('click', () => tl.add(new ColorAnimation(el2.style, 'backgroundColor',  {r: 0, g: 0, b: 0, a: 0.5}, {r: 255, g: 0, b: 0, a: 0.5}, 2000, 0, ease)));

// el2.style.transform = 'translateX(200px)'
// console.log(el)
