const readline = require('readline');
const fs = require('fs');
const path = require('path');
const hiddenNumber = Math.floor(Math.random() * 100) + 1;

const rl = readline.createInterface(process.stdin, process.stdout);
const pathFile = path.join(__dirname, 'log');

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
            logFile = `\nВы угадали число!!! Количество попыток: ${counter}.`;
            rl.close();
            appFile(pathFile, logFile)
            console.log(`\nВы угадали число!!! Количество попыток: ${counter}.`);
        } else if (+userInput > hiddenNumber && 0 < +userInput < 101){
            logFile = `\nНеверно! Загаданное число меньше! Попытка номер ${counter}`;
            counter++;
            rl.setPrompt(`Неверно! Загаданное число меньше! Попытка номер ${counter}: `);
            rl.prompt();
            appFile(pathFile, logFile);
            rl.on('line', (userInput) => {
                appFile(pathFile, `\n${userInput}`);
                if (+userInput === hiddenNumber) {
                    logFile = `\nВы угадали число!!! Количество попыток: ${counter}.`;
                    appFile(pathFile, logFile);
                    rl.close();
                    console.log(`Вы угадали число!!! Количество попыток: ${counter}.`);
                } else if (+userInput < hiddenNumber && 0 < +userInput < 101) {
                    counter++;
                    rl.setPrompt(`Неверно! Загаданное число больше! Попытка номер ${counter} `);
                    rl.prompt();
                    logFile = `\nНеверно! Загаданное число больше! Попытка номер ${counter}`;
                    appFile(pathFile, logFile);
                } else if (+userInput > hiddenNumber && 0 < +userInput < 101) {
                    counter++;
                    rl.setPrompt(`Неверно! Загаданное число меньше! Попытка номер ${counter}: `);
                    rl.prompt();
                    logFile = `\nНеверно! Загаданное число меньше! Попытка номер ${counter}`;
                    appFile(pathFile, logFile);
                } else {
                    logFile = '\nНеверный ввод!!!';
                    appFile(pathFile, logFile);
                    console.log('Неверный ввод!!!');
                    rl.close();
                }
            })
        } else if (+userInput < hiddenNumber && 0 < +userInput < 101){
            counter++;
            rl.setPrompt(`Неверно! Загаданное число больше! Попытка номер ${counter} `);
            rl.prompt();
            logFile = `\nНеверно! Загаданное число больше! Попытка номер ${counter}`;
            appFile(pathFile, logFile);
            rl.on('line', (userInput) => {
                appFile(pathFile, `\n${userInput}`);
                if (+userInput === hiddenNumber) {
                    logFile = `\nВы угадали число!!! Количество попыток: ${counter}.`;
                    appFile(pathFile, logFile);
                    rl.close();
                    console.log(`Вы угадали число!!! Количество попыток: ${counter}.`);
                } else if (+userInput > hiddenNumber && +userInput <= 100) {
                    counter++;
                    rl.setPrompt(`Неверно! Загаданное число меньше! Попытка номер ${counter}: `);
                    rl.prompt();
                    logFile = `\nНеверно! Загаданное число меньше! Попытка номер ${counter}`;
                    appFile(pathFile, logFile);
                } else if (+userInput < hiddenNumber && +userInput <= 100){
                    counter++;
                    rl.setPrompt(`Неверно! Загаданное число больше! Попытка номер ${counter} `);
                    rl.prompt();
                    logFile = `\nНеверно! Загаданное число больше! Попытка номер ${counter}`;
                    appFile(pathFile, logFile);
                } else {
                    logFile = '\nНедопустимый ввод!!!'
                    appFile(pathFile, logFile);
                    console.log('Недопустимый ввод!');
                    rl.close();
                }
            })
        } else {
            logFile = '\nНеверный ввод!!!'
            appFile(pathFile, logFile);
            console.log('Неверный ввод!!!');
            rl.close();
        }
    })





