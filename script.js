'use strict';
let money;
start();

let appData = {
    budget: money,
    budgetDay: 0, //cvb
    budgetMonth: 0, //cbv
    expensesMonth: 0,
    addExpenses: 0,
    mission: 100000,
    expenses: {},
    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = parseInt(appData.budgetMonth / 30);
        return;
    },
    getTargetMonth: function(){
        if (appData.budgetMonth <=0){
            return 'Цель не будет достигнута';
        } else {
            return `Чтобы собрать потребуется ${Math.ceil( appData.mission / appData.budgetMonth )} месяца(ев)`;
        }
    },
    getStatusIncome: function(){
        if (appData.budgetDay >= 1200){
            return( 'У вас высокий уровень дохода' );
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200){
            return( 'У вас средний уровень дохода' );
        } else if (appData.budgetDay >= 0 && appData.budgetDay <600){
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

            } while ( !isMoney( temporary2 ) );
            appData.expenses[temporary1] = temporary2;
        }
    },
    getExpensesMonth: function(){
        for (let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

function isMoney( anyData ){
    return !isNaN( parseFloat( anyData )) && isFinite( anyData );
}

function start(){
    do{
    money  = prompt( 'Ваш месячный доход?' );
    } while ( !isMoney( money ) );
}

console.log( 'Суммарные месячные расходы ' + appData.expensesMonth);
console.log( appData.getTargetMonth());
console.log( 'Уровень дохода: ' + appData.getStatusIncome() );

for (let key in appData){
    console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
}