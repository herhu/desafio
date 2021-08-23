const readline = require('readline');
const groupBy = require('lodash/groupBy');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const denom = []

const isValid = value => isNaN(value) ? false : true

const question = (str) => new Promise(resolve => rl.question(str, resolve));

const ask = async () => await question('do you want to add denomination? n/Y \n');

getSmallerCoin = async () => {
    let coin = await question(`Enter coin: `);
    if (isValid(coin)) {
        let l = []
        denom.forEach(den => {
            if (den >= coin) {
                let left = den - coin
                if (left => 0) {
                    l.push(left)
                } else {
                    l.push(-1)
                }
            } else {
                l.push(-1)
            }
        });

        console.log('Necessary coin to make the change: ', l[0])
    } else {
        console.log(`the value is invalid!`)
        rl.close();
    }
}

const main = async () => {
    let cd = await question(`Enter coin denomination: `);

    if (isValid(cd)) {
        denom.push(parseInt(cd))
        let answer = await ask()
        switch (answer) {
            case 'y':
                main()
                break;
            case 'n':
                getSmallerCoin()
                break;

            default:
                main()
                break;
        }
    } else {
        console.log(`the value is invalid!`)
        rl.close();
    }

}

main()