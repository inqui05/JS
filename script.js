'use strict';
//я бы мог удалить данные в prompt'ах, но так быстрее проверяется :)
let money;
start();

let income = '700',
    addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую', '' ),
    deposit = confirm( 'Есть ли у вас депозит в банке?' ),
    mission = 100000,
    period = 10,
    expense = [];

let expensesAmount = getExpensesMonth();
let accumulatedMonth = getAccumulatedMonth( money, expensesAmount);
let budgetDay = accumulatedMonth / 30;

function isMoney( anyData ){
    return !isNaN( parseFloat( anyData )) && isFinite( anyData );
}

function start(){
    do{
    money  = +prompt( 'Ваш месячный доход?', '50000' );
    } while ( !isMoney( money ) );
}

function getExpensesMonth(){
    let sum = 0,
        temporaryValue;
    for ( let i = 0; i < 4; i++ ){
        expense[i] =  prompt( 'Введите обязательную статью расходов?', 'Коммунальные платежи' );
    
        do{
            temporaryValue = +prompt( 'Во сколько это обойдется?', '3000' );
        } while ( !isMoney( temporaryValue ) );
        sum += temporaryValue;
    }
    return sum;
}

function getAccumulatedMonth( income, expenses ){
    return income - expenses;
}

function getTargetMonth( target, savedMoney ){
    if (savedMoney <=0){
        return 'Цель не будет достигнута';
    } else {
        return `Чтобы собрать потребуется ${Math.ceil( target / savedMoney )} месяца(ев)`;
    }
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
console.log( 'Суммарные месячные расходы ' + expensesAmount);
console.log( addExpenses.toLowerCase().split(', '));
console.log( getTargetMonth( mission, accumulatedMonth ));
console.log( 'Дневной бюджет - '+ Math.floor(budgetDay));
console.log( 'Уровень дохода: ' + getStatusIncome(budgetDay) );