let FS = require('fs');

let ps = FS.readFileSync(__dirname + '/input.txt').toString()
    .split('\r\n\r\n')
    .map((b) => {
        return b.split('\r\n').map((l) => {
            return l
                .split(': ')[1].split(', ').map((b) => {
                    return parseInt(b.substring(2))
                })
        })
    })

o = 10000000000000

flag = ps.map((m) => {
    b1 = m[0]
    b2 = m[1]

    a = b1[0]
    b = b2[0]
    c = b1[1]
    d = b2[1]

    det = 1 / ((a * d) - (b * c))

    M = [
        [d, -b],
        [-c, a]
    ]

    a1 = Math.round((M[0][0] * (m[2][0] + o) + M[0][1] * (m[2][1] + o)) * det)
    a2 = Math.round((M[1][0] * (m[2][0] + o) + M[1][1] * (m[2][1] + o)) * det)

    found = m[2][0] + o == (a1 * b1[0]) + (a2 * b2[0]) && m[2][1] + o == (a1 * b1[1]) + (a2 * b2[1])
    
    if(found){
        return 3 * a1 + a2
    }else{
        return 0
    }
}).reduce((x, y) => {
    return x + y
})

console.log(flag)
