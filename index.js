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
rl.question('Угадайте число от 1 до 100: ',
    (userInput) => {
        console.log(`Ваше число ${userInput}`);
        let counter = 0;
        counter++;
        appFile(pathFile, userInput);
        if (+userInput === hiddenNumber) {
            logFile = `\nВы угадали число c первой попытки!!!`;
            rl.close();
            appFile(pathFile, logFile)
            console.log(`Вы угадали число с первой попытки`);
        } else if (userInput < 101 && userInput > 0 && !isNaN(+userInput)){
            logFile = `\nНеверно! Загаданное число ${compare(userInput, hiddenNumber)}! Попытка номер ${counter}`;
            counter++;
            rl.setPrompt(`Неверно! Загаданное число ${compare(userInput, hiddenNumber)}! Попытка номер ${counter}: `);
            rl.prompt();
            appFile(pathFile, logFile);
            rl.on('line', (userInput) => {
                appFile(pathFile, `\n${userInput}`);
                if (+userInput === hiddenNumber) {
                    logFile = `\nВы угадали число!!! Количество попыток: ${counter}.`;
                    appFile(pathFile, logFile);
                    rl.close();
                    console.log(`Вы угадали число!!! Количество попыток: ${counter}.`);
                } else if (userInput < 101 && userInput > 0 && !isNaN(+userInput)) {
                    counter++;
                    rl.setPrompt(`Неверно! Загаданное число ${compare(userInput, hiddenNumber)}! Попытка номер ${counter} `);
                    rl.prompt();
                    logFile = `\nНеверно! Загаданное число ${compare(userInput, hiddenNumber)}! Попытка номер ${counter}`;
                    appFile(pathFile, logFile);
                } else {
                    logFile = '\nНеверный ввод!!!';
                    appFile(pathFile, logFile);
                    console.log('Неверный ввод2!!!');
                    rl.close();
                }
            })
        } else {
            logFile = '\nНеверный ввод!!!'
            appFile(pathFile, logFile);
            console.log('Неверный ввод1!!!');
            rl.close();
        }
    })





