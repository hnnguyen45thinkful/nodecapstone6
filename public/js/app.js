//added this for the jquery process...
var totalIncomeMonthlyAfterTax = 0;
var totalExpensesMonthly = 0;
	//expense.ejs updating
	$('#payPeriod').on('change', changeExpenseInputFields);

	//Add income and add expense.
	$('#goToIncome').on('click', goToIncome);
    $('#goToExpense').on('click', goToExpense);
    
    //update 
    $('#expenseList table tbody').on('click', 'td a.deleteExpenseLink', deleteExpense);
    //income.ejs
    $('#incomeList table tbody').on('click', 'td a.deleteIncomeLink', deleteIncome);


$(document).ready(function(){

});