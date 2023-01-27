const readline = require('readline');
const fs = require('fs');
const path = require('path');
const hiddenNumber = Math.floor(Math.random() * 100) + 1;

const rl = readline.createInterface(process.stdin, process.stdout);
const pathFile = path.join(__dirname, 'log');



function compare (numUser, numHidden) {
    if (numUser > numHidden) {
        return 'меньше';
    } else if (numUser < numHidden) {
        return 'больше';
    }
}
fs.writeFile(pathFile, '', err => {
    if (err) {
        throw err
    }
});

let appFile = function (path, logFile) {
    fs.appendFile(path, logFile, err => {
        if (err) {
            throw err;
        }
    })
}

console.log(hiddenNumber);

let logFile = 'Игра началась!!!\n';
appFile(pathFile, logFile);

let counter = 0;
function question() {

    rl.question('Enter number: ', (inputUser) => {
        logFile = `${inputUser}\n`
        appFile(pathFile, logFile);
        if (inputUser === 'q') {
            rl.close();
            return
        }

        if (+inputUser === hiddenNumber) {
            counter++;
            console.log(`Вы угадали число! Попыток: ${counter}`);
            logFile = `Вы угадали число! Попыток: ${counter}`;
            appFile(pathFile, logFile);
            rl.close();
            return
        }

        if ((inputUser < 101 && inputUser > 0 && !isNaN(+inputUser))) {
            counter++;
            logFile = `Загаданное число ${compare(inputUser, hiddenNumber)}. Попытка: ${counter + 1}\n`;
            appFile(pathFile, logFile);
            console.log(`Неверно! Загаданное число ${compare(inputUser, hiddenNumber)}. Попытка: ${counter + 1}`)
            question();
            return
        } else {
            console.log('Недопустимый ввод');
            rl.close();
            return;
        }

        counter++;
        question();
    })
}

question();




