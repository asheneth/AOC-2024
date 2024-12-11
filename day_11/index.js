let FS = require('fs');

let ps = FS.readFileSync(__dirname + '/input.txt').toString()
    .split('\r\n\r\n')
    .map((b) => {
        return b.split('\r\n').map((l) => {
            return l
                .split(' ')
                .map((v) => BigInt(v))
        })
    })

let pl = ps[ps.length - 1][0]

mems = {
    '0': [BigInt(1)]
}

b = {}

pl.forEach((s) => {
    if(!b[s]){
        b[s] = BigInt(0);
    }

    b[s]++;
})

let flag = 0

//LOGIC
for(i = 0; i < 75; i++){
    g = Object.keys(b)
    b2 = {}
    for(let y = 0; y < g.length; y++){
        let l = BigInt(g[y])
    
        if(!mems[l]){
            str = l.toString()

            if(str.length % 2 == 0){
                mems[l] = [BigInt(str.substr(0, str.length / 2)), BigInt(str.substr(str.length / 2))]
            }else{
                mems[l] = [l * BigInt(2024)]
            }
        }

        mems[l].forEach((s) => {
            if(!b2[s]){
                b2[s] = BigInt(0);
            }
        
            b2[s] += b[l];
        })
    }

    b = b2
}

flag = Object.keys(b).map((s) => b[s]).reduce((x,y) => x+y)

console.log(flag)