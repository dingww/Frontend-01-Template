export class Timeline{
    constructor(){
        this.animations = new Set();
        this.requestID = null;
        this.state = 'inited';
        this.tick = () => {
            let t = Date.now() - this.startTime;
            for(let animation of this.animations){

                let {object, property, template, duration, start, end, timingFunction, delay, startTime, addTime} = animation;
                
                if(t < delay + addTime){
                    continue;
                }

                let progression = timingFunction((t - delay - startTime) / duration);

                if(t > duration + delay + startTime){
                    progression = 1;
                    this.animations.delete(animation);
                }
                let value = animation.valueFromProgression(progression);

                object[property] = template(value);
            }
            if(this.animations.size){
                this.requestID = requestAnimationFrame(this.tick);
            }else{
                this.requestID = null;
            }
        };
    }

    pause(){
        if(this.state !== 'playing'){
            return;
        }
        this.state = 'paused';
        this.pauseTime = Date.now();
        if(this.requestID !== null){
            cancelAnimationFrame(this.requestID)
            this.requestID = null;
        }
    }

    resume(){
        if(this.state !== 'paused'){
            return;
        }
        this.state = 'playing';
        this.startTime += Date.now() - this.pauseTime;
        this.tick();
    }

    start(){
        if(this.state !== 'inited'){
            return;
        }
        this.state = 'playing';
        this.startTime = Date.now();
        this.tick();
    }

    // restart(){
    //     if(this.state === 'playing'){
    //         this.pause();
    //     }
    //     for(let animation of this.finishedAnimations){
    //         this.animations.add(animation);
    //     }
    //     this.animations = new Set();
    //     this.requestID = null;
    //     this.state = 'playing';
    //     this.startTime = Date.now();
    //     this.pauseTime = null;
    //     this.tick();
    // }

    add(animation, addTime){
        this.animations.add(animation);
        if(this.state === 'playing' && this.requestID == null){
            this.requestID = requestAnimationFrame(this.tick);
        }
        if(this.state === 'playing'){
            animation.startTime = addTime !== void 0 ? addTime : Date.now() - this.startTime;
        }else{
            animation.startTime = addTime !== void 0 ? addTime : 0;
        }
       
    }
}

export class Animation{
    constructor(object, property, template, start, end, duration, delay, timingFunction, addTime){
        this.object = object;
        this.property = property;
        this.template = template;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay || 0;
        this.timingFunction = timingFunction;
        this.addTime = addTime;
    }

     valueFromProgression(progression){
         return this.start + progression * (this.end - this.start);
     }
}

export class ColorAnimation{
    constructor(object, property, start, end, duration, delay, timingFunction, template){
        this.object = object;
        this.property = property;
        this.template = template || ((v) => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay || 0;

        this.timingFunction = timingFunction;
    }

     valueFromProgression(progression){
         return {
             r: this.start.r + progression * (this.end.r - this.start.r),
             g: this.start.g + progression * (this.end.g - this.start.g),
             b: this.start.b + progression * (this.end.b - this.start.b),
             a: this.start.a + progression * (this.end.a - this.start.a)
         } 
     }
}
