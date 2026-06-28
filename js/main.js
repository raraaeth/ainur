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

    /* ===========================
       FINANCE
    =========================== */

    await fetchTransactions();

    await fetchPlanner();


    /* ===========================
       WALLET
    =========================== */

    await fetchWalletList();

    await fetchAllWalletTokens();


    /* ===========================
       PROCESS
    =========================== */

    processFinanceData();

    processPlanner();

    processWalletData();


    /* ===========================
       DASHBOARD
    =========================== */

    updateDashboard();

    updateCharts();

    populateFilters();

    initFilters();

    updateTable();

    updateStatistics();

    updateInsight();

    updatePlanner();

    updatePlannerHeader();

    updateLastSync();

}
