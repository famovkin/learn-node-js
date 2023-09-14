#!/usr/bin/env node
import readline from 'readline';
import fs from 'fs';

import { messages, errors } from '../constants.js';

let currGamelog = '';
let logFileName = '';

const gameConfig = {
  minNumber: 1,
  maxNumber: 2,
  hiddenNumber: 0,
};

const rl = readline.createInterface(process.stdin, process.stdout);

console.log(messages.start);

const askLogFileNameForWrite = (res) => {
  rl.question(messages.createFileName, (input) => {
    logFileName = input;
    fs.appendFile(`${input}.txt`, '', function (err) {
      if (err) throw err;
    });
    res();
  });
};

gameConfig.hiddenNumber = Math.floor(
  Math.random() * (gameConfig.maxNumber - gameConfig.minNumber + 1) +
    gameConfig.minNumber
);

const writeLogInFile = (isWin, res) => {
  currGamelog = isWin ? 'win \n' : 'lose \n';
  let writeStream = fs.createWriteStream(`${logFileName}.txt`, { flags: 'a' });
  writeStream.write(currGamelog, 'utf-8');
  writeStream.end();
  console.log(isWin ? messages.winTxt : messages.loseTxt);
  askPlayAgain(res);
  return;
};

const solveGame = (res) => {
  rl.question(messages.tryGuess, (input) => {
    const numberInput = Number(input);
    if (input.length === 0 || Number.isNaN(numberInput)) {
      console.log(errors.wrongType);
      solveGame(res);
      return;
    }

    const resultCurrGame = numberInput === gameConfig.hiddenNumber;
    writeLogInFile(resultCurrGame, res);
  });
};

const askPlayAgain = (res) => {
  rl.question(messages.retry, (input) => {
    if (input.toLowerCase() === 'n') {
      res();
      rl.close();
    } else if (input.toLowerCase() === 'y') solveGame(res);
    else askPlayAgain(res);
  });
};

new Promise((res) => askLogFileNameForWrite(res))
  .then(() => new Promise((res) => solveGame(res)));
