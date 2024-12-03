let FS = require('fs');

let input = FS.readFileSync(__dirname + '/input.txt').toString()
    .split('\r\n')
    .map((line) => {
        return line
            // .split(' ')
            // .map((v) => parseInt(v))
    })


// let key = input[0];
// input = input.slice(1);

let flag = null

//LOGIC
for(let i = 0; i < input.length; i++){
    // if(i % 2 != 0) return;

    let l = input[i]

    for(let j = 0; j < l.length; j++){
        // if(j % 2 != 0) return;
    }
}


console.log(flag)
