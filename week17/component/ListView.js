
import {create, Text, Wrapper} from './CreateElement';
// import {Timeline, Animation, ColorAnimation} from './animation';
// import {cubicBezier} from "./cubicBezier.js";


export default class ListView{
    constructor(config){
        this.children = [];
        this.attributes = new Map();
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

    render(){
        let data = this.getAttribute("data");
        return <div class="list-view" style="width: 300px;">
           {data.map(this.children[0])}
        </div>
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}