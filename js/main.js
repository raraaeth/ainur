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

    console.log("RAW", Finance.raw);

    processFinanceData();

    console.log("DATA", Finance.data);

    console.log("SUMMARY", Finance.summary);

    updateDashboard();

    updateCharts();

}
