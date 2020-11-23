let money = +prompt( 'Ваш месячный доход?', '0' );
let income = '700';
let addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую', '' );
let deposit = confirm( 'Есть ли у вас депозит в банке?' );
let mission = 100000;
let period = 10;
let expenses1 = prompt( 'Введите обязательную статью расходов?', 'Коммунальные платежи' );
let cost1 = +prompt( 'Во сколько это обойдется?', '100');
let expenses2 = prompt( 'Введите обязательную статью расходов?', 'Еда' );
let cost2 = +prompt( 'Во сколько это обойдется?', '300');
let budgetDay = money / 30;

let budgetMonth = money - cost1 + cost2;
budgetDay = budgetMonth / 30;

console.log( typeof money );
console.log( typeof income );
console.log( typeof deposit );

console.log( addExpenses.length );

console.log( `Период равен ${period} месяцев` );
console.log( `Цель заработать ${mission} рублей` );

addExpenses = addExpenses.toLowerCase();

console.log( addExpenses.split(', '));

console.log( 'Бюджет на месяц ' + budgetMonth );
console.log( `Чтобы собрать необходимую сумму вам потребуется ${Math.ceil( mission / budgetMonth)} месяца(ев)`);
console.log( 'Дневной бюджет - '+ Math.floor(budgetDay));

if (budgetDay >= 1200){
    console.log( 'У вас высокий уровень дохода' );
} else if (budgetDay >= 600 && budgetDay < 1200){
    console.log( 'У вас средний уровень дохода' );
} else if (budgetDay >= 0 && budgetDay <600){
    console.log( 'К сожалению, у вас уровень дохода ниже среднего' );
} else {
    console.log( 'Что то пошло не так' );
}