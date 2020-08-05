var tty = require('tty');
var ttys = require('ttys');
// // var rl = require('readline');

// var stdin = process.stdin;
// var stdout = ttys.stdout;
// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// async function ask(question){
//     return new Promise((resolve, reject) =>{
//         rl.question(question, (answer) => {
//             // TODO：将答案记录在数据库中。
//             resolve(answer);
//           });
          
//     })
// }

// void async function(){
//     console.log(await ask('your project name?'))
// }()
var stdout = ttys.stdout;
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.setEncoding('utf8');

function getChar(){
    return new Promise(function(resolve){
        stdin.once('data', function(key){
            resolve(key);
        });
    })
}

function up(n=1){
    stdout.write('\033[' + n +'A')
}
function down(n=1){
    stdout.write('\033[' + n +'B')
}
function right(n=1){
    stdout.write('\033[' + n +'C')
}
function left(n=1){
    stdout.write('\033[' + n +'D')
}

void async function(){
    stdout.write("which framework do you want to use?\n")
    let answer = await select(["vue", "react", "angular"]);
    stdout.write("Your choices is " + answer + "\n");
    process.exit();
}();

async function select(choices){
    let selected = 0;
    for(let i = 0; i < choices.length; i++){
        if(i === selected){
            stdout.write("[\x1b[31mx\x1b[0m]" + choices[i] + '\n');
        }else{
            stdout.write("[ ]" + choices[i] + '\n');
        }
    }
    up(choices.length);
    right();
    while(true){
        let char = await getChar();
        if(char === '\u0003'){
            process.exit();
            break;
        }
        if(char === 'w' && selected > 0){
            stdout.write(' ');
            left();
            selected--;
            up();
            stdout.write('\x1b[31mx\x1b[0m');
            left();
        }
        if(char === 's' && selected < choices.length-1){
            stdout.write(' ');
            left();
            selected++;
            down();
            stdout.write('\x1b[31mx\x1b[0m');
            left();
        }
        if(char === "\r"){
            down(choices.length - selected);
            return choices[selected];
        }
    }
}