'use strict';

let startButton = document.querySelector('#start'),
    plusIncomeButton = document.getElementsByTagName('button')[0],
    plusExpensesButton = document.getElementsByTagName('button')[1],
    depositSpan = document.querySelector('#deposit-check'),
    addIncomeInput1 = document.querySelectorAll('.additional_income-item')[0],
    addIncomeInput2 = document.querySelectorAll('.additional_income-item')[1],
    budgetDayTotalInput = document.getElementsByClassName('result-total budget_day-value')[0],
    expensesMonthTotalInput = document.getElementsByClassName('result-total expenses_month-value')[0],
    addIncomeTotalInput = document.getElementsByClassName('result-total additional_income-value')[0],
    addExpensesTotalInput = document.getElementsByClassName('result-total additional_expenses-value')[0],
    incomePeriodTotalInput = document.getElementsByClassName('result-total income_period-value')[0],
    targetMonthTotalInput = document.getElementsByClassName('result-total target_month-value')[0],
    budgetMonthInput = document.querySelector('.result-total.budget_month-value'),
    periodInput = document.querySelector('.period-select'),
    targetAmountInput = document.querySelector('.target-amount'),
    addExpensesInput = document.querySelector('.additional_expenses-item'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    expensesTitleInput = document.querySelectorAll('.expenses-title')[1],
    incomeAmountInput = document.querySelector('.income-amount'),
    incomeTitleInput = document.querySelectorAll('.income-title')[1],
    salaryInput = document.querySelector('.salary-amount');

let appData = {
    budget: 0,
    budgetDay: 0, 
    budgetMonth: 0,
    expensesMonth: 0,
    addExpenses: 0,
    mission: 100000,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    period: 3,
    income: {},
    expenses: {},
    start: function(){
        if(appData.budget === ''){
            alert("Введите месячный доход!");
            return;
        }
        appData.budget = salaryInput.value;

        appData.getExpenses();

        //appData.asking();
        //appData.getExpensesMonth();
        //appData.getBudget();
        //appData.getTargetMonth();
        //appData.getStatusIncome();
        //appData.getInfoDeposit();
    },
    addExpensiveBlok: function(){
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpensesButton);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3){
            plusExpensesButton.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('expenses-title').value;
            let cashExpenses = item.querySelector('expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
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

            if(confirm('Есть ли у вас дополнительный источник заработка?')){
                do{
                    temporary1 = prompt('Какой у вас дополнительный заработок?', 'Граблю');
                } while ( !isString( temporary1 ) );
                
                do{
                temporary2 = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
                } while ( !isMoney( temporary2 ) );
        
                appData.income[temporary1] = temporary2;
            }
        
        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ''),
        appData.addExpenses = appData.addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm( 'Есть ли у вас депозит в банке?' );

        for ( let i = 0; i < 2; i++ ){
            do{
                temporary1 =  prompt( 'Введите обязательную статью расходов?' );

            } while ( !isString( temporary1 ) );
            
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
    },
    getInfoDeposit: function(){
        if (appData.deposit){
            do{
                appData.percentDeposit = prompt('Какой годовой процент?', '10');

            } while ( !isMoney( appData.percentDeposit ) );
            do{
                appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');

            } while ( !isMoney( appData.moneyDeposit ) );
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

startButton.addEventListener('click', appData.start);
plusExpensesButton.addEventListener('click', appData.addExpensiveBlok);


function isMoney( anyData ){
    return !isNaN( parseFloat( anyData )) && isFinite( anyData );
}

function isString(anyData){
    return isNaN(anyData) && !isFinite( anyData );
}

function printTheString(arr){
    let finalString = fixTheFirstLetter(arr[0]);  

    for (let i = 1; i < arr.length; i++){
        if (i < arr.length){
            finalString += ', ';        
        }
        
        finalString += fixTheFirstLetter(arr[i]);
    }

    function fixTheFirstLetter(str) {
        if (!str) {
            return str;
        }
        return str[0].toUpperCase() + str.slice(1);
    }
    return finalString;
}

/*console.log( 'Суммарные месячные расходы ' + appData.expensesMonth);
console.log( appData.getTargetMonth());
console.log( 'Уровень дохода: ' + appData.getStatusIncome() );
console.log(printTheString(appData.addExpenses));

//этот цикл можно взять в комментарий, чтобы не выводил в консоль кучу хлама
for (let key in appData){
    console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
}*/