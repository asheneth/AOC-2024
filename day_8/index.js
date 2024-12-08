let FS = require('fs');

let ps = FS.readFileSync(__dirname + '/input.txt').toString()
    .split('\r\n\r\n')
    .map((b) => {
        return b.split('\r\n').map((l) => {
            return l
                .split('')
                // .map((v) => parseInt(v))
        })
    })


// let key = input[0];
// input = input.slice(1);

let pl = ps[ps.length - 1]

nets = {}

pl.forEach((l, y) => {
    l.forEach((v, x) => {
        if(v != '.'){
            if(!nets[v]) nets[v] = []

            nets[v].push([y, x])
        }
    })
})

n = []

pl.forEach((l) => {
    n.push([])

    l.forEach(() => {
        n[n.length - 1].push(0)
    })
})

Object.keys(nets).forEach((k) => {
    g = nets[k]
    for(let i = 0; i < g.length; i++){
        v1 = g[i]
        for(let j = i + 1; j < g.length; j++){
            v2 = g[j]

            dy = g[i][0] - g[j][0]
            dx = g[i][1] - g[j][1]

            n[g[i][0]][g[i][1]] = 1
            n[g[j][0]][g[j][1]] = 1

            cy = g[i][0] + dy
            cx = g[i][1] + dx
            while(cy < n.length && cy >= 0 && cx < n[0].length && cx >= 0){
                n[cy][cx] = 1
                cy += dy
                cx += dx
            }
            
            cy = g[j][0] - dy
            cx = g[j][1] - dx
            while(cy < n.length && cy >= 0 && cx < n[0].length && cx >= 0){
                n[cy][cx] = 1
                cy -= dy
                cx -= dx
            }
        }
    }
})

let flag = 0

//LOGIC
flag = n.map((l) => {
    return l.reduce((x,y) => x+y)
}).reduce((x, y) => {
    return x + y
})

console.log(flag)
