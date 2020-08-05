
import {create, Text, Wrapper} from './CreateElement';
// import {Timeline, Animation, ColorAnimation} from './animation';
// import {cubicBezier} from "./cubicBezier.js";

export default class TabPanel{
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.childViews = null;
    }
    setAttribute(name, value){
        this[name] = value;
    }
    getAttribute(name){
        return this[name];
    }
    appendChild(child){
        this.children.push(child);
    }

    select(i){
        for(let view of this.childViews){
            view.style.display = "none";
        }
        this.childViews[i].style.display = "";
        for(let view of this.titleViews){
            view.classList.remove("selected");
        }
        this.titleViews[i].classList.add("selected");
        // this.titleViews.innerText = this.children[i].title;
    }

    render(){
        this.childViews = this.children.map(child => <div style="height: 200px;width:300px;">{child}</div>);
        this.titleViews = this.children.map((child, i) => <span style="background-color: lightgreen; margin: 0 5px;" 
            onClick={() => this.select(i)}>{child.getAttribute('title')}</span>);

        setTimeout(() => this.select(0));
        return <div class="tab-panel">
            <h1>{this.titleViews}</h1>
            <div style="border: 1px solid lightgreen">
                {this.childViews}
            </div>
        </div>
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}