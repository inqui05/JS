'use strict';

let money;
start();

let income = '700',
    mission = 100000,
    period = 10,
    expenses = [];

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    addExpenses: 0,
    expenses: {},
    getAccumulatedMonth: function( income, expenses ){
        return income - expenses;
    },
    getTargetMonth: function( target, savedMoney ){
        if (savedMoney <=0){
            return 'Цель не будет достигнута';
        } else {
            return `Чтобы собрать потребуется ${Math.ceil( target / savedMoney )} месяца(ев)`;
        }
    },
    getStatusIncome: function(budgetDay){
        if (budgetDay >= 1200){
            return( 'У вас высокий уровень дохода' );
        } else if (budgetDay >= 600 && budgetDay < 1200){
            return( 'У вас средний уровень дохода' );
        } else if (budgetDay >= 0 && budgetDay <600){
            return( 'К сожалению, у вас уровень дохода ниже среднего' );
        } else {
            return( 'Что то пошло не так' );
        }
    },
    asking: function(){
        let temporary1,
            temporary2;
        
        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ''),
        appData.addExpenses = appData.addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm( 'Есть ли у вас депозит в банке?' );

        for ( let i = 0; i < 2; i++ ){
            temporary1 =  prompt( 'Введите обязательную статью расходов?' );

            do{
                temporary2 = prompt( 'Во сколько это обойдется?' );

            } while ( !isMoney( temporary2 ) );500
            
            expenses[temporary1] = temporary2;
        }
    },
    getExpensesMonth: function(){
        for (let key in expenses){
            appData.expensesMonth += +expenses[key];
        }
    }
};

appData.asking();
appData.getExpensesMonth();

let expensesAmount = appData.expensesMonth;
let accumulatedMonth = appData.getAccumulatedMonth( money, expensesAmount);
appData.budgetDay = accumulatedMonth / 30;

function isMoney( anyData ){
    return !isNaN( parseFloat( anyData )) && isFinite( anyData );
}

function start(){
    do{
    money  = prompt( 'Ваш месячный доход?' );
    } while ( !isMoney( money ) );
}

console.log( 'Суммарные месячные расходы ' + appData.expensesMonth);
console.log( appData.addExpenses);
console.log( appData.getTargetMonth( mission, accumulatedMonth ));
console.log( 'Дневной бюджет - '+ Math.floor(appData.budgetDay));
console.log( 'Уровень дохода: ' + appData.getStatusIncome(appData.budgetDay) );