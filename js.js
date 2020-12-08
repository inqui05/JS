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
        this.budget = +salaryInput.value;

        this.getExpenses();
        this.getIncomes();
        this.getExpensesMonth();
        this.getIncomesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();
        this.disableInput();
        
    },
    reset: function(){
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.addExpenses = [];
        this.addIncome = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.incomes = {};
        this.incomeMonth = 0;
        this.expenses = {};

        this.enableInput();
        this.resetInputs();

        //startButton.removeEventListener('click', pressStart);
    },
    resetInputs: function(){
        salaryInput.value = '';
        incomeItems.forEach(function(item, i){
            if (i !== 0){
                incomeItems[i].remove();
            }
        });
        document.querySelectorAll('.income-title')[1].value = '';
        document.querySelector('.income-amount').value = '';
        incomeItems = document.querySelectorAll('.income-items');
        addIncomeInput.forEach(function(item){
            item.value = '';
        });
        expensesItems.forEach(function(item, i){
            if (i !== 0){
                expensesItems[i].remove();
            }
        });
        document.querySelectorAll('.expenses-title')[1].value = '';
        document.querySelector('.expenses-amount').value = '';
        incomeItems = document.querySelectorAll('.income-items');
        addExpensesInput.value = '';
        targetAmountInput.value = '';
        periodInput.value = 1;
        periodAmount.innerHTML = periodInput.value;

        budgetDayTotalInput.value = '';
        expensesMonthTotalInput.value = '';
        addIncomeTotalInput.value = '';
        addExpensesTotalInput.value = '';
        incomePeriodTotalInput.value = '';
        targetMonthTotalInput.value = '';
        budgetMonthInput.value = '';
    },
    disableInput: function(){
        salaryInput.setAttribute('readonly', true);
        incomeTitleInput.forEach(function(elem){
            elem.setAttribute('readonly', true);
        });
        incomeAmountInput.forEach(function(elem){
            elem.setAttribute('readonly', true);
        });
        addIncomeInput.forEach(function(elem){
            elem.setAttribute('readonly', true);
        });
        expensesTitleInput.forEach(function(elem){
            elem.setAttribute('readonly', true);
        });
        expensesAmountInput.forEach(function(elem){
            elem.setAttribute('readonly', true);
        });
        addExpensesInput.setAttribute('readonly', true);
        targetAmountInput.setAttribute('readonly', true);
        periodInput.setAttribute('readonly', true);

        document.querySelector('.deposit-label').style.display = 'none';
        plusIncomeButton.style.display = 'none';
        plusExpensesButton.style.display = 'none';

        startButton.style.display = 'none';
        document.querySelector('#cancel').style.display = 'block';
    },
    enableInput: function(){
        salaryInput.removeAttribute('readonly');
        incomeTitleInput.forEach(function(elem){
            elem.removeAttribute('readonly');
        });
        incomeAmountInput.forEach(function(elem){
            elem.removeAttribute('readonly');
        });
        addIncomeInput.forEach(function(elem){
            elem.removeAttribute('readonly');
        });
        expensesTitleInput.forEach(function(elem){
            elem.removeAttribute('readonly');
        });
        expensesAmountInput.forEach(function(elem){
            elem.removeAttribute('readonly');
        });
        addExpensesInput.removeAttribute('readonly');
        targetAmountInput.removeAttribute('readonly');
        periodInput.removeAttribute('readonly');

        document.querySelector('.deposit-label').style.display = 'block';
        plusIncomeButton.style.display = 'block';
        plusExpensesButton.style.display = 'block';

        document.querySelector('#cancel').style.display = 'none';
        startButton.style.display = 'block';
    },
    showResult: function(){
        budgetMonthInput.value = this.budgetMonth;
        budgetDayTotalInput.value = this.budgetDay;
        expensesMonthTotalInput.value = this.expensesMonth;
        addExpensesTotalInput.value = this.addExpenses.join(', ');
        addIncomeTotalInput.value = this.addIncome.join(', ');
        targetMonthTotalInput.value = this.getTargetMonth();
        incomePeriodTotalInput.value = this.calcSavedMoney();

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
        expensesAmountInput.forEach(function (input){
            input.addEventListener('input', function(){
                this.value = this.value.replace(/\D/g, "");
            });
        });

        expensesTitleInput = document.querySelectorAll('.expenses-title');
        expensesTitleInput.forEach(function (input){
            input.addEventListener('input', function(){
                this.value = this.value.replace(/\w/g, "");
            });
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
        incomeAmountInput.forEach(function (input){
            input.addEventListener('input', function(){
                this.value = this.value.replace(/\D/g, "");
            });
        });

        incomeTitleInput = document.querySelectorAll('.income-title');
        incomeTitleInput.forEach(function (input){
            input.addEventListener('input', function(){
                this.value = this.value.replace(/\w/g, "");
            });
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
        
        for (let key in this.income){
            this.incomeMonth += +this.income[key];
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
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = parseInt(this.budgetMonth / 30);
        return;
    },
    getTargetMonth: function(){
        if (targetAmountInput.value <=0){
            return 'Цель не будет достигнута';
        } else {
            return Math.ceil( targetAmountInput.value / this.budgetMonth );
        }
    },
    getExpensesMonth: function(){
        for (let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
    },
    getIncomesMonth: function(){
        for (let key in this.incomes){
            this.incomeMonth += +this.incomes[key];
        }
    },
    getInfoDeposit: function(){
        if (this.deposit){
            do{
                this.percentDeposit = prompt('Какой годовой процент?', '10');

            } while ( !isMoney( this.percentDeposit ) );
            do{
                this.moneyDeposit = prompt('Какая сумма заложена?', '10000');

            } while ( !isMoney( this.moneyDeposit ) );
        }
    },
    calcSavedMoney: function(){
        return this.budgetMonth * periodInput.value;
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

document.querySelector('#cancel').addEventListener('click', function(){
    appData.reset();
});

plusExpensesButton.addEventListener('click', appData.addExpensiveBlok);
plusIncomeButton.addEventListener('click', appData.addIncomeBlok);
periodInput.addEventListener('input', function(){
    periodAmount.innerHTML = periodInput.value;
});

function isMoney(anyData){
    return !isNaN(parseFloat(anyData)) && isFinite(anyData);
}