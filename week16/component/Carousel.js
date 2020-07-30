

import {create, Text, Wrapper} from './CreateElement';
import {Timeline, Animation, ColorAnimation} from './animation';
import {cubicBezier} from "./cubicBezier.js";
export default class Carousel{
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.data = new Map();
    }
    setAttribute(name, value){
        this[name] = value;
    }

    appendChild(child){
        this.children.push(child);
    }

    timelineLoop(children){
        
    }

    drag(root, children){
        let position = 0;
        let linear = t => t;
        let ease = cubicBezier(.25,.1,.25,1);
        root.addEventListener('mousedown', (event) => {
            let startX = event.clientX;
            let lastPosition = (position - 1 + this.data.length) % this.data.length;
            let nextPosition = (position + 1) % this.data.length;

            let current = children[position];
            let last = children[lastPosition];
            let next = children[nextPosition];

            // console.log('mousedown')
            current.style.transition = 'none';
            last.style.transition = 'none';
            next.style.transition = 'none';

            // 引入动画时间线
            let tl = new Timeline();

            // current.style.transform = `translateX(${- 500 * position}px)`;
            // last.style.transform = `translateX(${- 500 - 500 * lastPosition}px)`;
            // next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;


            let move = (event) => {
                // console.log('move', current)
                // 添加动画
                tl.add(new Animation(current.style, 'transform', v => `translateX(${v}px)`, - 500 * position, event.clientX - startX - 500 * position, 0, 0, linear))
                tl.add(new Animation(last.style, 'transform', v => `translateX(${v}px)`,  - 500 - 500 * lastPosition, event.clientX - startX - 500 - 500 * lastPosition, 0, 0, linear))
                tl.add(new Animation(next.style, 'transform', v => `translateX(${v}px)`,  500 - 500 * nextPosition, event.clientX - startX + 500 - 500 * nextPosition, 0, 0, linear))
                tl.start();


                // current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`;
                // last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`;
                // next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`;
            };
            let up = (event) => {
                let offset = 0;
                if(event.clientX - startX > 250){
                    offset = 1;
                }else if(event.clientX - startX < -250){
                    offset = -1;
                }

                current.style.transition = 'ease-out 0.2s'; // 添加transition效果
                last.style.transition = 'ease-out 0.2s';
                next.style.transition = 'ease-out 0.2s';

                tl.add(new Animation(current.style, 'transform', v => `translateX(${v}px)`,  - 500 * position,  offset * 500 - 500 * position, 0, 0, linear))
                tl.add(new Animation(last.style, 'transform', v => `translateX(${v}px)`, - 500 - 500 * lastPosition, offset * 500 - 500 - 500 * lastPosition, 0, 0, linear))
                tl.add(new Animation(next.style, 'transform', v => `translateX(${v}px)`, 500 - 500 * nextPosition, offset * 500 + 500 - 500 * nextPosition, 0, 0, linear))
                tl.start();

                // current.style.transform = `translateX(${offset * 500 - 500 * position}px)`;
                // last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`;
                // next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;

                position = (position - offset + this.data.length) % this.data.length;

                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
            };
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up)
        });
    }

    render(){
        let timeline = new Timeline();
        timeline.start();

        let linear = t => t;
        let ease = cubicBezier(.25,.1,.25,1);

        let position = 0;

        let nextPicStopHandler = null;

        let children = this.data.map((url, currentPosition) => {

            let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
            let nextPosition = (currentPosition + 1) % this.data.length;
            let offset = 0;
            
            let onStart = () => {
                timeline.pause();
                clearTimeout(nextPicStopHandler);

                let currentElement = children[currentPosition];
                // console.log('currentPosition', currentPosition)
                let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
                offset = currentTransformValue + 500 * currentPosition;
            }
            let onPan = event => {
                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let dx = event.detail.clientX - event.detail.startX;

                let lastTransformValue = - 500 - 500 * lastPosition + offset + dx;
                let currentTransformValue = - 500 * currentPosition + offset + dx;
                let nextTransformValue = 500 - 500 * nextPosition + offset + dx;

                currentElement.style.transform = `translateX(${currentTransformValue}px)`;
                lastElement.style.transform = `translateX(${lastTransformValue}px)`;
                nextElement.style.transform = `translateX(${nextTransformValue}px)`;
            //    console.log(currentPosition, offset, dx, currentTransformValue)
            }

            let onPanend = event => {
                let direction = 0;
                let dx = event.detail.clientX - event.detail.startX;

                if(dx + offset > 250){
                    direction = 1;
                }else if(dx + offset < -250){
                    direction = -1;
                }
                
                timeline.reset();
                timeline.start();

                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let lastAnimation = new Animation(lastElement.style, 'transform', v => `translateX(${v}px)`, - 500 - 500 * lastPosition + offset + dx, - 500 - 500 * lastPosition + direction * 500, 500, 0, ease);
                let currentAnimation = new Animation(currentElement.style, 'transform', v => `translateX(${v}px)`, - 500 * currentPosition + offset + dx, - 500 * currentPosition + direction * 500, 500, 0, ease);
                let nextAnimation = new Animation(nextElement.style, 'transform', v => `translateX(${v}px)`, 500 - 500 * nextPosition + offset + dx, 500 - 500 * nextPosition + direction * 500, 500, 0, ease);
                timeline.add(lastAnimation);
                timeline.add(currentAnimation);
                timeline.add(nextAnimation);

                position = (position - direction + this.data.length) % this.data.length;
                nextPicStopHandler = setTimeout(nextPic, 2000);
            }

            let element = <img src={url} onStart={onStart} onPan={onPan} onPanend={onPanend} enableGesture={true}/>;
            element.style.transform = 'translateX(0px)';
            element.addEventListener("dragstart", event => event.preventDefault());
            return element;
        });
        
        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;
            let current = children[position];
            let next = children[nextPosition];

            let currentAnimation = new Animation(current.style, 'transform', v => `translateX(${5 * v}px)`, - 100 * position, -100 - 100 * position, 500, 0, linear)
            let nextAnimation = new Animation(next.style, 'transform', v => `translateX(${5 * v}px)`, 100 - 100 * nextPosition, - 100 * nextPosition, 500, 0, linear)
            timeline.add(currentAnimation);
            timeline.add(nextAnimation);
            
            position = nextPosition;

            nextPicStopHandler = setTimeout(nextPic, 2000);
        } 
        nextPicStopHandler = setTimeout(nextPic, 2000);

        let root = <div class="carousel">
            {
                children
            }
        </div>
        
        // this.timelineLoop(children);
        // this.drag(root, children);
        return root;
    }

    mountTo(parent){
        this.slot = <div></div>;
        for(let child of this.children){
            this.slot.appendChild(child)
        }
        this.render().mountTo(parent)
    }
}