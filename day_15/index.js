let FS = require('fs');

let ps = FS.readFileSync(__dirname + '/input.txt').toString()
    .split('\r\n\r\n')
    .map((b) => {
        return b.split('\r\n').map((l) => {
            return l
                .split('')
        })
    })


// let key = input[0];
// input = input.slice(1);

// let pl = ps[ps.length - 1]

let p1 = ps[0]

let p = null

p1.forEach((l, i) => {
    l.forEach((c, j) => {
        if(c == '@') p = [i, j]
    })
})

p1[p[0]][p[1]] = '.'

p[1] *= 2

p1 = p1.map((l) => {
    let n = []

    l.forEach((c) => {
        if(c == 'O'){
            n.push('[', ']')
        }else{
            n.push(c, c)
        }
    })

    return n
})

let p2 = ps[1]

let flag = 0

//LOGIC
p2.forEach((l) => {
    l.forEach((c) => {
        switch(c){
            case '^':
                tp = []
                f = [p[1]]
                i = p[0]-1
                clear = false
                blocked = false
                while(true){
                    clear = !f.some((v) => {
                        return p1[i][v] != '.'
                    })

                    blocked = f.some((v) => {
                        return p1[i][v] == '#'
                    })

                    if(clear || blocked) break

                    nf = []

                    f.forEach((v) => {
                        if(p1[i][v] == '['){
                            if(!tp.some((p) => p[0] == i && p[1] == v)) tp.push([i, v])
                            if(!tp.some((p) => p[0] == i && p[1] == v + 1)) tp.push([i, v + 1])
                            if(!nf.some((n) => n == v)) nf.push(v)
                            if(!nf.some((n) => n == v + 1)) nf.push(v + 1)
                        }else if(p1[i][v] == ']'){
                            if(!tp.some((p) => p[0] == i && p[1] == v - 1)) tp.push([i, v - 1])
                            if(!tp.some((p) => p[0] == i && p[1] == v)) tp.push([i, v])
                            if(!nf.some((n) => n == v - 1)) nf.push(v - 1)
                            if(!nf.some((n) => n == v)) nf.push(v)
                        }
                    })

                    f = nf

                    i--
                }

                if(clear){
                    tp.reverse()
                    tp.forEach((c) => {
                        p1[c[0] - 1][c[1]] = p1[c[0]][c[1]]
                        p1[c[0]][c[1]] = '.'
                    })

                    p[0]--
                }

                break
            case 'v':
                tp = []
                f = [p[1]]
                i = p[0]+1
                clear = false
                blocked = false
                while(true){
                    clear = !f.some((v) => {
                        return p1[i][v] != '.'
                    })

                    blocked = f.some((v) => {
                        return p1[i][v] == '#'
                    })

                    if(clear || blocked) break

                    nf = []

                    f.forEach((v) => {
                        if(p1[i][v] == '['){
                            if(!tp.some((p) => p[0] == i && p[1] == v)) tp.push([i, v])
                            if(!tp.some((p) => p[0] == i && p[1] == v + 1)) tp.push([i, v + 1])
                            if(!nf.some((n) => n == v)) nf.push(v)
                            if(!nf.some((n) => n == v + 1)) nf.push(v + 1)
                        }else if(p1[i][v] == ']'){
                            if(!tp.some((p) => p[0] == i && p[1] == v - 1)) tp.push([i, v - 1])
                            if(!tp.some((p) => p[0] == i && p[1] == v)) tp.push([i, v])
                            if(!nf.some((n) => n == v - 1)) nf.push(v - 1)
                            if(!nf.some((n) => n == v)) nf.push(v)
                        }
                    })

                    f = nf

                    i++
                }

                if(clear){
                    tp.reverse()
                    tp.forEach((c) => {
                        p1[c[0] + 1][c[1]] = p1[c[0]][c[1]]
                        p1[c[0]][c[1]] = '.'
                    })

                    p[0]++
                }

                break
            case '>':
                i = p[1] + 1
                while(['[', ']'].includes(p1[p[0]][i])) i++;

                if(p1[p[0]][i] == '.'){
                    while(i > p[1]){
                        p1[p[0]][i] = p1[p[0]][i - 1]

                        i--;
                    }

                    p[1]++
                }

                break

            case '<':
                i = p[1] - 1
                while(['[', ']'].includes(p1[p[0]][i])) i--;

                if(p1[p[0]][i] == '.'){
                    while(i < p[1]){
                        p1[p[0]][i] = p1[p[0]][i + 1]

                        i++;
                    }

                    p[1]--
                }

                break
        }
    })
})

flag = p1.map((l, i) => {
    return l.map((c, j) => {
        if(c == '['){
            return (i * 100) + j
        }else{
            return 0
        }
    }).reduce((x, y) => {
        return x + y
    })
}).reduce((x, y) => {
    return x + y
})

console.log(flag)
