let FS = require('fs');

let input = FS.readFileSync(__dirname + '/input.txt').toString()
    .split('\r\n\r\n')
    .map((line) => {
        return line
            .split('\r\n')
            // .map((v) => parseInt(v))
    })

let p1 = input[0].map((l) => l.split('|').map((v) => parseInt(v)))
let p2 = input[1].map((l) => l.split(',').map((v) => parseInt(v)))
// let key = input[0];
// input = input.slice(1);

let flag = 0

//LOGIC
// for(let i = 0; i < input.length; i++){
//     // if(i % 2 != 0) return;

//     let l = input[i]

//     for(let j = 0; j < l.length; j++){
//         // if(j % 2 != 0) return;
//     }
// }

flag = p2.filter((l) => {
    let bad = false

    p1.forEach((r) => {
        if(bad) return

        if(l.includes(r[0]) && l.includes(r[1])){
            bad = l.indexOf(r[0]) > l.indexOf(r[1])
        }
    })

    return bad
}).map((l) => {
    bad = true
    while(bad){
        p1.forEach((r) => {
    
            if(l.includes(r[0]) && l.includes(r[1])){
                if(l.indexOf(r[0]) > l.indexOf(r[1])){
                    i1 = l.indexOf(r[0])
                    i2 = l.indexOf(r[1])
    
                    l[i1] = r[1]
                    l[i2] = r[0]
                }
            }
        })

        bad = false

        p1.forEach((r) => {
            if(bad) return

            if(l.includes(r[0]) && l.includes(r[1])){
                bad = l.indexOf(r[0]) > l.indexOf(r[1])
            }
        })
        }

    return l
}).map((l) => {
    return l[(l.length - 1) / 2]
}).reduce((x, y) => x + y)


console.log(flag)
