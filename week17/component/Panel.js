
import {create, Text, Wrapper} from './CreateElement';
// import {Timeline, Animation, ColorAnimation} from './animation';
// import {cubicBezier} from "./cubicBezier.js";


export default class Panel{
    constructor(config){
        this.children = [];
        this.attributes = new Map();
    }
    setAttribute(name, value){
        this[name] = value;
    }

    appendChild(child){
        this.children.push(child);
    }

    render(){
        
        return <div class="panel">
            <h1 style="background-color: lightblue;">{this.title}</h1>
            <div>
                {this.children}
            </div>
        </div>
    }


    mountTo(parent){
        this.render().mountTo(parent)
    }
}