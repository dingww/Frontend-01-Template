const images = require('images');
function render(viewport, element){
    if(element.style){
        let img = images(element.style.width || 250, element.style.height || 200);
        if(element.style['background-color']){
            let color = element.style['background-color'] || 'rgb(0, 0, 0)';
            color.match(/rgb\((\d+), (\d+), (\d+)\)/);
            
            img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3), 1);
            viewport.draw(img, element.style.left || 0, element.style.top || 0);
        }
    }

    if(element.children){
        for(let child of element.children){
            render(viewport, child);
        }
    }
}

module.exports = render;