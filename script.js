let money = 1200;
let income = '700';
let addExpenses = 'taxes, football, cat, fee';
let deposit = false;
let mission = 100000;
let period = 10;

console.log( typeof money );
console.log( typeof income );
console.log( typeof deposit );

console.log( addExpenses.length );

console.log( `Период равен ${period} месяцев` );
console.log( `Цель заработать ${mission} рублей` );

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log( budgetDay );