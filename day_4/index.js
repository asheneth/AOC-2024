let FS = require('fs');

let input = FS.readFileSync(__dirname + '/input.txt').toString()
    .split('\r\n')
    .map((line) => {
        return line.split('')
            // .split(' ')
            // .map((v) => parseInt(v))
    })


// let key = input[0];
// input = input.slice(1);

let flag = 0

//LOGIC
for(let i = 0; i < input.length; i++){
    // if(i % 2 != 0) return;

    let l = input[i]

    for(let j = 0; j < l.length; j++){
        // if(j % 2 != 0) return;

        try{
            if(input[i][j] == 'A'){
                if((input[i + 1][j + 1] == 'M' && input[i - 1][j - 1] == 'S') || (input[i + 1][j + 1] == 'S' && input[i - 1][j - 1] == 'M')){
                    if((input[i + 1][j - 1] == 'M' && input[i - 1][j + 1] == 'S') || (input[i + 1][j - 1] == 'S' && input[i - 1][j + 1] == 'M')){
                        flag++
                    }
                }
            }
        }catch(err){}
            
    }
}


console.log(flag)
