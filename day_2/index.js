let FS = require('fs');

let input = FS.readFileSync(__dirname + '/input.txt').toString()
    .split('\r\n')
    .map((line) => {
        return line
            .split(' ')
            .map((v) => parseInt(v))
    })


// let key = input[0];
// input = input.slice(1);

let flag = null

//LOGIC
// input.forEach((l, i) => {
//     // if(i % 2 != 0) return;

//     if(Array.isArray(l)) l.forEach((p, j) => {
//         // if(i % 2 != 0) return;
//     })
// })

flag = input.filter((l, i) => {
    let op = [0, null, l[0]]
    l.forEach((v, i) => {
        if(i == 0) return

        if(op[0] == 1) return

        if(Math.abs(v - op[2]) >= 1 && Math.abs(v - op[2]) <= 3 && (op[1] == null || (op[2] < v ? 1 : -1) == op[1])){
            op= [0, (op[2] < v ? 1 : -1), v]
            return
        }

        op = [1, i]
    })

    p = op

    if(op[0] == 1){
        for(let i = 0; i < l.length; i++){
            tl = JSON.parse(JSON.stringify(l))
        
            tl.splice(i, 1)
            

            p = [0, null, tl[0]]

            tl.forEach((v, i) => {
                if(i == 0) return
    
                if(p[0] == 1) return
    
                if(Math.abs(v - p[2]) >= 1 && Math.abs(v - p[2]) <= 3 && (p[1] == null || (p[2] < v ? 1 : -1) == p[1])){
                    p= [0, (p[2] < v ? 1 : -1), v]
                    return
                }
    
    
                p = [1, i]
            })

            if(p[0] == 0) break
        }
    }
    
    return p[0] == 0
}).map((v) => (v ? 1 : 0)).reduce((i, v) => i+ v)


console.log(flag)
