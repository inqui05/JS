'use strict';

let startButton = document.querySelector('#start'),
    plusIncomeButton = document.getElementsByTagName('button')[0],
    plusExpensesButton = document.getElementsByTagName('button')[1],
    depositSpan = document.querySelector('#deposit-check'),
    addIncomeInput = document.querySelectorAll('.additional_income-item'),
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
    expensesTitleInput = document.querySelectorAll('.expenses-title'),
    incomeAmountInput = document.querySelectorAll('.income-amount'),
    incomeTitleInput = document.querySelectorAll('.income-title'),
    salaryInput = document.querySelector('.salary-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.title.period-amount'),
    expensesAmountInput = document.querySelectorAll('.expenses-amount');

let appData = {
    budget: 0,
    budgetDay: 0, 
    budgetMonth: 0,
    expensesMonth: 0,
    addExpenses: [],
    addIncome: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    incomes: {},
    incomeMonth: 0,
    expenses: {},
    start: function(){
        appData.budget = +salaryInput.value;

        appData.getExpenses();
        appData.getIncomes();
        appData.getExpensesMonth();
        appData.getIncomesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult: function(){
        budgetMonthInput.value = appData.budgetMonth;
        budgetDayTotalInput.value = appData.budgetDay;
        expensesMonthTotalInput.value = appData.expensesMonth;
        addExpensesTotalInput.value = appData.addExpenses.join(', ');
        addIncomeTotalInput.value = appData.addIncome.join(', ');
        targetMonthTotalInput.value = appData.getTargetMonth();
        incomePeriodTotalInput.value = appData.calcSavedMoney();

        periodInput.addEventListener('input', function(){
            incomePeriodTotalInput.value = appData.calcSavedMoney();
        });
    },
    addExpensiveBlok: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpensesButton);
        expensesItems = document.querySelectorAll('.expenses-items');

        expensesAmountInput = document.querySelectorAll('.expenses-amount');
        expensesAmountInput[expensesAmountInput.length - 1].addEventListener('input', function(){
            this.value = this.value.replace(/\D/g, "");
        });

        expensesTitleInput = document.querySelectorAll('.expenses-title');
        expensesTitleInput[expensesTitleInput.length - 1].addEventListener('input', function(){
            this.value = this.value.replace(/\w/g, "");
        });

        if (expensesItems.length === 3){
            plusExpensesButton.style.display = 'none';
        }
    },
    addIncomeBlok: function(){
        let cloneIncomesItem = incomeItems[0].cloneNode(true);
        cloneIncomesItem.querySelector('.income-title').value = '';
        cloneIncomesItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomesItem, plusIncomeButton);
        incomeItems = document.querySelectorAll('.income-items');
        
        incomeAmountInput = document.querySelectorAll('.income-amount');
        incomeAmountInput[incomeAmountInput.length - 1].addEventListener('input', function(){
            this.value = this.value.replace(/\D/g, "");
        });

        //Александр, у меня тут затык получился. Уже тысячу логов вывел. Например, длина 3, но когда ставишь incomeAmountInput.length - 1, выводит первый, а не 2
        incomeTitleInput = document.querySelectorAll('.income-title');
        incomeTitleInput[incomeAmountInput.length].addEventListener('input', function(){
            this.value = this.value.replace(/\w/g, "");
        });

        if (incomeItems.length === 3){
            plusIncomeButton.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncomes: function(){
        incomeItems.forEach(function(item){
            let itemIncomes = item.querySelector('.income-title').value;
            let cashIncomes = item.querySelector('.income-amount').value;
            if (itemIncomes !== '' && cashIncomes !== ''){
                appData.incomes[itemIncomes] = cashIncomes;
            }
        });
        
        for (let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function(){
        let addExpenses = addExpensesInput.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        addIncomeInput.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = parseInt(appData.budgetMonth / 30);
        return;
    },
    getTargetMonth: function(){
        if (targetAmountInput.value <=0){
            return 'Цель не будет достигнута';
        } else {
            return Math.ceil( targetAmountInput.value / appData.budgetMonth );
        }
    },
    /*getStatusIncome: function(){
        if (appData.budgetDay >= 1200){
            return( 'У вас высокий уровень дохода' );
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200){
            return( 'У вас средний уровень дохода' );
        } else if (appData.budgetDay >= 0 && appData.budgetDay <600){
            return( 'К сожалению, у вас уровень дохода ниже среднего' );
        } else {
            return( 'Что то пошло не так' );
        }
    },*/
    getExpensesMonth: function(){
        for (let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getIncomesMonth: function(){
        for (let key in appData.incomes){
            appData.incomeMonth += +appData.incomes[key];
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
        return appData.budgetMonth * periodInput.value;
    }
};

salaryInput.addEventListener('input', function(){
    this.value = this.value.replace(/\D/g, "");
});

incomeAmountInput[0].addEventListener('input', function(){
    this.value = this.value.replace(/\D/g, "");
});

expensesAmountInput[0].addEventListener('input', function(){
    this.value = this.value.replace(/\D/g, "");
});

targetAmountInput.addEventListener('input', function(){
    this.value = this.value.replace(/\D/g, "");
});

addExpensesInput.addEventListener('input', function(){
    this.value = this.value.replace(/\w/g, "");
});

for (let i = 0; i < addIncomeInput.length; i++){
    addIncomeInput[i].addEventListener('input', function(){
        this.value = this.value.replace(/\w/g, "");
    });
}

incomeTitleInput[1].addEventListener('input', function(){
    this.value = this.value.replace(/\w/g, "");
});

expensesTitleInput[1].addEventListener('input', function(){
    this.value = this.value.replace(/\w/g, "");
});

startButton.addEventListener('click', function(){
    if(salaryInput.value === ''){
        alert("Введите месячный доход и только потом приступайте к расчету!");
    } else {
    appData.start();
    }
});

plusExpensesButton.addEventListener('click', appData.addExpensiveBlok);
plusIncomeButton.addEventListener('click', appData.addIncomeBlok);
periodInput.addEventListener('input', function(){
    periodAmount.innerHTML = periodInput.value;
});

function isMoney(anyData){
    return !isNaN(parseFloat(anyData)) && isFinite(anyData);
}

/*function isString(anyData){
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
}*/

/*console.log( 'Суммарные месячные расходы ' + appData.expensesMonth);
console.log( appData.getTargetMonth());
console.log( 'Уровень дохода: ' + appData.getStatusIncome() );
console.log(printTheString(appData.addExpenses));

//этот цикл можно взять в комментарий, чтобы не выводил в консоль кучу хлама
for (let key in appData){
    console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
}*/