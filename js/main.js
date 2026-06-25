/* =====================================================
   Finance Dashboard v1.0
   File : main.js
===================================================== */

/* ===========================
   INITIALIZE APP
=========================== */
document.addEventListener(

    "DOMContentLoaded",

    init

);

async function init(){

    await fetchTransactions();

processFinanceData();

alert(
"RAW = " + Finance.raw.length +
"\nDATA = " + Finance.data.length +
"\nIncome = " + Finance.summary.income +
"\nExpense = " + Finance.summary.expense
);

updateDashboard();

updateCharts();

}
