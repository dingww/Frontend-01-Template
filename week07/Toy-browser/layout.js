function getStyle(element){
    // console.log(',,,', element)
    if(!element.style){
        element.style = {};
    }
    
    for(let prop in element.computedStyle){
        // console.log('222', prop, element.computedStyle.value)
        element.style[prop] = element.computedStyle[prop].value;
        if(element.style[prop].toString().match(/px$/) || element.style[prop].toString().match(/[0-9\.]+$/)){
            element.style[prop] = parseInt(element.style[prop])
        }
    }
    return element.style;
}

module.exports.layout = function layout(element){
   
    if(!element.computedStyle){
        return;
    }
    let elementStyle = getStyle(element);
    // console.log('dddd',elementStyle.display)
    if(elementStyle.display !== 'flex'){
        return;
    }
    // console.log('dddd',element)

    let items = element.children.filter((child) => child.type === 'element');

    items.sort((a, b) => (a.order || 0) - (b.order || 0));

    let style = elementStyle;
    // init width, height
    ['width', 'height'].forEach((key) => {
        if(style[key] === 'auto' || style[key] === ''){
            style[key] = null;
        }
    });
    // console.log('dddd',items)

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
        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }else if(style.flexDirection === 'row-reverse'){
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;
        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }else if(style.flexDirection === 'column'){
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;
        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }else if(style.flexDirection === 'column-reverse'){
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;
        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }

    if(style.flexWrap === 'wrap-reverse'){
        let tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    }else{
        crossBase = 0;
        crossSign = 1;
    }

    let isAutoMainSize = false;
    if(!style[mainSign]){
        elementStyle[mainSign] = 0;
        for(let i = 0; i < items.length; i++){
            let item = items[i];
            let itemStyle = getStyle(item);
            if(itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)){
                elementStyle[mainSign] = elementStyle[mainSign] + itemStyle[mainSize]
            }
        }
        isAutoMainSize = true;
    }
    let flexLine = [];
    let flexLines = [flexLine];

    let mainSpace = elementStyle[mainSize];
    var crossSpace = 0;
    for(let i = 0; i < items.length; i++){
        let item = items[i];
        let itemStyle = getStyle(item);

        if(itemStyle[mainSize] === null){
            itemStyle[mainSize] = 0;
        }
        if(itemStyle.flex){
            flexLine.push(item)
        }else if(style.flexWrap === 'nowrap' && isAutoMainSize){
            mainSpace -= itemStyle[mainSize];
            if(itemStyle[crossSize] !== null || itemStyle[crossSize] !== (void 0)){
                crossSpace = Math.max(itemStyle[crossSize], crossSpace);
            }
            flexLine.push(item)
        }else{
            if(itemStyle[mainSize] > style[mainSize]){
                itemStyle[mainSize] = style[mainSize]
            }
            if(mainSpace < itemStyle[mainSize]){
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;
                flexLine = [item]; //创建新的flexLine
               
                flexLines.push(flexLine);
                mainSpace = style[mainSize];
                crossSpace = 0;
            }else{
                flexLine.push(item);
            }
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)){
                crossSpace = Math.max(crossSpace, itemStyle[crossSize])
            }
            mainSpace -= itemStyle[mainSize];
        }
    }
    flexLine.mainSpace = mainSpace;

    if(style.flexWrap === 'nowrap' || isAutoMainSize){
        flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace;
    }else{
        flexLine.crossSpace = crossSpace;
    }

    if(mainSpace < 0){
        // overflow的情况（只有container是单行时出现），对每一个item做scale处理
        let scale = style[mainSize] / (style[mainSize] - mainSpace);
        let currentMain = mainBase;
        for(let i = 0; i < items.length; i++){
            let item = items[i];
            let itemStyle = getStyle(item);
            if(itemStyle.flex){
                itemStyle[mainSize] = 0;
            }
            itemStyle[mainSize] = itemStyle[mainSize] * scale;
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];

        }
    }else{
        // 计算每一行
        flexLines.forEach((items) => {
            let mainSpace = items.mainSpace;
            let flexTotal = 0;
            for(let i = 0; i < items.length; i++){
                let item = items[i];
                let itemStyle = getStyle(item);
                if((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))){
                    flexTotal +=itemStyle.flex;
                    continue;
                }
            }
            if(flexTotal > 0){
                // flexible flex items
                let currentMain = mainBase;
                for(let i = 0; i < items.length; i++){
                    let item = items[i];
                    let itemStyle = getStyle(item);
                    if(itemStyle.flex){
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                    }
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd];
                }
            }else{
                // 非 flexible flex items，justifyContent起作用
                let currentMain,step;
                if(style.justifyContent === 'center'){
                    currentMain = mainSpace / 2 * mainSign + mainBase;
                    step = 0;
                }
                if(style.justifyContent === 'flex-start'){
                    currentMain = mainBase;
                    step = 0;
                }
                if(style.justifyContent === 'flex-end'){
                    currentMain = mainSpace * mainSign + mainBase;
                    step = 0;
                }
                if(style.justifyContent === 'space-between'){
                    currentMain = mainBase;
                    step = mainSpace / (items.length - 1) * mainSign;
                }
                if(style.justifyContent === 'space-around'){
                    currentMain = mainBase;
                    step = mainSpace / items.length * mainSign;
                }
                for(let i = 0; i < items.length; i++){
                    let item = items[i];
                    let itemStyle = getStyle(item);
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd] + step;
                }
            }
        })
    }
    // console.log('---', flexLines.length, items.length)
    // 计算交叉轴的尺寸
    var crossSpace;
    if(!style[crossSize]){
        crossSpace = 0;
        style[crossSize] = 0;
        for(let i = 0; i < flexLines.length; i++){
            style[crossSize] = style[crossSize] + flexLines[i].crossSpace;
        }
    }else{
        crossSpace = style[crossSize];
        
        for(let i = 0; i < flexLines.length; i++){
            // console.log('crossSpace', i, JSON.stringify(flexLines[i], null, '   '))
            crossSpace -= flexLines[i].crossSpace;
        }
    }

    if(style.flexWrap === 'wrap-reverse'){
        crossBase = style[crosSize];
    }else{
        crossBase = 0;
    }

    // let lineSize = style[crosSize] / flexLines.length;

    let step;
    if(style.alignContent === 'flex-start'){
        crossBase += 0;
        step = 0;
    }
    if(style.alignContent === 'flex-end'){
        crossBase += crossSign * crossSpace;
        step = 0;
    }
    if(style.alignContent === 'center'){
        crossBase += crossSign * crossSpace/2;
        step = 0;
    }
    if(style.alignContent === 'space-between'){
        crossBase += 0;
        step = crossSpace / (flexLines.length - 1)
    }
    if(style.alignContent === 'space-around'){
        crossBase += crossSign * step / 2;
        step = crossSpace / flexLines.length;
    }
    if(style.alignContent === 'stretch'){
        crossBase += 0;
        step = 0;
    }

    flexLines.forEach((items) => {
        let lineCrossSize = style.alignContent === 'stretch' ? (items.crossSpace + crossSpace/flexLines.length) : items.crossSpace;
        for(let i = 0; i < items.length; i++){
            let item = items[i];
            let itemStyle = getStyle(item);
            let align = itemStyle.alignSelf || style.alignItems;
            if(item === null){
                itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0;
            }
            if(align === 'flex-start'){
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crosSize];
            }
            if(align === 'flex-end'){
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize]; 
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
            }
            if(align === 'stretch'){
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) ? itemStyle[crossSize] : lineCrossSize);
                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
            };
            if(align === 'center'){
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crosSize])/2;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
        }
        crossBase += crossSign * (lineCrossSize + step);
    })
    
    // console.log('ddd--d', JSON.stringify(items, null, '   '))

}

