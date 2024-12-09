let FS = require('fs');

let ps = FS.readFileSync(__dirname + '/input.txt').toString()
    .split('\r\n\r\n')
    .map((b) => {
        return b.split('\r\n').map((l) => {
            return l
                // .split(' ')
                // .map((v) => parseInt(v))
        })
    })


// let key = input[0];
// input = input.slice(1);

let pl = ps[ps.length - 1]
let p1 = ps[0]
// let p2 = ps[1]

let flag = 0

//LOGIC
for(let y = 0; y < pl.length; y++){
    let l = pl[y]
    for(let x = 0; x < l.length; x++){
        let c = l[x]
    }
}

flag = pl.map((l) => {
    return l
}).reduce((x, y) => {
    return x + y
})

console.log(flag)
