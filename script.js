'use strict'
let money = +prompt( 'Ваш месячный доход?', '0' ),
    income = '700',
    addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую', '' ),
    deposit = confirm( 'Есть ли у вас депозит в банке?' ),
    mission = 100000,
    period = 10,
    expenses1 = prompt( 'Введите обязательную статью расходов?', 'Коммунальные платежи' ),
    cost1 = +prompt( 'Во сколько это обойдется?', '100'),
    expenses2 = prompt( 'Введите обязательную статью расходов?', 'Еда' ),
    cost2 = +prompt( 'Во сколько это обойдется?', '300');

let accumulatedMonth = getAccumulatedMonth( money, getExpensesMonth( cost1, cost2 ));
let budgetDay = accumulatedMonth / 30;

function getExpensesMonth( data1, data2 ){
    return data1 + data2;
}

function getAccumulatedMonth( income, expenses ){
    return income - expenses;
}

function getTargetMonth( target, savedMoney ){
    return target / savedMoney;
}

function showTypeOf(data){
   return typeof data;
}

function getStatusIncome(budgetDay){
    if (budgetDay >= 1200){
        return( 'У вас высокий уровень дохода' );
    } else if (budgetDay >= 600 && budgetDay < 1200){
        return( 'У вас средний уровень дохода' );
    } else if (budgetDay >= 0 && budgetDay <600){
        return( 'К сожалению, у вас уровень дохода ниже среднего' );
    } else {
        return( 'Что то пошло не так' );
    }
}

console.log( showTypeOf( money ));
console.log( showTypeOf( income ));
console.log( showTypeOf( deposit ));
console.log( 'Суммарные месячные расходы ' + getExpensesMonth( cost1, cost2 ));
console.log( addExpenses.toLowerCase().split(', '));
console.log( `Чтобы собрать необходимую сумму вам потребуется ${Math.ceil( getTargetMonth( mission, accumulatedMonth ))} месяца(ев)`);
console.log( 'Дневной бюджет - '+ Math.floor(budgetDay));
console.log( 'Уровень дохода: ' + getStatusIncome(budgetDay) );