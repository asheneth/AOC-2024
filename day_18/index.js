let FS = require('fs');

let ps = FS.readFileSync(__dirname + '/input.txt').toString()
    .split('\r\n\r\n')
    .map((b) => {
        return b.split('\r\n').map((l) => {
            return l
                .split(',')
                .map((v) => parseInt(v))
        })
    })

adv = (g, p) => {
    g.v.push([p[0], p[1]])
}

rmv = (g, p) => {
    let i = g.v.findIndex((n) => n[0] == p[0] && n[1] == p[1])
    
    if(i != -1){
        g.v.splice(i, 1)

        while(i != -1){
            i = g.e.findIndex((n) => (n[0][0] == p[0] && n[0][1] == p[1]) || (n[1][0] == p[0] && n[1][1] == p[1]))

            if(i != -1) g.e.splice(i, 1)
        }
    }
}

ade = (g, e) => {
    g.e.push([[e[0][0], e[0][1]], [e[1][0], e[1][1]]])
}

rme = (g, e) => {
    let i = g.v.findIndex((n) => n[0][0] == e[0][0] && n[1][0] == e[1][0] && e[1][0] == e[1][0] && e[1][1] == e[1][1])
    
    if(i != -1) g.v.splice(i, 1)
}

gn = (g, p) => {
    return g.e.filter((e) => (e[0][0] == p[0] && e[0][1] == p[1]) || (e[1][0] == p[0] && e[1][1] == p[1])).map((e) => {
        if(e[0][0] == p[0] && e[0][1] == p[1]){
            return e[1]
        }else{
            return e[0]
        }
    })
}

st = (a) => {
    return `${a[0]},${a[1]}`
}

dj = (g, a) => {
    let d = {}
    let p = {}
    let q = [a]
    let v = []

    g.v.forEach((v) => {
        d[v] = Infinity
    })

    d[st(a)] = 0

    while(q.length > 0){
        q.sort((a, b) => d[a] - d[b])

        c = q.shift();

        if(v.some((v) => v[0] == c[0] && v[1] == c[1])) continue

        n = gn(g, c)

        n.forEach((n) => {
            if(!v.some((v) => v[0] == n[0] && v[1] == n[1])){
                q.push(n)

                p[st(n)] = c
                d[st(n)] = d[st(c)] + 1
            }
        })

        n.forEach((n) => {
            if(d[st(n)] + 1 < d[st(c)]){
                d[st(c)] = d[st(n)] + 1

                p[st(c)] = n
            }
        })

        v.push(c)
    }

    return p
}


idj = (p, a, b) => {
    pth = [b]
    
    c = b
    
    while(!(c[0] == a[0] && c[1] == a[1])){
        c = p[st(c)]

        pth.push(c)
    }

    return pth
}

let pl = ps[ps.length - 1]

g = {
    v: [],
    e: []
}

xm = 71
ym = 71

for(let y = 0; y < ym; y++){
    for(let x = 0; x < xm; x++){
        adv(g, [y, x])
    }
}

for(let y = 0; y < ym - 1; y++){
    for(let x = 0; x < xm; x++){
        ade(g, [[y, x], [y+1, x]])
    }
}

for(let y = 0; y < ym; y++){
    for(let x = 0; x < xm - 1; x++){
        ade(g, [[y, x], [y, x+1]])
    }
}

a = [0, 0]
b = [ym - 1, xm - 1]

pth = idj(dj(g, [0,0]), a, b)

pl.forEach((p) => {
    rmv(g, p)

    if(pth.some((n) => n[0] == p[0] && n[1] == p[1])){
        try{
            pth = idj(dj(g, [0,0]), a, b)
        }catch(err){
            console.log(p)

            process.exit(0)
        }
    }
})