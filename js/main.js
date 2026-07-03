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

    /* =========================
       FINANCE
    ========================= */

    await fetchTransactions();

    await fetchPlanner();

    processFinanceData();

    processPlanner();

    updateDashboard();

    updateCharts();

    populateFilters();

    initFilters();

    updateTable();

    updateStatistics();

    updateInsight();

    updatePlanner();

    updatePlannerHeader();


    /* =========================
   WALLET (Background)
========================= */
await fetchWalletPrices();
await fetchWalletList();

// update data terbaru dari Moralis
fetchAllWalletTokens()

.then(() => {

    processWalletData();
    updateWalletDashboard();
    updatePortfolioCard();
    renderWalletOverview();
    renderWalletAllocationChart();
    processTopHolding();
    renderTopHolding();
    renderTopHoldingChart();
    processInsight();
    updateInsight();

})

.catch(error => {

    console.error(
        "Wallet Error",
        error
    );

});


    /* =========================
       LAST SYNC
    ========================= */

    updateLastSync();

}
