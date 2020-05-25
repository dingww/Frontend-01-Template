function getStyle(element){
    // console.log(',,,', element)
    if(!element.style){
        element.style = {};
    }
    // console.log('------------/------------', JSON.stringify(element, null, '   '))
    
    for(let prop in element.computedStyle){
        // console.log('222', prop, element.computedStyle.value)
        element.style[prop] = element.computedStyle[prop].value;
        if(element.style[prop].toString().match(/px$/) || element.style[prop].toString().match(/[0-9\.]+$/)){
            element.style[prop] = parseInt(element.computedStyle[prop].value)
        }
    }
    return element.style;
}

module.exports.layout = function layout(element){
    // console.log('///',element)
    if(!element.computedStyle){
        return;
    }
    let elementStyle = getStyle(element);
    if(elementStyle.display !== 'flex'){
        return;
    }

    let items = element.children.filter((child) => child.type === 'element');

    items.sort((a, b) => (a.order || 0) - (b.order || 0));

    let style = elementStyle;
    // init width, height
    ['width', 'height'].forEach((key) => {
        if(style[key] === 'auto' || style[key] === ''){
            style[key] = null;
        }
    });

    // init flexDirection, alignItems, justifyContent, flexWrap, alignContent
    if(!style.flexDirection || style.flexDirection === 'auto'){
        style.flexDirection = 'row';
    }
    if(!style.alignItems || style.alignItems === 'auto'){
        style.alignItems = 'strecth';
    }
    if(!style.justifyContent || style.justifyContent === 'auto'){
        style.justifyContent = 'flex-start';
    }
    if(!style.flexWrap || style.flexWrap === 'auto'){
        style.flexWrap = 'nowrap';
    }
    if(!style.alignContent || style.alignContent === 'auto'){
        style.alignContent = 'strecth';
    }

    let mainSize, mainStart, mainEnd, mainSign, mainBase,
    crossSize, crossStart, crossEnd, crossSign, crossBase;
    
    if(style.flexDirection === 'row'){
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;
        crossSize = style.height;
        crossStart = 'top';
        crossEnd = 'bottom';
    }else if(style.flexDirection === 'row-reverse'){
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;
        crossSize = style.height;
        crossStart = 'top';
        crossEnd = 'bottom';
    }else if(style.flexDirection === 'column'){
        mainSign = height;
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;
        crossSize = style.width;
        crossStart = 'left';
        crossEnd = 'right';
    }

    // console.log(JSON.stringify(elementStyle, null, '   '));

}

