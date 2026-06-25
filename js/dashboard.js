/* =====================================================
   Finance Dashboard v1.0
   File : dashboard.js
===================================================== */

/* ===========================
   SUMMARY CARD
=========================== */
function updateSummaryCard(){

    const summary = Finance.summary;
   alert("updateSummaryCard jalan!");

    alert("Income = " + summary.income);

    document.getElementById("totalIncome").textContent =
        formatCurrency(summary.income);

    document.getElementById("totalExpense").textContent =
        formatCurrency(summary.expense);

    document.getElementById("remainingBalance").textContent =
        formatCurrency(summary.balance);

    document.getElementById("savingRate").textContent =
        `${summary.savingRate.toFixed(1)}%`;

}

/* ===========================
   SAVING CARD
=========================== */
function updateSavingCard(){

    const summary = Finance.summary;

    document.getElementById("savingIncome").textContent =
        formatCurrency(summary.savingIncome);

    document.getElementById("savingExpense").textContent =
        formatCurrency(summary.savingExpense);

    document.getElementById("savingDifference").textContent =
        formatCurrency(summary.savingDifference);

}

/* ===========================
   UPDATE DASHBOARD
=========================== */

function updateDashboard(){

    updateSummaryCard();

    updateSavingCard();

}
