'use strict';

const startButton = document.querySelector('#start'),
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
    addExpensesInput = document.querySelector('.additional_expenses-item'), //
    salaryInput = document.querySelector('.salary-amount'),
    periodAmount = document.querySelector('.title.period-amount'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesAmountInput = document.querySelectorAll('.expenses-amount'),
    expensesTitleInput = document.querySelectorAll('.expenses-title'),
    incomeAmountInput = document.querySelectorAll('.income-amount'),
    incomeTitleInput = document.querySelectorAll('.income-title');

    class AppData {
        constructor(budget, budgetDay, budgetMonth, expensesMonth, addExpenses,
            addIncome, deposit, percentDeposit, moneyDeposit, incomes, incomeMonth,
            expenses){
            this.budget = 0;
            this.budgetDay = 0; 
            this.budgetMonth = 0;
            this.expensesMonth = 0;
            this.addExpenses = [];
            this.addIncome = [];
            this.deposit = false;
            this.percentDeposit = 0;
            this.moneyDeposit = 0;
            this.income = {};
            this.incomeMonth = 0;
            this.expenses = {};
        }

        start(){
            this.budget = +salaryInput.value;
    
            this.getIncomesAndExpenses();
            this.getExpensesMonth();
            this.getIncomesMonth();
            //this.getAddExpensesAndIncome();
            this.getAddExpenses();
            this.getAddIncome();
            this.getInfoDeposit();
            this.getBudget();
            this.showResult();
            this.disableInput();
        }

        reset(){
            this.budget = 0;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            this.expensesMonth = 0;
            this.addExpenses = [];
            this.addIncome = [];
            this.deposit = false;
            this.percentDeposit = 0;
            this.moneyDeposit = 0;
            this.income = {};
            this.incomeMonth = 0;
            this.expenses = {};
    
            this.enableInput();
            this.resetInputs();
        }

        resetInputs(){
            salaryInput.value = '';
            incomeItems.forEach((item, i) => {
                if (i !== 0){
                    incomeItems[i].remove();
                }
            });
    
            document.querySelectorAll('.income-title')[1].value = '';
            document.querySelector('.income-amount').value = '';
            incomeItems = document.querySelectorAll('.income-items');
            addIncomeInput.forEach((item) => {
                item.value = '';
            });
    
            expensesItems.forEach((item, i) => {
                if (i !== 0){
                    expensesItems[i].remove();
                }
            });
            document.querySelectorAll('.expenses-title')[1].value = '';
            document.querySelector('.expenses-amount').value = '';
            expensesItems = document.querySelectorAll('.expenses-items');
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
            depositSpan.checked = false;

            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositPercent.value = '';
            depositAmount.value = '';
            depositBank.value = '';
        }

        disableInput(){
            salaryInput.setAttribute('readonly', true);
            incomeTitleInput.forEach((elem) => {
                elem.setAttribute('readonly', true);
            });
            incomeAmountInput.forEach((elem) => {
                elem.setAttribute('readonly', true);
            });
            addIncomeInput.forEach((elem) => {
                elem.setAttribute('readonly', true);
            });
            expensesTitleInput.forEach((elem) => {
                elem.setAttribute('readonly', true);
            });
            expensesAmountInput.forEach((elem) => {
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
        }
    
        enableInput(){
            salaryInput.removeAttribute('readonly');
            incomeTitleInput.forEach((elem) => {
                elem.removeAttribute('readonly');
            });
            incomeAmountInput.forEach((elem) => {
                elem.removeAttribute('readonly');
            });
            addIncomeInput.forEach((elem) => {
                elem.removeAttribute('readonly');
            });
            expensesTitleInput.forEach((elem) => {
                elem.removeAttribute('readonly');
            });
            expensesAmountInput.forEach((elem) => {
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
        }

        showResult(){
            const _this = this;
    
            budgetMonthInput.value = this.budgetMonth;
            budgetDayTotalInput.value = this.budgetDay;
            expensesMonthTotalInput.value = this.expensesMonth;
            addExpensesTotalInput.value = this.addExpenses.join(', ');
            addIncomeTotalInput.value = this.addIncome.join(', ');
            targetMonthTotalInput.value = this.getTargetMonth();
            incomePeriodTotalInput.value = this.calcSavedMoney();
    
            periodInput.addEventListener('input', () => {
                incomePeriodTotalInput.value = _this.calcSavedMoney();
            });
        }
    
        addExpensiveBlok(){
            expensesItems = document.querySelectorAll('.expenses-items');
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
        }

        addIncomeBlok(){
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
        }
    
        /*getExpenses(){
            const _this = this;
            expensesItems.forEach((item) => {
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if (itemExpenses !== '' && cashExpenses !== ''){
                    _this.expenses[itemExpenses] = cashExpenses;
                }
            });
        }
    
        getIncomes(){
            const _this = this;
            incomeItems.forEach((item) => {
                const itemIncomes = item.querySelector('.income-title').value;
                const cashIncomes = item.querySelector('.income-amount').value;
                if (itemIncomes !== '' && cashIncomes !== ''){
                    _this.incomes[itemIncomes] = cashIncomes;
                }
            });
            
            for (let key in this.income){
                this.incomeMonth += +this.income[key];
            }
        }*/

        getIncomesAndExpenses(){
            const count = (item) => {
                const startStr = item.className.split('-')[0];
                const itemTitle = item.querySelector(`.${startStr}-title`).value;
                const itemAmount = item.querySelector(`.${startStr}-amount`).value;
                if (itemTitle !== '' && itemAmount !== ''){
                    this[startStr][itemTitle] = itemAmount;
                }
            };

            incomeItems.forEach(count);
            expensesItems.forEach(count);
        }

        getAddExpenses(){
            const _this = this;
            const addExpenses = addExpensesInput.value.split(',');
            addExpenses.forEach((item) => {
                item = item.trim();
                if (item !== ''){
                    _this.addExpenses.push(item);
                }
            });
        }
    
        getAddIncome(){
            const _this = this;
            addIncomeInput.forEach((item) => {
                item = item.value.trim();
                if (item !== ''){
                    _this.addIncome.push(item);
                }
            });
        }

        /*getAddExpensesAndIncome(){
            const _this = this;
            const addExpenses = addExpensesInput.value.split(',');
            const addIncome = [];
            addIncomeInput.forEach((item) => {
                item = item.value;
                addIncome.push(item);
            });

            const count = (item) => {
                let startStr = item.className.split('-')[0];
                startStr = startStr.replace('additional_', '');
                startStr = 'add' + startStr[0].toUpperCase() + startStr.slice(1);
                item = item.trim();
                if (item !== ''){
                    _this.startStr.push(item);
                }
            };

            addExpenses.forEach(count);
            addIncome.forEach(count);
        }*/
    
       getBudget(){
            const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100 / 12);
            this.budgetMonth = parseInt(this.budget + this.incomeMonth - this.expensesMonth + monthDeposit);
            this.budgetDay = parseInt(this.budgetMonth / 30);
            return;
        }
    
        getTargetMonth(){
            if (targetAmountInput.value <=0){
                return 'Цель не будет достигнута';
            } else {
                return Math.ceil( targetAmountInput.value / this.budgetMonth );
            }
        }
    
        getExpensesMonth(){
            for (let key in this.expenses){
                this.expensesMonth += +this.expenses[key];
            }
        }
    
        getIncomesMonth(){
            for (let key in this.income){
                this.incomeMonth += +this.income[key];
            }
        }
    
       calcSavedMoney(){
            return this.budgetMonth * periodInput.value;
        }
    
        eventListeners(){
            const _this = this;
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
            
            startButton.addEventListener('click', () => {
                if(salaryInput.value === ''){
                    alert("Введите месячный доход и только потом приступайте к расчету!");
                } else if (depositSpan.checked && depositBank.value === 'other' && (depositPercent.value === '' || depositPercent.value < 0 || depositPercent.value > 100)){
                    alert("Процент не может быть ниже 0 или превышать 100!");
                } else if (depositBank.value === ''){
                    alert("Выберите банк или введите свой процент по депозиту!");
                } else {
                    _this.start();
                }
            });
            
            document.querySelector('#cancel').addEventListener('click', () => {
                _this.reset();
            });
            
            plusExpensesButton.addEventListener('click', _this.addExpensiveBlok);
            plusIncomeButton.addEventListener('click', _this.addIncomeBlok);
            periodInput.addEventListener('input', () => {
                periodAmount.innerHTML = periodInput.value;
            });

            depositSpan.addEventListener('change', this.depositHandler.bind(this));

            depositPercent.addEventListener('input', function(){
                this.value = this.value.replace(/\D/g, "");
            });
        }
    
        depositHandler(){
            if (depositSpan.checked){
                depositBank.style.display = 'inline-block';
                depositAmount.style.display = 'inline-block';
                this.deposit = true;
                depositBank.addEventListener('change', this.changePercent);
            } else{
                depositBank.style.display = 'none';
                depositAmount.style.display = 'none';
                depositBank.value = '';
                depositAmount.value = '';
                this.deposit = false;
                depositBank.removeEventListener('change', this.changePercent);
            }
        }

        changePercent(){
            const valueSelect = this.value;
            if (valueSelect === 'other'){
                depositPercent.style.display = 'inline-block';
            } else {
                depositPercent.style.display = 'none';
                depositPercent.value = valueSelect;
            }
        }
        
        getInfoDeposit(){
            if (this.deposit){
                this.percentDeposit = depositPercent.value;
                this.moneyDeposit = depositAmount.value;
            }
        }
    }

    const appData = new AppData();

    appData.eventListeners();