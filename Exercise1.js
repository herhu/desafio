const readline = require('readline');
const groupBy = require('lodash/groupBy');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const teams = ['blue', 'red']
const tandemSpeeds = []

const isValid = value => isNaN(value) ? false : true

const question = (str) => new Promise(resolve => rl.question(str, resolve));

const GetTandemSpeed = async (team) => {

    let speedA = await question(`Enter speed of the ${team} rider A: `);

    if (isValid(speedA)) {
        speedB = await question(`Enter speed of the ${team} rider B: `)
        if (isValid(speedB)) {
            let tandemSpeed = Math.max(speedA, speedB)
            console.log(`the tandemSpeed of the ${team} Team is ${tandemSpeed}`)
            tandemSpeeds.push({ tandemSpeed, team })
        } else {
            console.log(`the speed B is invalid!`)
            rl.close();
        }
    } else {
        console.log(`the speed A is invalid!`)
        rl.close();
    }

}

const play = async () => {
    for (const color of teams) {
        await GetTandemSpeed(color);
    }
}
const ask = async () => await question('do you want to add velocities? n/Y \n');

const getTotalSpeed = async () => {

    //if fastest send max possible velocity otherwise max minimum velocity
    const g = groupBy(tandemSpeeds, n => n.team);
    let totalSpeed = 0

    for (const [key, value] of Object.entries(g)) {

        let max = value.map(q => q.tandemSpeed)
        let tandemSpeed = Math.max(...max)
        totalSpeed += parseInt(tandemSpeed);
        console.log(`max velocity ${key} team:  ${max}`)
    }

    console.log(`The total speed is ${totalSpeed}`)

    let fastest = await question(`active fastest mode ? n/Y \n`);

    switch (fastest) {
        case 'y':
            console.log(`The max total speed is ${totalSpeed * 2}`)
            break;
        case 'n':
            console.log(`The min total speed is ${totalSpeed}`)
            break;

        default:
            console.log(`The min total speed is ${totalSpeed}`)
            break;
    }

    rl.close();


}

const answer = async () => {
    let a = await ask()
    switch (a) {
        case 'y':
            main();
            break
        case 'n':
            getTotalSpeed()
            break
        default:
            main();
            break
    }

}

const main = async () => {
    await play()
    answer()
}

main()

