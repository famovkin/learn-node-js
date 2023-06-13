#!/usr/bin/env node
import readline from 'readline';

const gameConfig = {
  minNumber: 0,
  maxNumber: 0,
  attempts: 1,
  hiddenNumber: 0,
};

const messages = {
  start: 'Добро пожаловать в игру "Угадай число"!\nУсловия задаешь ты!',
  getMinNumber: 'Введи минимальное число: ',
  getMaxNumber: 'Введи максимальное число: ',
  tryGuess: 'Попробуй угадать ',
  tipGreater:
    'Ты не угадал, но дам подсказку, введенное до этого число больше заданного',
  tipLess:
    'Ты не угадал, но дам подсказку, введенное до этого число меньше заданного',
};

const errors = {
  wrongType: 'Не, нужно ввести число',
  minGreaterThanMax: 'Второе число должно быть больше минимального',
  tooEasy: 'Так будет неинтересно, загадай побольше',
};

const rl = readline.createInterface(process.stdin, process.stdout);

console.log(messages.start);

const askMinNumber = (res) => {
  rl.question(messages.getMinNumber, (input) => {
    const numberInput = Number(input);
    if (input.length === 0 || Number.isNaN(numberInput)) {
      console.log(errors.wrongType);
      askMinNumber(res);
      return;
    }
    gameConfig.minNumber = Number(input);
    res();
  });
};

const askMaxNumber = (res) => {
  rl.question(messages.getMaxNumber, (input) => {
    const numberInput = Number(input);
    if (input.length === 0 || Number.isNaN(numberInput)) {
      console.log(errors.wrongType);
      askMaxNumber(res);
      return;
    }
    if (numberInput <= gameConfig.minNumber) {
      console.log(errors.minGreaterThanMax);
      askMaxNumber(res);
      return;
    }
    if (numberInput - gameConfig.minNumber < 5) {
      console.log(errors.tooEasy);
      askMaxNumber(res);
      return;
    }
    gameConfig.maxNumber = numberInput;
    showGameSettings();
    res();
  });
};

const showGameSettings = () => {
  const { minNumber: min, maxNumber: max } = gameConfig;
  console.log(
    `Хорошо, условия простые: тебе нужно угадать число, которое я загадал.\nЧисло диапазоне от ${gameConfig.minNumber} до ${gameConfig.maxNumber}.\nУ тебя будет только 3 попытки.`
  );
  gameConfig.hiddenNumber = Math.floor(Math.random() * (max - min + 1) + min);
};

const solveGame = (res) => {
  // console.log('Cheat', gameConfig.hiddenNumber);

  rl.question(messages.tryGuess, (input) => {
    const numberInput = Number(input);
    if (input.length === 0 || Number.isNaN(numberInput)) {
      console.log(errors.wrongType);
      solveGame(res);
      return;
    }
    if (numberInput === gameConfig.hiddenNumber) {
      console.log(
        `Поздравляю! Ты победил!\nЯ загадал число ${gameConfig.hiddenNumber}`
      );
      rl.close();
      res();
      return;
    }
    if (gameConfig.attempts === 3) {
      console.log(
        `Хе-хе, победа за мной!\nЯ загадал число ${gameConfig.hiddenNumber}`
      );
      rl.close();
      res();
      return;
    }

    gameConfig.hiddenNumber > numberInput
      ? console.log(messages.tipGreater)
      : console.log(messages.tipLess);
    gameConfig.attempts += 1;
    solveGame(res);
  });
};

new Promise((res) => askMinNumber(res))
  .then(() => new Promise((res) => askMaxNumber(res)))
  .then(() => new Promise((res) => solveGame(res)));
