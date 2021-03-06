export class Timeline{
    constructor(){
        this.animations = new Set();
        this.finishedAnimations = new Set();
        this.addTimes = new Map();
        this.requestID = null;
        this.state = 'inited';
        this.tick = () => {
            let t = Date.now() - this.startTime;
            for(let animation of this.animations){

                let {object, property, template, duration, start, end, timingFunction, delay} = animation;
                let addTime = this.addTimes.get(animation)
                if(t < delay + addTime){
                    continue;
                }

                let progression = timingFunction((t - delay - addTime) / duration);
                // console.log('progression', progression)
                if(t > duration + delay + addTime){
                    progression = 1;
                    this.animations.delete(animation);
                    this.finishedAnimations.add(animation);
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
    //暂停
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

    // pause后的重新开始
    resume(){
        if(this.state !== 'paused'){
            return;
        }
        this.state = 'playing';
        this.startTime += Date.now() - this.pauseTime;
        this.tick();
    }

    // 动画开始
    start(){
        if(this.state !== 'inited'){
            return;
        }
        this.state = 'playing';
        this.startTime = Date.now();
        this.tick();
    }

    // 重置动画
    reset(){
        if(this.state === 'playing'){
            this.pause();
        }
        this.animations = new Set();
        this.addTimes = new Map();
        this.finishedAnimations = new Set();
        this.requestID = null;
        this.state = 'inited';
        this.startTime = Date.now();
        this.pauseTime = null;
        this.tick();
    }

    // 从头开始重播一遍动画
    restart(){
        if(this.state === 'playing'){
            this.pause();
        }
        for(let animation of this.finishedAnimations){
            this.animations.add(animation);
        }
        this.finishedAnimations = new Set();
        this.requestID = null;
        this.state = 'playing';
        this.startTime = Date.now();
        this.pauseTime = null;
        this.tick();
    }

    // 将动画加入时间线
    add(animation, addTime){ 
        this.animations.add(animation);
        if(this.state === 'playing' && this.requestID == null){
            this.tick();
        }     
        if(this.state === 'playing'){
            this.addTimes.set(animation, addTime !== void 0 ? addTime : Date.now() - this.startTime);
        }else{
            this.addTimes.set(animation, addTime !== void 0 ? addTime : 0);
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

// 颜色变化的动画
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
