    // 解法一：
    function match(string) {
        let state = start;
        for (let c of string) {
            state = state(c);
        }
        return state === end;
    }

    function start(c) {
        if (c === 'a') {
            return foundA;
        } else {
            return start;
        }
    }

    function end(c) {
        return end;
    }

    function foundA(c) {
        if (c === 'b') {
            return foundB;
        } else {
            return start;
        }
    }

    function foundB(c) {
        if (c === 'a') {
            return found2A;
        } else {
            return start;
        }
    }

    function found2A(c) {
        if (c === 'b') {
            return found2B;
        } else {
            return start;
        }
    }
    function found2B(c) {
        if (c === 'a') {
            return found3A;
        } else {
            return start;
        }
    }
    function found3A(c) {
        if (c === 'b') {
            return found3B;
        } else {
            return start;
        }
    }
    function found3B(c) {
        if (c === 'x') {
            return end;
        } else if(c === 'a') {
            return found3A;
        }else{
            return start;
        }
    }
    // 解法二：
    // let flag = 0;
    // function start(c) {
    //     flag = 0;
    //     if (c === 'a') {
    //         return foundA;
    //     } else {
    //         return start;
    //     }
    // }
    // function foundA(c) {
    //     if (c === 'b') {
    //         flag ++;
    //         return foundB;
    //     } else {
    //         return start;
    //     }
    // }
    // function foundB(c) {
    //     if(flag === 3){
    //         if(c === 'x'){
    //             return end
    //         }else if(c === 'a'){
    //             flag --;
    //             return foundA;
    //         }else{
    //             return start;
    //         }
    //     }else{
    //         if(c === 'a'){
    //             return foundA;
    //         }else{
    //             return start;
    //         }
    //     }
    // }
    // 测试用例：
    console.log(match('abababx'));
    console.log(match('abababababx'));
    console.log(match('ababx'));
    console.log(match('aaababx'));
    console.log(match('aabababxab'));
    console.log(match('bbabaabx'));
    console.log(match('bbbababxab'));
    console.log(match('ababcabxab'));
