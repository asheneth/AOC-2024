let FS = require('fs');

let ps = FS.readFileSync(__dirname + '/input.txt').toString()
    .split('\r\n\r\n')
    .map((b) => {
        return b.split('\r\n').map((l) => {
            return l
                .split('')
                .map((v) => parseInt(v))
        })
    })

let pl = ps[ps.length - 1]

let flag = 0

heads = []
next = {}

//LOGIC
for(let y = 0; y < pl.length; y++){
    let l = pl[y]
    for(let x = 0; x < l.length; x++){
        let c = l[x]

        if(c == 0){
            heads.push([y, x])
        }
    }
}

for(let y = 0; y < pl.length; y++){
    let l = pl[y]
    for(let x = 0; x < l.length; x++){
        let c = l[x]

        try{
            if(pl[y - 1][x] == c + 1){
                if(!next[`${y}_${x}`]) next[`${y}_${x}`] = []
                
                next[`${y}_${x}`].push([y - 1, x])
            }
        }catch{}

        try{
            if(pl[y + 1][x] == c + 1){
                if(!next[`${y}_${x}`]) next[`${y}_${x}`] = []
                
                next[`${y}_${x}`].push([y + 1, x])
            }
        }catch{}

        try{
            if(pl[y][x - 1] == c + 1){
                if(!next[`${y}_${x}`]) next[`${y}_${x}`] = []
                
                next[`${y}_${x}`].push([y, x - 1])
            }
        }catch{}

        try{
            if(pl[y][x + 1] == c + 1){
                if(!next[`${y}_${x}`]) next[`${y}_${x}`] = []
                
                next[`${y}_${x}`].push([y, x + 1])
            }
        }catch{}
    }
}

function find_trails(y, x, v, f = []){
    if(v == 9){
        if(!f.some((p) => p[0] == y && p[1] == x)){
            f.push([y, x])
            return 1
        }

        return 0
    }

    try{
        return next[`${y}_${x}`].map((p) => {
            return find_trails(p[0], p[1], v + 1, f)
        }).reduce((x, y) => {
            return x + y
        })
    }catch{
        return 0
    }
}

flag = heads.map((p) => {
    return find_trails(p[0], p[1], 0)
}).reduce((x, y) => {
    return x + y
})

console.log(flag)
