let FS = require('fs');

let input = FS.readFileSync(__dirname + '/input.txt').toString()
    .split('\r\n')
    .map((line) => {
        return line
    })

let flag = 0

const dont = /do(n't)?\(\)/g;
const mul = /mul\((?<x>\d+),(?<y>\d+)\)/g;

//LOGIC
let last = true
for(let i = 0; i < input.length; i++){
    let l = input[i];

    p = [...l.matchAll(dont)].map((m) => {
        return [m[0] == 'do()', m.index]
    });

    ;[...l.matchAll(mul)].forEach((m) => {
        while(p.length > 1 && m.index > p[1][1]){
            p.shift();
        }

        if(true || p[0][0] || (p[0][1] > m.index && last)){
            let x = parseInt(m.groups.x)
            let y = parseInt(m.groups.y)

            flag += x * y
        }
    })
    
    last = p[0][0]
}


console.log(flag)