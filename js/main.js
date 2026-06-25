/* =====================================================
   Finance Dashboard v1.0
   File : main.js
===================================================== */

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

    updateDashboard();

    updateCharts();

}
