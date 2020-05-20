const css = require('css');
const EOF = Symbol('EOF');
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;

let stack = [{
    type: 'document',
    children: []
}];

let rules = [];
function addCSSRules(text){
    let ast = css.parse(text);
    rules.push(...ast.stylesheet.rules);
}

function computeCSS(element){
    let elements = stack.slice().reverse();
    if(!element.computedStyle){
        element.computedStyle = {}
    }
    // console.log('rules', JSON.stringify(rules, null, '   '))
    for(let rule of rules){
        // console.log('rule', rule)
        let selectorParts = rule.selectors[0].split(' ').reverse();
        if(!match(element, selectorParts[0])){
            continue;
        }
        let matched = false;
        let j = 1;
        for(let i = 0; i < elements.length; i++){
            if(match(elements[i], selectorParts[j])){
                j++;
            }
        }
        if(j >= selectorParts.length){
            matched = true
        }
        if(matched){
            let sp = specificity(rule.selectors[0]);
            let computedStyle = element.computedStyle;
            for(let declaration of rule.declarations){
                if(!computedStyle[declaration.property]){
                    computedStyle[declaration.property] = {}
                }
                if(!computedStyle[declaration.property].specificity){
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }else if(compare(computedStyle[declaration.property].specificity, sp) < 0){
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }
                
            }
            // console.log('matched!', element)
        }
    }
}

function specificity(selector){
    let p = [0,0,0,0];
    let selectorParts = selector.split(' ');
    for(let part of selectorParts){
        if(part.charAt(0) == '#'){
            p[1] += 1;
        }else if(part.charAt(0) == '.'){
            p[2] += 1;
        }else{
            p[3] += 1;
        }
    }
    return p;
}

function compare(sp1, sp2){
    if(sp1[0] - sp2[0]){
        return sp1[0] - sp2[0];
    }else if(sp1[1] - sp2[1]){
        return sp1[1] - sp2[1];
    }else if(sp1[2] - sp2[2]){
        return sp1[2] - sp2[2];
    }else{
        return sp1[3] - sp2[3];
    }
}

function match(element, selector){
    if(!element.attributes || !selector){
        return false;
    }
    // console.log('element.attributes', element.attributes)
    if(selector.charAt(0) === '#'){
        let attr = element.attributes.filter((attr) => attr.name == 'id')[0];
        if(attr && attr.value === selector.slice(1)){
            return true
        }
    }else if(selector.charAt(0) === '.'){
        let attr = element.attributes.filter((attr) => attr.name == 'class')[0];
        if(attr && attr.value === selector.slice(1)){
            return true
        }
    }else{
        if(element.tagName == selector){
            return true
        }
    }
    return false;
}

function emit(token){
    // if(token.type == 'text'){
    //     return ;
    // }
    
    let top = stack[stack.length -1]; // 引用赋值
    // console.log('----', stack, top)
    if(token.type == 'startTag'){
        let element = {
            type: 'element',
            children: [],
            attributes: []
        }
        element.tagName = token.tagName;
        for(let p in token){
            if(p !== 'type' && p !== 'tagName'){
                element.attributes.push({
                    name: p,
                    value: token[p]
                });
            }
        }
        // console.log('111',element)
        computeCSS(element);
        // console.log('222',element)

        top.children.push(element); // 此时stack里面的children也跟着改变
        // element.parent = top;
        if(!currentToken.isSelfClosing){
            stack.push(element);
        }
        currentTextNode = null;
        // console.log(stack)
    }else if(token.type== 'endTag'){
        if(top.tagName != token.tagName){
            throw new Error("Tag start end dosen't match!");
        }else{
            if(top.tagName == 'style'){
                // console.log('top.children[0].content', top.children[0])
                addCSSRules(top.children[0].content);
            }
            stack.pop();
        }
        currentTextNode = null;
    }else if(token.type == 'text'){
        if(currentTextNode == null){
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content;
    }
}

function data(c){
    if(c == '<'){
        return tagOpen;
    }else if(c == EOF){
        emit({
            type: 'EOF',
        });
        return ;
    }else{
        emit({
            type: 'text',
            content: c
        });
        return data;
    }
}

function tagOpen(c){
    // console.log('333', c, c.match(/^[a-zA-Z]$/))
    if(c == '/'){
        return endTagOpen;
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c);
    }else{
        emit({
            type: 'text',
            content: c 
        })
        return ;
    }
}

function endTagOpen(c){
    if(c.match(/^[a-zA-Z]$/)){
        currentToken={
            type: 'endTag',
            tagName: ''
        }
        return tagName(c);
    }else if(c == '>'){

    }else if(c == EOF){

    }else{

    }
}

function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c.match(/^[A-Z]$/)){
        currentToken.tagName += c;
        return tagName;
    }else if(c == '/'){
        return selfClosingStartTag
    }else if(c == '>'){
        emit(currentToken)
        return data;
    }else{
        currentToken.tagName += c;
        return tagName;
    }
}


function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == '/' || c == '>' || c == EOF){
        return afterAttributeName(c);
    }else if(c == '='){
        
    }else{
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c);
    }
}

function attributeName(c){
    if(c.match(/^[\n\t\f ]$/) || c == '/' || c == '>' || c == EOF){
        return afterAttributeName(c);
    }else if(c == '='){
        return beforeAttributeValue;
    }else if(c == '\u0000'){

    }else if(c == '\"' || c == "'" || c == "<" ){

    }else{
        currentAttribute.name += c;
        return attributeName;
    }
}

function afterAttributeName(c){
    if(c.match(/^[\n\t\f ]$/)){
        return afterAttributeName;
    }else if(c == '/'){
        return selfClosingStartTag;
    }else if(c == '>'){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == '='){
        return beforeAttributeValue;
    }else if(c == EOF){

    }else{
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c);
    }
}
function beforeAttributeValue (c){
    // c == '/' || c == EOF ????
    if(c.match(/^[\n\t\f ]$/) || c == '/' || c == '>'|| c == EOF){
        return beforeAttributeValue;
    }else if(c == "\""){
        return doubleQuotedAttributeValue;
    }else if(c == "\'"){
        return singleQuotedAttributeValue;
    }else if(c == ">"){
        // return data;
    }else{
        return unquotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c){
    if(c == "\""){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }else if(c == '\u0000'){

    }else if(c == EOF){

    }else{
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c){
    if(c == "\'"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }else if(c == '\u0000'){

    }else if(c == EOF){

    }else{
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function unquotedAttributeValue(c){
    if(c.match(/^[\n\t\f ]$/)){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    }else if(c == '/'){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    }else if(c == '>'){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == '\u0000'){

    }else if(c == "\"" || c == "'" || c == "<" || c == "=" || c == "`"){

    }else if(c == EOF){

    }else{
        currentAttribute.value += c;
        return unquotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c){
    if(c.match(/^[\n\t\f ]$/)){
        return beforeAttributeName;
    }else if(c == '/'){
        return selfClosingStartTag;
    }else if(c == '>'){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == EOF){

    }else{ // 来字母的情况
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}


function selfClosingStartTag(c){
    if(c == '>'){
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    }else if(c === 'EOF'){

    }else{

    }
}


module.exports.parseHTML = function parseHTML(html){
    // console.log('2222',html);
    let state = data;
    for(let c of html){
        state = state(c);
    }
    state = state(EOF);
    return stack[0];
}