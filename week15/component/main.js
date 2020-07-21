

import {create, Text, Wrapper} from './CreateElement';
import {Timeline, Animation, ColorAnimation} from './animation';
import {cubicBezier} from "./cubicBezier.js";

// import {Carousel} from './carousel.view';
class Carousel{
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

    loop(children){
        let linear = t => t;
        let ease = cubicBezier(.25,.1,.25,1);

        let position = 0;
        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;
            let current = children[position];
            let next = children[nextPosition];

            current.style.transition = 'none';
            next.style.transition = 'none';

            // current.style.transform = `translateX(${- 100 * position}%)`;
            // next.style.transform = `translateX(${100 -100 * nextPosition}%)`;


            // 引入动画时间线
            let tl = new Timeline();
            // 添加动画
            tl.add(new Animation(current.style, 'transform', v => `translateX(${v}%)`, - 100 * position, -100 - 100 * position, 500, 0, linear));
            tl.add(new Animation(next.style, 'transform', v => `translateX(${v}%)`, 100 - 100 * nextPosition, - 100 * nextPosition, 500, 0, linear));
            
            tl.start();
            setTimeout(() => { 
                current.style.transition = ''; // 表示用css的transition
                next.style.transition = '';
                tl.add(new Animation(current.style, 'transform', v => `translateX(${v}%)`,  100 - 100 * position, - 100 * position, 0, 0, linear));
                tl.add(new Animation(next.style, 'transform', v => `translateX(${v}%)`,  200 - 100 * nextPosition, 100 - 100 * nextPosition, 0, 0, linear));
                tl.start();
                // current.style.transform = `translateX(${-100 - 100 * position}%)`;
                // next.style.transform = `translateX(${-100 * nextPosition}%)`;
                position = nextPosition;
            }, 16);

            // 效果等同于setTimeout，1帧（16s）运行一次里面的代码；
            // requestAnimationFrame(() => {
            //     requestAnimationFrame(() => {
            //         current.style.transition = 'ease 0.5s';
            //         next.style.transition = 'ease 0.5s';
            //         current.style.transform = `translateX(${-100 - 100 * position}%)`;
            //         next.style.transform = `translateX(${-100 * nextPosition}%)`;
    
                    // position = nextPosition;
            //     })
            // })
            
            setTimeout(nextPic, 2000);
        } 
        setTimeout(nextPic, 2000);
    }

    drag(root, children){
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
        let children = this.data.map(url => {
            let element = <img src={url}/>;
            element.addEventListener("dragstart", event => event.preventDefault());
            return element;
        });
        let root = <div class="carousel">
            {
                children
            }
        </div>
        
        this.loop(children);
        this.drag(root, children);
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

let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]}/>


component.mountTo(document.body);


// console.log(component)
