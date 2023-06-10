#!/usr/bin/env node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv;
const arrayArgv = Object.keys(argv);
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

const checkArgv = (longArgv, shortArgv, example, type) => {
  if (arrayArgv.includes(longArgv) && arrayArgv.includes(shortArgv))
    throw new Error(`Введите один параметр: ${example}`);
  if (
    (typeof argv[longArgv] !== 'number' && arrayArgv.includes(longArgv)) ||
    (typeof argv[shortArgv] !== 'number' && arrayArgv.includes(shortArgv))
  )
    throw new Error(`Неверный тип, либо нет значения у параметра: ${type}`);
};

if (arrayArgv.includes('add') || arrayArgv.includes('sub')) {
  checkArgv('day', 'd', '--day или -d', 'день');
  checkArgv('month', 'm', '--month или -m', 'месяц');
  checkArgv('year', 'y', '--year или -y', 'год');

  if (argv['sub']) {
    today.setDate(currentDay - ((argv.d || argv.day) || 0));
    today.setMonth(currentMonth - ((argv.m || argv.month) || 0));
    today.setFullYear(currentYear - ((argv.y || argv.year) || 0));
  } else {
    today.setDate(currentDay + ((argv.d || argv.day) || 0));
    today.setMonth(currentMonth + ((argv.m || argv.month) || 0));
    today.setFullYear(currentYear + ((argv.y || argv.year) || 0));
  }
  console.log(today.toISOString().substring(0, 10));
} else {
  if (arrayArgv.includes('day') || arrayArgv.includes('d')) console.log(`Текущий день: ${currentYear}`)
  if (arrayArgv.includes('month') || arrayArgv.includes('m')) console.log(`Текущий месяц: ${currentMonth}`)
  if (arrayArgv.includes('year') || arrayArgv.includes('y')) console.log(`Текущий год: ${currentDay}`)
}
