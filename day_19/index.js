let FS = require('fs');

let ps = FS.readFileSync(__dirname + '/input.txt').toString()
    .split('\r\n\r\n')
    .map((b) => b.split('\r\n'))

let p1 = ps[0][0].split(', ')
let p2 = ps[1]

let mems = {
    '': 1
}

bran = (s) => {
    if(mems[s] !== undefined) return mems[s];

    l = p1.filter((n) => s.startsWith(n)).map((n) => {
        return bran(s.substr(n.length));
    });

    if(l.length == 0){
        mems[s] = 0;
    }else{
        mems[s] = l.reduce((x, y) => {
            return x + y;
        });
    }

    return mems[s];
}

flag = p2.map((l) => {
    return bran(l)
}).reduce((x, y) => {
    return x + y
})

console.log(flag)
