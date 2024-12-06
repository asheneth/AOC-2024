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

let pl = JSON.parse(JSON.stringify(ps[ps.length - 1]))

let flag = 0

//LOGIC
u = JSON.parse(JSON.stringify(pl))
d = JSON.parse(JSON.stringify(pl))
l = JSON.parse(JSON.stringify(pl))
r = JSON.parse(JSON.stringify(pl))

u = u.map((l) => l.map((v) => false))
d = d.map((l) => l.map((v) => false))
l = l.map((l) => l.map((v) => false))
r = r.map((l) => l.map((v) => false))

y = pl.findIndex((l) => l.includes('^'))
x = pl[y].findIndex((v) => v == '^')
sx = x
sy = y

pl[y][x] = 'X'
u[y][x] = true
let direct = 0

run = (cb) => {
    while(true){
        try{
            if(direct == 0){
                n = pl[y - 1][x]
        
                if(n == '#'){
                    direct++
                    direct %= 4
                }else{
                    pl[y - 1][x] = 'X'
        
                    if(u[y - 1][x]){
                        cb(true)
                        break
                    }else{
                        u[y][x] = true
                        y--
                    }
                }
            }
            
            if(direct == 1){
                n = pl[y][x + 1]
                
                if(n == undefined) throw new Error()
        
                if(n == '#'){
                    direct++
                    direct %= 4
                }else{
                    pl[y][x + 1] = 'X'
        
                    if(r[y][x + 1]){
                        cb(true)
                        break
                    }else{
                        r[y][x] = true
                        x++
                    }
                }
            }
        
            if(direct == 2){
                n = pl[y + 1][x]

                if(n == '#'){
                    direct++
                    direct %= 4
                }else{
                    pl[y + 1][x] = 'X'
        
                    if(d[y + 1][x]){
                        cb(true)
                        break
                    }else{
                        d[y][x] = true
                        y++
                    }
                }
            }
            
            if(direct == 3){
                n = pl[y][x - 1]
                
                if(n == undefined) throw new Error()
        
                if(n == '#'){
                    direct++
                    direct %= 4
                }else{
                    pl[y][x - 1] = 'X'
        
                    if(l[y][x - 1]){
                        cb(true)
                        break
                    }else{
                        l[y][x] = true
                        x--
                    }
                }
            }
        }catch{
            cb(false)
            break
        }
    }
}

run(() => {})

p = []

pl.forEach((l, y) => l.forEach((v, x) => {
    if(v == 'X'){
        if(y != sy || x != sx){
            p.push([y, x])
        }
    }
}))

u = u.map((l) => l.map((v) => false))
d = d.map((l) => l.map((v) => false))
l = l.map((l) => l.map((v) => false))
r = r.map((l) => l.map((v) => false))
pl = JSON.parse(JSON.stringify(ps[ps.length - 1]))
pl[sy][sx] = 'X'
u[sy][sx] = true
x = sx
y = sy
direct = 0

flag = 0
let cx, cy
found = false
for(let i = 0; i < p.length; i++){
    [cy, cx] = p[i]
    pl[cy][cx] = '#'
    run((f) => {
        if(f){
            flag++
        }
    })

    u = u.map((l) => l.map((v) => false))
    d = d.map((l) => l.map((v) => false))
    l = l.map((l) => l.map((v) => false))
    r = r.map((l) => l.map((v) => false))
    pl = JSON.parse(JSON.stringify(ps[ps.length - 1]))
    pl[sy][sx] = 'X'
    u[sy][sx] = true
    x = sx
    y = sy
    direct = 0
}

console.log(flag)
