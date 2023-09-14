import fs from 'fs';
import readline from 'readline';
import { messages } from '../constants.js';

const rl = readline.createInterface(process.stdin, process.stdout);
let results = [];

const getWins = (gameStat) =>
  gameStat.filter((gameRes) => gameRes === 'win').length;
const getLoses = (gameStat) => gameStat.length - getWins(gameStat);
const getWinRate = (gameStat) => (getWins(gameStat) / gameStat.length) * 100;

const askLogFileNameForRead = (res) => {
  rl.question(messages.readFileName, (input) => {
    let readStream = fs.createReadStream(`${input}.txt`, {
      encoding: 'utf-8',
    });

    readStream.on('data', (chunk) => {
      results = [...results, ...chunk.split(' \n')];
      console.log('Победы:', getWins(results));
      console.log('Поражения:', getLoses(results));
      console.log('Процент побед:', `${getWinRate(results).toFixed(2)}%`);
      rl.close();
    });

    readStream.on('error', (error) => {
      console.log(`Ошибка при чтении файла: ${error.message}`);
      rl.close();
    });
    res();
  });
};

new Promise((res) => askLogFileNameForRead(res));
