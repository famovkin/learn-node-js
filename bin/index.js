#!/usr/bin/env node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv;
const dayParam = argv.day || argv.d;
const monthParam = argv.month || argv.m;
const yearParam = argv.year || argv.y;
const isDefaultCallCli = Object.keys(argv).length === 2;
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();
const mathsParams = argv._;

const showDefaultFormatDate = () => console.log(today.toISOString());

const showSelectedFormatDate = () => {
  if (dayParam) console.log(`Текущий день: ${currentDay}`);
  if (monthParam) console.log(`Текущий месяц: ${currentMonth}`);
  if (yearParam) console.log(`Текущий год: ${currentYear}`);
};

const checkArgv = () => {
  const errosInArgv = [];

  if (mathsParams.includes('add') && mathsParams.includes('sub')) {
    throw new Error(`Введите один параметр: либо add, либо sub`);
  }

  if (dayParam && typeof dayParam !== 'number') errosInArgv.push('день');
  if (monthParam && typeof monthParam !== 'number') errosInArgv.push('месяц');
  if (yearParam && typeof yearParam !== 'number') errosInArgv.push('год');

  if (errosInArgv.length !== 0)
    throw new Error(
      `Неверный тип, либо нет значения у параметра: ${errosInArgv.join(', ')}`
    );
};

const changeAndShowDate = () => {
  checkArgv();
  if (mathsParams.includes('add')) {
    checkArgv();
    today.setDate(currentDay + (dayParam || 0));
    today.setMonth(currentMonth + (monthParam || 0));
    today.setFullYear(currentYear + (yearParam || 0));
  }

  if (mathsParams.includes('sub')) {
    checkArgv();
    today.setDate(currentDay - (dayParam || 0));
    today.setMonth(currentMonth - (monthParam || 0));
    today.setFullYear(currentYear - (yearParam || 0));
  }
  console.log('Измененная дата:', today.toISOString().substring(0, 10));
};

isDefaultCallCli
  ? showDefaultFormatDate()
  : mathsParams.length
    ? changeAndShowDate()
    : showSelectedFormatDate();
