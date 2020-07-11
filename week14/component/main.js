

import {create, Text, Wrapper} from './CreateElement';

// class MyComponent{
//     constructor(config){
//         this.children = [];
//     }
//     setAttribute(name, value){
//         this.root.setAttribute(name, value);
//     }

//     appendChild(child){
//         this.children.push(child);
//     }

//     render(){
//         return <article>
//             <header>I'm a header</header>
//             {this.slot}
//             <footer>I'm a footer</footer>
//         </article>
//     }

//     mountTo(parent){
        
//         this.slot = <div></div>;
//         for(let child of this.children){
//             this.slot.appendChild(child)
//         }
//         this.render().mountTo(parent)
//     }
// }
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

        let position = 0;
        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;
            let current = children[position];
            let next = children[nextPosition];

            current.style.transition = 'none';
            next.style.transition = 'none';

            current.style.transform = `translateX(${- 100 * position}%)`;
            next.style.transform = `translateX(${100 -100 * nextPosition}%)`;

            setTimeout(() => {
                current.style.transition = ''; // 表示用css的transition
                next.style.transition = '';
                current.style.transform = `translateX(${-100 - 100 * position}%)`;
                next.style.transform = `translateX(${-100 * nextPosition}%)`;

                position = nextPosition;
            }, 16);

            // requestAnimationFrame(() => {
            //     requestAnimationFrame(() => {
            //         current.style.transition = 'ease 0.5s';
            //         next.style.transition = 'ease 0.5s';
            //         current.style.transform = `translateX(${-100 - 100 * position}%)`;
            //         next.style.transform = `translateX(${-100 * nextPosition}%)`;
    
            //         position = nextPosition;
            //     })
            // })
            
            setTimeout(nextPic, 2000);
        } 
        // setTimeout(nextPic, 2000);
         
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

            current.style.transform = `translateX(${- 500 * position}px)`;
            last.style.transform = `translateX(${- 500 - 500 * lastPosition}px)`;
            next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;


            let move = (event) => {
                // console.log('move', current)
                // current.style.transform = `translateX(${event.clientX - startX})`;
                current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`;
                last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`;
                next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`;
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

                current.style.transform = `translateX(${offset * 500 - 500 * position}px)`;
                last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`;
                next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;

                position = (position - offset + this.data.length) % this.data.length;

                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
            };
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up)
        });
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

// let component = <div id="a" class="b" style="width:100px; height:100px;background-color: #fbb">
//     <div set="sss"></div>
//     <div>sss</div>
//     <div></div>
//     <div></div>
// </div>

component.mountTo(document.body);


// console.log(component)
