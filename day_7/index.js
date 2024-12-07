let FS = require('fs');

let ps = FS.readFileSync(__dirname + '/input.txt').toString()
    .split('\r\n\r\n')
    .map((b) => {
        return b.split('\r\n').map((l) => {
            return [BigInt(l.split(': ')[0]), l.split(': ')[1].split(' ').map((v) => BigInt(v))]
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
flag = pl.map((l) => {
    let foun = false
    for(let i = 0; i < (3 ** (l[1].length - 1)); i++){
        let v = l[1][0];
        let f = i
        for(let j = 1; j < l[1].length; j++){
            if(f % 3 == 0){
                v += l[1][j]
            }else if(f % 3 == 1){
                v *= l[1][j]
            }else{
                v = BigInt(v.toString() + l[1][j].toString())
            }

            f = Math.floor(f / 3)
        }

        if(v == l[0]){
            foun = true

            break
        }
    }

    if(foun){
        return l[0]
    }else{
        return 0
    }
}).reduce((x, y) => {
    return BigInt(x) + BigInt(y)
})

console.log(flag)
