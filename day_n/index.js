let FS = require('fs');

let input = FS.readFileSync(__dirname + '/input.txt').toString()
    .split('\r\n')
    .map((line) => {
        return line
            // .split(' ')
    })


// let key = input[0];
// input = input.slice(1);

let flag = null

//LOGIC
input.forEach((l, i) => {
    // if(i % 2 != 0) return;

    l.forEach((p, j) => {
        // if(i % 2 != 0) return;
    })
})


console.log(flag)
